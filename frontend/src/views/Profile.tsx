import React from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/shared/Nav';
import Title from '../components/shared/Title';
import UserIcon from '../assets/user-icon.png';

function Profile() {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');
  const navigate = useNavigate();

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

  return (
    <>
      <Nav />
      <section className="flex flex-col items-center gap-[30px] mt-[50px]">
        <Title text="Meu Perfil" size="text-[48px]" />
        <img
          src={getImagemUsuario()}
          alt="Imagem do usuário"
          className="w-32 h-32 rounded-full object-contain bg-white mb-4"
        />
        <div className="bg-gray-800 p-6 rounded-lg text-white w-[350px] text-center">
          <p className="text-xl font-bold mb-2">Nome:</p>
          <p className="mb-4 break-words">{usuarioLogado.nome || 'Nome não informado'}</p>

          <p className="text-xl font-bold mb-2">Descrição:</p>
          <p className="mb-6 break-words max-w-[300px] mx-auto">
            {usuarioLogado.descricao || 'Nenhuma descrição'}
          </p>

          <button
            onClick={() => navigate('/profile-edit')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Editar Perfil
          </button>
        </div>
      </section>
    </>
  );
}

export default Profile;
