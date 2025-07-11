import React, { useEffect, useState } from 'react';
import Nav from '../components/shared/Nav';
import Title from '../components/shared/Title';
import { useNavigate } from 'react-router-dom';


interface Jogo {
  id: number;
  nome: string;
  descricao?: string;
  imagem?: string;
}

interface Lista {
  id: number;
  nome: string;
  ehPublico: boolean;
  jogos: Jogo[];
}

function UserLists() {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');
  const [listas, setListas] = useState<Lista[]>([]);
  const [mensagem, setMensagem] = useState('');

  const [listaEditando, setListaEditando] = useState<Lista | null>(null);
  const [novoNome, setNovoNome] = useState('');
  const [novoStatus, setNovoStatus] = useState(false);
  const [novoJogoNome, setNovoJogoNome] = useState('');
  const [jogosBusca, setJogosBusca] = useState<Jogo[]>([]);
  const [buscaErro, setBuscaErro] = useState('');

  useEffect(() => {
    if (!usuarioLogado.id) {
      setMensagem('Usuário não logado.');
      return;
    }
    fetchListas();
  }, [usuarioLogado.id]);

  const navigate = useNavigate();

  const handleToCreateList = () => {
    navigate('/create-list');
  };

  const fetchListas = async () => {
    try {
      const resListas = await fetch(`http://localhost:3001/listas?fk_Usuario_id=${usuarioLogado.id}`);
      if (!resListas.ok) throw new Error('Erro ao buscar listas');
      const listasData = await resListas.json();

      const listasComJogos = await Promise.all(
        listasData.map(async (lista: any) => {
          const resJogoLista = await fetch(`http://localhost:3001/jogos-listas?fk_Lista_id=${lista.id}`);
          const jogoListaData = resJogoLista.ok ? await resJogoLista.json() : [];

          const jogoIds = jogoListaData.map((jl: any) => jl.fk_jogo_id);
          let jogosDetalhados: Jogo[] = [];
          if (jogoIds.length > 0) {
            const resJogosBatch = await fetch('http://localhost:3001/jogos/batch', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ids: jogoIds }),
            });
            if (resJogosBatch.ok) jogosDetalhados = await resJogosBatch.json();
          }

          return {
            id: lista.id,
            nome: lista.nome,
            ehPublico: lista.ehpublico === true || lista.ehpublico === 'true',
            jogos: jogosDetalhados,
          };
        })
      );

      setListas(listasComJogos);
      setMensagem('');
    } catch {
      setMensagem('Erro ao carregar as listas.');
    }
  };

  const abrirEdicao = (lista: Lista) => {
    setListaEditando(lista);
    setNovoNome(lista.nome);
    setNovoStatus(lista.ehPublico);
    setNovoJogoNome('');
    setJogosBusca([]);
    setBuscaErro('');
  };

  const fecharEdicao = () => setListaEditando(null);

  const atualizarNome = async () => {
    if (!listaEditando) return;
    try {
      const res = await fetch(`http://localhost:3001/listas/${listaEditando.id}/nome`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: novoNome }),
      });
      if (!res.ok) throw new Error('Erro ao atualizar nome');
      await fetchListas();
    } catch {
      alert('Erro ao atualizar nome');
    }
  };

  const atualizarStatus = async () => {
    if (!listaEditando) return;
    try {
      const res = await fetch(`http://localhost:3001/listas/${listaEditando.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ehPublico: novoStatus }),
      });
      if (!res.ok) throw new Error('Erro ao atualizar status');
      await fetchListas();
    } catch {
      alert('Erro ao atualizar status');
    }
  };

  const deletarLista = async () => {
  if (!listaEditando) return;
  if (!window.confirm('Tem certeza que quer deletar esta lista?')) return;
  try {
    const res = await fetch(`http://localhost:3001/listas/${listaEditando.id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Erro ao deletar lista');

    // Remove a lista do estado local
    setListas(prev => prev.filter(lista => lista.id !== listaEditando.id));

    fecharEdicao();
  } catch (err) {
    alert('Erro ao deletar lista');
    console.error(err);
  }
  };

  const buscarJogos = async () => {
    if (novoJogoNome.trim() === '') {
      setJogosBusca([]);
      setBuscaErro('');
      return;
    }
    try {
      const res = await fetch(`http://localhost:3001/jogos?nome=${encodeURIComponent(novoJogoNome)}`);
      if (!res.ok) throw new Error('Erro na busca');
      let jogos = await res.json();
      if (listaEditando) {
        jogos = jogos.filter((j: Jogo) => !listaEditando.jogos.some(jl => jl.id === j.id));

      }
      setJogosBusca(jogos);
      setBuscaErro(jogos.length === 0 ? 'Nenhum jogo encontrado' : '');
    } catch {
      setBuscaErro('Erro ao buscar jogos');
      setJogosBusca([]);
    }
  };

  const adicionarJogo = async (jogo: Jogo) => {
  if (!listaEditando) return;
  try {
    const res = await fetch(`http://localhost:3001/jogos-listas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fk_Jogo_id: jogo.id, fk_Lista_id: listaEditando.id }),
    });
    if (!res.ok) throw new Error('Erro ao adicionar jogo');

    // Adiciona o jogo ao estado local da lista editando
    setListaEditando({
      ...listaEditando,
      jogos: [...listaEditando.jogos, jogo],
    });

    // Atualiza também no estado global das listas
    setListas(prev =>
      prev.map(lista =>
        lista.id === listaEditando.id
          ? { ...lista, jogos: [...lista.jogos, jogo] }
          : lista
      )
    );

    buscarJogos(); // Reexecuta busca para remover o jogo recém-adicionado da lista de busca
  } catch {
    alert('Erro ao adicionar jogo');
  }
  };

  const removerJogo = async (jogoId: number) => {
  if (!listaEditando) return;
  try {
    const res = await fetch(`http://localhost:3001/jogos-listas`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fk_Jogo_id: jogoId, fk_Lista_id: listaEditando.id }),
    });
    if (!res.ok) throw new Error('Erro ao remover jogo');

    // Atualiza a lista localmente
    setListaEditando({
      ...listaEditando,
      jogos: listaEditando.jogos.filter(j => j.id !== jogoId),
    });

    // Também atualiza o estado global de listas
    setListas(prev =>
      prev.map(lista =>
        lista.id === listaEditando.id
          ? { ...lista, jogos: lista.jogos.filter(j => j.id !== jogoId) }
          : lista
      )
    );

    buscarJogos(); // Atualiza busca se necessário
  } catch {
    alert('Erro ao remover jogo');
  }
  };

  return (
    <>
      <Nav />
      <section className="flex flex-col items-center gap-6 mt-[50px] px-4 max-w-4xl mx-auto">
        <Title text="Minhas Listas de Jogos" size="text-[48px]" />
        {mensagem && <p className="text-red-500">{mensagem}</p>}
        {listas.length === 0 && !mensagem && <p className="text-white">Nenhuma lista encontrada.</p>}
        <div className="w-full">
          {listas.map(lista => (
            <div key={lista.id} className="bg-gray-800 p-6 rounded-lg mb-6">
              <h2 className="text-white text-xl font-bold">{lista.nome}</h2>
              <p className="text-gray-300 mb-2">{lista.ehPublico ? 'Pública' : 'Privada'}</p>
              <button
                onClick={() => abrirEdicao(lista)}
                className="mb-4 bg-green-600 px-3 py-1 rounded hover:bg-green-700 transition"
              >
                Editar Lista
              </button>
              {lista.jogos.length > 0 ? (
                <ul className="flex flex-wrap gap-3">
                  {lista.jogos.map(jogo => (
                    <li key={jogo.id} className="bg-blue-700 text-white px-3 py-1 rounded">
                      {jogo.nome}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">Nenhum jogo nesta lista.</p>
              )}
            </div>
          ))}
        </div>

        {listaEditando && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-start pt-20 z-50">
            <div className="bg-gray-900 p-6 rounded-lg w-full max-w-xl relative">
              <h2 className="text-white text-2xl mb-4">Editando lista: {listaEditando.nome}</h2>

              <label className="block text-white mb-2">
                Nome:
                <input
                  type="text"
                  className="w-full p-2 mt-1 rounded bg-gray-700 text-white"
                  value={novoNome}
                  onChange={e => setNovoNome(e.target.value)}
                />
              </label>

              <label className="block text-white mb-4">
                Pública?
                <input
                  type="checkbox"
                  checked={novoStatus}
                  onChange={e => setNovoStatus(e.target.checked)}
                  className="ml-2"
                />
              </label>

              <div className="flex flex-wrap gap-2 mb-4">
                <button onClick={atualizarNome} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">
                  Salvar Nome
                </button>
                <button onClick={atualizarStatus} className="bg-yellow-600 px-4 py-2 rounded hover:bg-yellow-700 transition">
                  Atualizar Status
                </button>
              </div>

              <h3 className="text-white mb-2">Jogos na lista:</h3>
              <ul className="mb-4 max-h-40 overflow-auto">
                {listaEditando.jogos.length === 0 && <li className="text-gray-400">Nenhum jogo nesta lista.</li>}
                {listaEditando.jogos.map(jogo => (
                  <li key={jogo.id} className="flex justify-between items-center mb-1 bg-blue-700 text-white px-3 py-1 rounded">
                    <span>{jogo.nome}</span>
                    <button className="ml-2 bg-red-600 px-2 rounded hover:bg-red-700 transition" onClick={() => removerJogo(jogo.id)}>
                      Remover
                    </button>
                  </li>
                ))}
              </ul>

              <h3 className="text-white mb-2">Adicionar jogo:</h3>
              <input
                type="text"
                placeholder="Buscar por nome..."
                value={novoJogoNome}
                onChange={e => setNovoJogoNome(e.target.value)}
                onKeyUp={buscarJogos}
                className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
              />
              {buscaErro && <p className="text-red-500 mb-2">{buscaErro}</p>}
              <ul className="max-h-40 overflow-auto mb-4">
                {jogosBusca.map(jogo => (
                  <li key={jogo.id} className="flex justify-between items-center mb-1 bg-blue-700 text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-600"
                      onClick={() => adicionarJogo(jogo)}>
                    {jogo.nome}
                    <span className="ml-2 font-bold">+</span>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between">
                <button onClick={deletarLista} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition">
                  Apagar Lista
                </button>
                <button onClick={fecharEdicao} className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700 transition">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="w-full flex justify-center">
          <button
            onClick={handleToCreateList}
            className="bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded text-white mb-6"
          >
            Criar Nova Lista
          </button>
        </div>
      </section>
    </>
  );
}

export default UserLists;
