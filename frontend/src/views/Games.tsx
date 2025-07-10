import { useEffect, useState } from 'react';
import Nav from '../components/shared/Nav';
import Title from '../components/shared/Title';
import logoImage from '../assets/logo-image.png';
import { JogosService } from '../services/jogos';
import type { JogoDetails } from '../types/internal';
import { Link } from 'react-router-dom';


function Games() {
  const [jogos, setJogos] = useState<JogoDetails[]>([]);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const fetchJogos = async () => {
      try {
        const jogos = await JogosService.getAllWithDetails();
        if (!jogos || jogos.length === 0) {
          setMensagem('Nenhum jogo encontrado.');
          return;
        }
        setJogos(jogos.map((j: JogoDetails) => ({
          id: j.id,
          nome: j.nome,
          descricao: j.descricao,
          imagem: j.imagem,
          categorias: j.categorias,
          plataformas: j.plataformas
      })));
      } catch (err) {
        setMensagem(`Erro ao carregar jogos.\n${err}`);
      }
    };

    fetchJogos();
  }, []);

  const getImagemJogo = (jogo: JogoDetails) => {
    if (jogo.imagem && jogo.imagem.startsWith('data:image/')) {
      return jogo.imagem;
    } else if (jogo.imagem && jogo.imagem.trim() !== '') {
      return jogo.imagem;
    } else {
      return logoImage;
    }
  };

    return (
    <>
      <Nav />
      <section className="flex flex-col items-center gap-[30px] mt-[50px] px-4">
        <Title text="Lista de Jogos" size="text-[48px]" />
        {mensagem && <p className="text-red-500">{mensagem}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl w-full">
          {jogos.map((jogo: JogoDetails) => (
            <div key={jogo.id} className="bg-gray-800 p-4 rounded-lg flex flex-col items-center">
              <Link to={`/selected-game/${jogo.id}`} onClick={() => localStorage.setItem('selectedGame', JSON.stringify(jogo))}>
                <img
                  src={getImagemJogo(jogo)}
                  alt={`Imagem do jogo ${jogo.nome}`}
                  className="w-48 h-48 object-contain rounded mb-4 bg-white"
                />
              </Link>
              <h2 className="text-xl font-semibold text-white mb-2">{jogo.nome}</h2>
              <p className="text-gray-300 text-center">{jogo.descricao}</p>

              {jogo.categorias && jogo.categorias.length > 0 && (
                <div className="mt-2 text-sm text-blue-300 flex flex-wrap gap-2">
                  {jogo.categorias.map((cat: { id: number; descricao: string }) => (
                    <span
                      key={cat.id}
                      className="bg-blue-800 px-2 py-1 rounded-full text-xs"
                    >
                      {cat.descricao}
                    </span>
                  ))}
                </div>
              )}

              {jogo.plataformas && jogo.plataformas.length > 0 && (
                <div className="mt-2 text-sm text-green-300 flex flex-wrap gap-2">
                  {jogo.plataformas.map((plataforma: { id: number; descricao: string }) => (
                    <span
                      key={plataforma.id}
                      className="bg-green-800 px-2 py-1 rounded-full text-xs"
                    >
                      {plataforma.descricao}
                    </span>
                  ))}
                </div>
              )}

            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Games;
