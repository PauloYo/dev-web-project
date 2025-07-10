import type { CreateListaDTO, CreateJogoListaDTO } from '../types/api';

import React, { useState } from 'react'

import Nav from '../components/shared/Nav'
import Title from '../components/shared/Title'

import { JogosService } from '../services/jogos';
import { ListasService } from '../services/listas';
import { JogoListaService } from '../services/jogoLista';

function CreateList() {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');
  const [nome, setNome] = useState('');
  const [ehPublico, setEhPublico] = useState(true);
  const [mensagem, setMensagem] = useState('');
  const [busca, setBusca] = useState('');
  const [resultados, setResultados] = useState<any[]>([]);
  const [jogosSelecionados, setJogosSelecionados] = useState<any[]>([]);

  // Buscar jogos pelo nome sempre que o campo de busca mudar
  const handleBuscarJogos = async (nomeBusca: string) => {
    setBusca(nomeBusca);
    if (!nomeBusca) {
      setResultados([]);
      return;
    }
    if (nomeBusca === "") {
      return;
    }
    try {
      const jogosBuscados = await JogosService.getByName(nomeBusca);
      setResultados(jogosBuscados);
    } catch {
      setResultados([]);
    }
  };

  // Selecionar/desselecionar jogos
  const toggleJogo = (jogo: any) => {
    setJogosSelecionados(jogosSelecionados => {
      const existe = jogosSelecionados.some(j => j.id === jogo.id);
      return existe
        ? jogosSelecionados.filter(j => j.id !== jogo.id)
        : [...jogosSelecionados, jogo];
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome) {
      setMensagem('Preencha o nome da lista.');
      return;
    }
    if (jogosSelecionados.length === 0) {
      setMensagem('Selecione pelo menos um jogo.');
      return;
    }
    try {
      const listaBody : CreateListaDTO = {
        nome,
        ehPublico,
        fk_Usuario_id: usuarioLogado.id
      };
      const listaCriada = await ListasService.create(listaBody);

      if (listaCriada) {
        await Promise.all(
          jogosSelecionados.map(jogo =>
            JogoListaService.create({
              fk_Jogo_id: jogo.id,
              fk_Lista_id: listaCriada.id
            } as CreateJogoListaDTO)
          )
        );
        setMensagem('Lista criada com sucesso!');
        setNome('');
        setEhPublico(true);
        setJogosSelecionados([]);
        setResultados([]);
        setBusca('');
      } else {
        setMensagem('Erro ao criar lista.');
      }
    } catch (err) {
      setMensagem('Erro ao conectar com o servidor.');
    }
  };

  return (
    <>
      <Nav />
      <section className="flex flex-col items-center gap-[30px] mt-[50px]">
        <Title text="Criar Lista" size="text-[48px]" />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-gray-800 p-8 rounded-lg w-[350px]"
        >
          <input
            type="text"
            placeholder="Nome da lista"
            value={nome}
            onChange={e => setNome(e.target.value)}
            className="p-2 rounded"
            required
          />
          <label className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              checked={ehPublico}
              onChange={e => setEhPublico(e.target.checked)}
            />
            Lista pública
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Buscar jogos"
              value={busca}
              onChange={e => handleBuscarJogos(e.target.value)}
              className="p-2 rounded w-full"
            />
          </div>
          {/* Resultados da busca */}
          {resultados.length > 0 && (
            <div className="bg-gray-700 rounded p-2 max-h-40 overflow-y-auto">
              {resultados.map(jogo => (
                <label key={jogo.id} className="flex items-center gap-2 text-white">
                  <input
                    type="checkbox"
                    checked={jogosSelecionados.some(j => j.id === jogo.id)}
                    onChange={() => toggleJogo(jogo)}
                  />
                  {jogo.nome}
                </label>
              ))}
            </div>
          )}

          {/* Jogos selecionados */}
          {jogosSelecionados.length > 0 && (
            <div className="bg-gray-900 rounded p-2 mt-2">
              <span className="text-white font-bold">Jogos selecionados:</span>
              <ul className="mt-2 flex flex-wrap gap-2">
                {jogosSelecionados.map(jogo => (
                  <li
                    key={jogo.id}
                    className="bg-blue-700 text-white px-3 py-1 rounded flex items-center gap-2"
                  >
                    {jogo.nome}
                    <button
                      type="button"
                      className="ml-2 text-red-300 hover:text-red-500"
                      onClick={() =>
                        setJogosSelecionados(jogosSelecionados.filter(j => j.id !== jogo.id))
                      }
                      title="Remover"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Criar Lista
          </button>
          {mensagem && (
            <span className="text-white text-center">{mensagem}</span>
          )}
        </form>
      </section>
    </>
  );
}

export default CreateList;