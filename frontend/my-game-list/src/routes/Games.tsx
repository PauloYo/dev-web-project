import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import Title from '../components/Title';
import logoImage from '../assets/logo-image.png';

interface Categoria {
  id: number;
  descricao: string;
}

interface Plataforma {
  id: number;
  descricao: string;
}

interface Jogo {
  id: number;
  nome: string;
  descricao: string;
  imagem?: string;
  categorias?: Categoria[];
  plataformas?: Plataforma[];
}


function Games() {
  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const fetchJogos = async () => {
      try {
        const res = await fetch('http://localhost:3001/jogos/details');
        if (!res.ok) throw new Error('Erro ao buscar jogos');
        const data = await res.json();
        setJogos(data.map((j: any) => ({
          id: j.jogo_id,
          nome: j.jogo_nome,
          descricao: j.descricao,
          imagem: j.imagem,
          categorias: j.categorias || [],
          plataformas: j.plataformas || []
      })));
      } catch (err) {
        setMensagem('Erro ao carregar jogos.');
      }
    };

    fetchJogos();
  }, []);

  const getImagemJogo = (jogo: Jogo) => {
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
          {jogos.map((jogo: Jogo) => (
            <div key={jogo.id} className="bg-gray-800 p-4 rounded-lg flex flex-col items-center">
              <img
                src={getImagemJogo(jogo)}
                alt={`Imagem do jogo ${jogo.nome}`}
                className="w-48 h-48 object-contain rounded mb-4 bg-white"
              />
              <h2 className="text-xl font-semibold text-white mb-2">{jogo.nome}</h2>
              <p className="text-gray-300 text-center">{jogo.descricao}</p>

              {jogo.categorias && jogo.categorias.length > 0 && (
                <div className="mt-2 text-sm text-blue-300 flex flex-wrap gap-2">
                  {jogo.categorias.map(cat => (
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
                  {jogo.plataformas.map(plataforma => (
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
