import { useState, useEffect } from 'react';
import { ComentarioService } from '../../services/comentario';
import type { Comentario } from '../../types/api';

type ComentarioProps = {
    avaliacaoId: number;
    usuarioNome: string;
    usuarioImagem: string;
    usuarioNota: number;
    comentarioTexto?: string; // Nova prop opcional
};

function ComentarioCard({ avaliacaoId, usuarioNome, usuarioImagem, usuarioNota, comentarioTexto }: ComentarioProps) {
    const [comentario, setComentario] = useState<string>("");

    useEffect(() => {
        // Se o texto do comentário foi passado como prop, use ele
        if (comentarioTexto) {
            setComentario(comentarioTexto);
        } else {
            // Caso contrário, busque do serviço como antes
            ComentarioService.getByAvaliacaoId(avaliacaoId)
                .then((data: Comentario | null) => {
                    if (data && data.descricao !== null && data.descricao !== undefined) {
                        setComentario(data.descricao);
                    } else {
                        setComentario("");
                    }
                })
                .catch(() => setComentario(""));
        }
    }, [avaliacaoId, comentarioTexto]);

    return (
        <div className="flex flex-row items-center justify-between gap-4 p-8 border border-primary rounded-3xl shadow-2xl bg-dark-gray">
            <div className="flex flex-col w-full">
                <div className="flex items-center gap-4 mb-4">
                    {usuarioImagem ? (
                        <img src={usuarioImagem} alt={usuarioNome} className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-gray-600 font-bold text-lg">
                                {usuarioNome.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    )}
                    <div className="flex flex-col">
                        <h3 className="text-white font-semibold">{usuarioNome}</h3>
                        <div className="flex items-center">
                            <span className="text-yellow-400 text-lg font-bold">{usuarioNota.toFixed(1)}</span>
                            <span className="text-gray-400 text-sm ml-1">/5</span>
                        </div>
                    </div>
                </div>
                {comentario && (
                    <div className="text-gray-300">
                        <p className="leading-relaxed">{comentario}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ComentarioCard;