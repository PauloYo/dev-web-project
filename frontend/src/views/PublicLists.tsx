import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/shared/Nav';
import Title from '../components/shared/Title';
import { JogosService } from '../services/jogos';
import type { JogoDetails } from '../types/internal';

interface Usuario {
  id: number;
  nome: string;
}

interface ListaPublica {
  id: number;
  nome: string;
  jogos: JogoDetails[];
  fk_usuario_id: number;
  usuarioNome?: string; // Nome do dono da lista
}

function PublicLists() {
  const [listasPublicas, setListasPublicas] = useState<ListaPublica[]>([]);
  const [mensagem, setMensagem] = useState('Carregando...');

  useEffect(() => {
    fetchListasPublicas();
  }, []);

  const fetchListasPublicas = async () => {
    try {
      // Busca todas as listas públicas
      const resListas = await fetch('http://localhost:3001/listas?ehpublico=true');
      if (!resListas.ok) throw new Error('Erro ao buscar listas públicas');
      const listasData: ListaPublica[] = await resListas.json();

      // Para cada lista, buscar os jogos e o nome do usuário dono
      const listasComDetalhes: ListaPublica[] = await Promise.all(
        listasData.map(async (lista) => {
          // Busca jogos da lista
          const resJogoLista = await fetch(`http://localhost:3001/jogos-listas?fk_Lista_id=${lista.id}`);
          const jogoListaData = resJogoLista.ok ? await resJogoLista.json() : [];

          const jogoIds = jogoListaData.map((jl: any) => jl.fk_jogo_id);
          let jogosDetalhados: JogoDetails[] = [];
          if (jogoIds.length > 0) {
            jogosDetalhados = await JogosService.getByIdsWithDetails(jogoIds);
          }

          // Busca usuário dono da lista
          let usuarioNome = '';
          const resUsuario = await fetch(`http://localhost:3001/usuarios/${lista.fk_usuario_id}`);
          if (resUsuario.ok) {
            const usuarioData: Usuario = await resUsuario.json();
            usuarioNome = usuarioData.nome;
          }

          return {
            ...lista,
            jogos: jogosDetalhados,
            usuarioNome,
          };
        })
      );

      setListasPublicas(listasComDetalhes);
      setMensagem('');
    } catch (error) {
      console.error(error);
      setMensagem('Erro ao carregar listas públicas.');
    }
  };

  return (
    <>
      <Nav />
      <section className="flex flex-col items-center gap-6 mt-[50px] px-4 max-w-4xl mx-auto">
        <Title text="Listas Públicas" size="text-[48px]" />
        {mensagem && <p className="text-red-500">{mensagem}</p>}
        {listasPublicas.length === 0 && !mensagem && <p className="text-white">Nenhuma lista pública encontrada.</p>}
        <div className="w-full">
          {listasPublicas.map(lista => (
            <div key={lista.id} className="bg-gray-800 p-6 rounded-lg mb-6">
              <h2 className="text-white text-xl font-bold">{lista.nome}</h2>
              <p className="text-gray-400 mb-2">Dono: <span className="text-green-400">{lista.usuarioNome?.trim() ? lista.usuarioNome : 'Desconhecido'}</span></p>
              {lista.jogos.length > 0 ? (
                <ul className="flex flex-wrap gap-3">
                  {lista.jogos.map(jogo => (
                    <Link to={`/selected-game/${jogo.id}`} onClick={() => localStorage.setItem('selectedGame', JSON.stringify(jogo))}>
                      <li key={jogo.id} className="bg-blue-700 text-white px-3 py-1 rounded">
                        {jogo.nome}
                      </li>
                    </Link>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">Nenhum jogo nesta lista.</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default PublicLists;
