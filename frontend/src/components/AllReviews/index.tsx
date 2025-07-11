import { useState, useEffect } from 'react';
import { AvaliacaoService } from '../../services/avaliacao';
import { ComentarioService } from '../../services/comentario';
import { UsuariosService } from '../../services/usuario';
import ComentarioCard from '../ComentarioCard';

type AllReviewsProps = {
  gameId: number;
  currentUserId?: number;
};

type AvaliacaoComComentario = {
  id: number;
  nota: number;
  usuario: {
    id: number;
    nome: string;
    imagem: string;
  };
  comentario: {
    id: number;
    descricao: string;
  };
};

function AllReviews({ gameId, currentUserId }: AllReviewsProps) {
  const [avaliacoes, setAvaliacoes] = useState<AvaliacaoComComentario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        setLoading(true);
        
        // Buscar todas as avaliações
        const todasAvaliacoes = await AvaliacaoService.getAll();
        
        // Filtrar apenas as avaliações do jogo atual, excluindo a do usuário logado
        const avaliacoesDoJogo = todasAvaliacoes.filter(avaliacao => 
          avaliacao.fk_jogo_id === gameId && 
          avaliacao.fk_usuario_id !== currentUserId
        );
        
        // Para cada avaliação, buscar os dados do usuário e comentário
        const avaliacoesCompletas = await Promise.all(
          avaliacoesDoJogo.map(async (avaliacao) => {
            try {
              // Buscar dados do usuário
              const usuario = await UsuariosService.getById(avaliacao.fk_usuario_id);
              
              // Buscar comentário se existir
              let comentario = null;
              try {
                comentario = await ComentarioService.getByAvaliacaoId(avaliacao.id);
              } catch (commentError) {
                // Se não encontrar comentário, continua sem ele
                console.log('Nenhum comentário encontrado para avaliação:', avaliacao.id);
              }
              
              return {
                id: avaliacao.id,
                nota: avaliacao.nota,
                usuario: {
                  id: usuario.id,
                  nome: usuario.nome,
                  imagem: usuario.imagem || '', // Adiciona imagem se existir
                },
                comentario: comentario ? {
                  id: comentario.id,
                  descricao: comentario.descricao,
                } : undefined
              };
            } catch (userError) {
              console.error('Erro ao buscar dados da avaliação:', userError);
              return null;
            }
          })
        );
        
        // Filtrar avaliações válidas e que tenham comentário
        const avaliacoesValidas = avaliacoesCompletas
          .filter((avaliacao): avaliacao is AvaliacaoComComentario => 
            avaliacao !== null && avaliacao.comentario !== undefined
          );
        
        setAvaliacoes(avaliacoesValidas);
      } catch (err) {
        console.error('Erro ao carregar avaliações:', err);
        setError('Erro ao carregar comentários');
      } finally {
        setLoading(false);
      }
    };

    fetchAvaliacoes();
  }, [gameId, currentUserId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-white">Carregando comentários...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (avaliacoes.length === 0) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-400">Nenhum comentário encontrado para este jogo.</div>
      </div>
    );
  }

  return (
    <div className="w-full px-8 mb-8">
      <div className="space-y-4">
        {avaliacoes.map((avaliacao) => (
          <ComentarioCard
            key={avaliacao.id}
            avaliacaoId={avaliacao.id}
            usuarioNome={avaliacao.usuario.nome}
            usuarioImagem={avaliacao.usuario.imagem}
            usuarioNota={avaliacao.nota}
            comentarioTexto={avaliacao.comentario.descricao}
          />
        ))}
      </div>
    </div>
  );
}

export default AllReviews;