import { useState, useEffect } from 'react';
import { AvaliacaoService } from '../../services/avaliacao';
import { ComentarioService } from '../../services/comentario';
import { UsuariosService } from '../../services/usuario';
import ComentarioCard from '../ComentarioCard';
import RatingModal from '../RatingModal';

type AvaliacaoProps = {
    logged: boolean;
    userId?: number;
    gameId?: number;
};

type UserRatingData = {
    nota: number;
    comentario?: string;
    avaliacaoId: number;
};

function Avaliacao({ logged, userId, gameId }: AvaliacaoProps) {
    const [userRating, setUserRating] = useState<UserRatingData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>('');
    const [userImage, setUserImage] = useState<string>('');

    useEffect(() => {
        if (logged && userId && gameId) {
            fetchUserData();
            fetchUserRating();
        }
    }, [logged, userId, gameId]);

    const fetchUserData = async () => {
        try {
            const user = await UsuariosService.getById(userId!);
            if (user) {
                setUserName(user.nome || 'Usuário');
                setUserImage(user.imagem || '');
            }
        } catch (err) {
            console.error('Error fetching user data:', err);
            setUserName('Usuário');
            setUserImage('');
        }
    };

    const fetchUserRating = async () => {
        setLoading(true);
        
        try {
            const aval = await AvaliacaoService.getByUsuarioJogoId(userId!, gameId!);
            if (aval) {
                // Buscar comentário se existir
                let comentarioTexto = '';
                try {
                    const comentario = await ComentarioService.getByAvaliacaoId(aval.id);
                    if (comentario) {
                        comentarioTexto = comentario.descricao;
                    }
                } catch (commentError) {
                    console.log('No comment found for this rating');
                }

                setUserRating({
                    nota: aval.nota,
                    comentario: comentarioTexto,
                    avaliacaoId: aval.id
                });
            } else {
                setUserRating(null);
            }
        } catch (err) {
            console.error('Error fetching user rating:', err);
            setUserRating(null);
        } finally {
            setLoading(false);
        }
    };

    const handleRatingCreated = () => {
        fetchUserRating(); // Refresh the rating after creation
        setIsEditMode(false);
    };

    const handleEditRating = () => {
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleDeleteRating = async () => {
        if (!userRating?.avaliacaoId) return;
        
        if (!window.confirm('Tem certeza que deseja deletar sua avaliação?')) return;

        try {
            await AvaliacaoService.delete(userRating.avaliacaoId);
            setUserRating(null);
        } catch (err) {
            console.error('Error deleting rating:', err);
            alert('Erro ao deletar avaliação');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditMode(false);
    };

    if (!logged) {
        return (
            <section className="flex w-full min-h-[200px] bg-gray-800 rounded-lg p-6">
                <div className="w-full flex items-center justify-center text-center text-gray-400">
                    <p>Faça login para ver e adicionar sua avaliação</p>
                </div>
            </section>
        );
    }

    if (loading) {
        return (
            <section className="flex w-full min-h-[200px] bg-gray-800 rounded-lg p-6">
                <div className="w-full flex items-center justify-center text-center text-white">
                    <p>Carregando sua avaliação...</p>
                </div>
            </section>
        );
    }

    return (
        <>
            <section className="flex w-full min-h-[200px] p-6">
                <div className="w-1/4 flex flex-col items-center justify-center text-center">
                    <h2 className="text-3xl font-semibold mb-2 text-white">Sua Avaliação:</h2>
                    <div className="flex flex-col items-center">
                        {userRating ? (
                            <>
                                <span className="text-4xl font-bold text-white">
                                    {userRating.nota.toFixed(1)}
                                    <span className="text-xl text-gray-400 ml-1 mb-1">/5</span>
                                </span>
                                {/* Botões de editar e deletar */}
                                <div className="flex gap-2 mt-4">
                                    <button
                                        className="px-3 py-1 text-white rounded bg-primary hover:bg-primary-hover transition text-sm"
                                        onClick={handleEditRating}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="px-3 py-1 text-white rounded bg-red-600 hover:bg-red-700 transition text-sm"
                                        onClick={handleDeleteRating}
                                    >
                                        Deletar
                                    </button>
                                </div>
                            </>
                        ) : (
                            <span className="text-gray-400 text-xl">Sem avaliação</span>
                        )}
                    </div>
                </div>
                <div className="w-3/4 flex items-center justify-center px-4">
                    {userRating ? (
                        <div className="w-full">
                            {userRating.comentario ? (
                                <ComentarioCard
                                    avaliacaoId={userRating.avaliacaoId}
                                    usuarioNome={userName}
                                    usuarioImagem={userImage}
                                    usuarioNota={userRating.nota}
                                    comentarioTexto={userRating.comentario}
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-gray-400 text-lg">Você avaliou este jogo, mas não adicionou comentário</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            className="px-6 py-3 text-white rounded bg-primary hover:bg-primary-hover transition"
                            onClick={() => setIsModalOpen(true)}
                        >
                            + Adicionar Avaliação
                        </button>
                    )}
                </div>
            </section>

            <RatingModal
                isOpen={isModalOpen}
                onClose={closeModal}
                gameId={gameId!}
                userId={userId!}
                onRatingCreated={handleRatingCreated}
                editMode={isEditMode}
                existingRating={userRating}
            />
        </>
    );
}

export default Avaliacao;