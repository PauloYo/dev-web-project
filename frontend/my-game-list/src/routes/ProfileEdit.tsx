import Nav from '../components/Nav'
import Title from '../components/Title'
import React, { useState } from 'react';
import UserIcon from '../assets/user-icon.png'; // ajuste o caminho se necessário

function ProfileEdit() {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');
  const userId = usuarioLogado.id;

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState<File | null>(null);
  const [mensagem, setMensagem] = useState('');

  // Função para obter a imagem do usuário ou o ícone padrão
  const getImagemUsuario = () => {
    if (
      usuarioLogado.imagem &&
      typeof usuarioLogado.imagem === 'string' &&
      usuarioLogado.imagem.startsWith('data:image/')
    ) {
      return usuarioLogado.imagem;
    }
    return UserIcon;
  };

  const handleUpdate = async (campo: string, valor: string) => {
    try {
      const res = await fetch(`http://localhost:3001/usuarios/${userId}/${campo}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [campo]: valor })
      });
      if (res.ok) {
        setMensagem(`Campo ${campo} atualizado com sucesso!`);
      } else {
        const erro = await res.json();
        setMensagem('Erro: ' + erro.error);
      }
    } catch (err) {
      setMensagem('Erro ao conectar com o servidor.');
    }
  };

  // Função para lidar com upload de imagem
  const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImagem(file);
    } else {
      setMensagem('Selecione apenas arquivos de imagem.');
    }
  };

  const handleUpdateImagem = async () => {
    if (!imagem) {
      setMensagem('Selecione uma imagem.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const res = await fetch(`http://localhost:3001/usuarios/${userId}/imagem`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imagem: reader.result })
        });
        if (res.ok) {
          const usuarioAtualizado = await res.json();
          // Atualiza o localStorage com o novo usuário
          localStorage.setItem('usuarioLogado', JSON.stringify(usuarioAtualizado));
          setMensagem('Imagem atualizada com sucesso!');
          // Opcional: forçar recarregar a página ou o estado
          window.location.reload();
        } else {
          const erro = await res.json();
          setMensagem('Erro: ' + erro.error);
        }
      } catch (err) {
        setMensagem('Erro ao conectar com o servidor.');
      }
    };
    reader.readAsDataURL(imagem);
  };

  return (
    <>
      <Nav />
      <section className="flex flex-col items-center gap-[30px] mt-[50px]">
        <Title text="Editar Perfil" size="text-[48px]" />
        <img
          src={getImagemUsuario()}
          alt="Imagem do usuário"
          className="w-32 h-32 rounded-full object-contain bg-white mb-5"
        />
        <div className="flex flex-col gap-4 bg-gray-800 p-8 rounded-lg w-[350px]">
          <label>
            Nome:
            <input
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
              className="p-2 rounded w-full"
            />
            <button
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mt-2"
              onClick={() => handleUpdate('nome', nome)}
              type="button"
            >
              Alterar Nome
            </button>
          </label>
          <label>
            Descrição:
            <input
              type="text"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              className="p-2 rounded w-full"
            />
            <button
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mt-2"
              onClick={() => handleUpdate('descricao', descricao)}
              type="button"
            >
              Alterar Descrição
            </button>
          </label>
          <label>
            Imagem:
            <input
              type="file"
              accept="image/*"
              onChange={handleImagemChange}
              className="p-2 rounded w-full"
            />
            <button
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mt-2"
              onClick={handleUpdateImagem}
              type="button"
            >
              Alterar Imagem
            </button>
          </label>
          {mensagem && (
            <span className="text-white text-center">{mensagem}</span>
          )}
        </div>
      </section>
    </>
  );
}

export default ProfileEdit;