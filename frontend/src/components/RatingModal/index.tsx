import { useState, useEffect } from 'react';
import { Rating } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarOutlined } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { AvaliacaoService } from '../../services/avaliacao';
import { ComentarioService } from '../../services/comentario';

type RatingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  gameId: number;
  userId: number;
  onRatingCreated: () => void;
  editMode?: boolean;
  existingRating?: {
    nota: number;
    comentario?: string;
    avaliacaoId: number;
  } | null;
};

function RatingModal({ 
  isOpen, 
  onClose, 
  gameId, 
  userId, 
  onRatingCreated, 
  editMode = false, 
  existingRating 
}: RatingModalProps) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Preencher campos se estiver em modo de edição
  useEffect(() => {
    if (editMode && existingRating) {
      setRating(existingRating.nota);
      setComment(existingRating.comentario || '');
    } else {
      setRating(0);
      setComment('');
    }
  }, [editMode, existingRating, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 

    if (rating === 0) {
      setError('Por favor, selecione uma nota para o jogo');
      return;
    }

    setLoading(true);
    setError('');

    try {
      let avaliacaoId: number;
      let isUpdate = false;

      if (editMode && existingRating) {
        avaliacaoId = existingRating.avaliacaoId;
        isUpdate = true;
        console.log('Editando avaliação existente ID:', avaliacaoId);
      } else {
        try {
          console.log('Tentando criar nova avaliação - Game ID:', gameId, 'User ID:', userId, 'Nota:', rating);
          const novaAvaliacao = await AvaliacaoService.create({
            nota: rating,
            fk_jogo_id: gameId,
            fk_usuario_id: userId
          });
          avaliacaoId = novaAvaliacao.id;
          console.log('Nova avaliação criada com ID:', avaliacaoId);
        } catch (createError: any) {
          console.log('Erro ao criar avaliação:', createError.message);
          
          if (createError.message.includes('Dados duplicados')) {
            console.log('Avaliação duplicada detectada, buscando existente...');
            try {
              const existingAvaliacao = await AvaliacaoService.getByUsuarioJogoId(userId, gameId);
              if (existingAvaliacao) {
                avaliacaoId = existingAvaliacao.id;
                isUpdate = true;
                console.log('Avaliação existente encontrada, ID:', avaliacaoId);
              } else {
                throw new Error('Erro de consistência: avaliação duplicada mas não encontrada');
              }
            } catch (getError) {
              console.error('Erro ao buscar avaliação existente:', getError);
              throw new Error('Erro ao verificar avaliação existente');
            }
          } else {
            throw createError;
          }
        }
      }

      if (isUpdate) {
        console.log('Atualizando nota da avaliação ID:', avaliacaoId, 'Nova nota:', rating);
        await AvaliacaoService.updateNota(avaliacaoId, rating);
      }

      if (comment.trim()) {
        try {
          const comentarioExistente = await ComentarioService.getByAvaliacaoId(avaliacaoId);
          
          if (comentarioExistente) {
            console.log('Atualizando comentário existente ID:', comentarioExistente.id);
            await ComentarioService.updateDescricao(comentarioExistente.id, comment.trim());
          } else {
            console.log('Criando novo comentário para avaliação:', avaliacaoId);
            await ComentarioService.create({
              descricao: comment.trim(),
              fk_avaliacao_id: avaliacaoId
            });
          }
        } catch (commentError) {
          console.error('Erro ao gerenciar comentário:', commentError);
        }
      } else {
        try {
          const comentarioExistente = await ComentarioService.getByAvaliacaoId(avaliacaoId);
          if (comentarioExistente) {
            console.log('Removendo comentário existente ID:', comentarioExistente.id);
            await ComentarioService.delete(comentarioExistente.id);
          }
        } catch (deleteCommentError) {
          console.error('Erro ao remover comentário:', deleteCommentError);
        }
      }

      setRating(0);
      setComment('');
      onRatingCreated();
      onClose();
      
    } catch (err) {
      console.error('Erro detalhado:', err);
      
      let errorMessage = 'Erro ao salvar avaliação';
      
      if (err instanceof Error) {
        if (err.message.includes('Dados duplicados')) {
          errorMessage = 'Erro de consistência. Tente recarregar a página.';
        } else if (err.message.includes('400')) {
          errorMessage = 'Dados inválidos. Verifique os campos.';
        } else if (err.message.includes('Failed to create')) {
          errorMessage = 'Erro ao criar avaliação. Tente novamente.';
        } else if (err.message.includes('consistência')) {
          errorMessage = 'Erro de consistência. Tente recarregar a página.';
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setRating(editMode && existingRating ? existingRating.nota : 0);
    setComment(editMode && existingRating ? existingRating.comentario || '' : '');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-dark-gray p-8 rounded-lg w-full max-w-md mx-4 relative">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition"
          disabled={loading}
        >
          <FontAwesomeIcon icon={faXmark} className="text-xl" />
        </button>

        {/* Title */}
        <h2 className="text-white text-2xl font-bold mb-6 text-center">
          {editMode ? 'Editar Avaliação' : 'Avaliar Jogo'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Rating selection */}
          <div className="flex flex-col items-center gap-4">
            <label className="text-white text-lg font-semibold">
              Sua avaliação:
            </label>
            <Rating
              value={rating}
              onChange={(_, newValue) => setRating(newValue || 0)}
              size="large"
              precision={1}
              icon={<FontAwesomeIcon icon={faStar} fontSize="inherit" />}
              emptyIcon={<FontAwesomeIcon icon={faStarOutlined} fontSize="inherit" color="#6a7282" />}
            />
            <span className="text-gray-400 text-sm">
              {rating > 0 ? `${rating} de 5 estrelas` : 'Selecione uma avaliação'}
            </span>
          </div>

          {/* Comment box */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-lg font-semibold">
              Comentário (opcional):
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Escreva sua opinião sobre o jogo..."
              className="w-full p-3 rounded bg-gray-700 text-white border-2 border-primary focus:outline-none focus:border-primary-hover resize-none"
              rows={4}
              maxLength={500}
              disabled={loading}
            />
            <span className="text-gray-400 text-sm text-right">
              {comment.length}/500
            </span>
          </div>

          {/* Error message */}
          {error && (
            <div className="text-red-500 text-center text-sm bg-red-900/20 p-2 rounded border border-red-500/30">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 text-white rounded border border-gray-500 hover:bg-gray-600 transition"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-white rounded bg-primary hover:bg-primary-hover transition disabled:opacity-50"
              disabled={loading || rating === 0}
            >
              {loading ? 'Salvando...' : editMode ? 'Atualizar' : 'Salvar Avaliação'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RatingModal;