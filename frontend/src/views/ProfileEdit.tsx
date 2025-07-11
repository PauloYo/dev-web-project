import Nav from '../components/shared/Nav'
import Title from '../components/shared/Title'
import React, { useState } from 'react';
import UserIcon from '../assets/user-icon.png';
import { UsuariosService } from '../services/usuario';

function ProfileEdit() {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');
  const userId = usuarioLogado.id;

  const [nome, setNome] = useState(usuarioLogado.nome || '');
  const [descricao, setDescricao] = useState(usuarioLogado.descricao || '');
  const [imagem, setImagem] = useState<File | null>(null);
  const [imagemPreview, setImagemPreview] = useState<string>('');
  const [mensagem, setMensagem] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Função para obter a imagem do usuário ou o ícone padrão
  const getImagemUsuario = () => {
    if (imagemPreview) {
      return imagemPreview;
    }
    if (
      usuarioLogado.imagem &&
      typeof usuarioLogado.imagem === 'string' &&
      usuarioLogado.imagem.startsWith('data:image/')
    ) {
      return usuarioLogado.imagem;
    }
    return UserIcon;
  };

  const clearMessage = () => {
    setTimeout(() => setMensagem(''), 3000);
  };

  const handleUpdate = async (campo: 'nome' | 'descricao', valor: string) => {
    if (!valor.trim()) {
      setMensagem(`${campo} não pode estar vazio.`);
      clearMessage();
      return;
    }

    setIsLoading(true);
    try {
      const res = await UsuariosService.update(userId, campo, valor);
      if (res) {
        localStorage.setItem('usuarioLogado', JSON.stringify(res));
        setMensagem(`${campo.charAt(0).toUpperCase() + campo.slice(1)} atualizado com sucesso!`);
        clearMessage();
      } else {
        setMensagem(`Erro ao atualizar ${campo}.`);
        clearMessage();
      }
    } catch (err: any) {
      console.error('Erro ao atualizar:', err);
      setMensagem(err.message || 'Erro ao conectar com o servidor.');
      clearMessage();
    } finally {
      setIsLoading(false);
    }
  };

  // Função para lidar com upload de imagem
  const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      setMensagem('Selecione apenas arquivos de imagem (JPG, PNG, GIF).');
      clearMessage();
      return;
    }

    // Validar tamanho (máximo 2MB para evitar problemas)
    if (file.size > 2 * 1024 * 1024) {
      setMensagem('A imagem deve ter no máximo 2MB.');
      clearMessage();
      return;
    }

    setImagem(file);
    
    // Criar preview da imagem
    const reader = new FileReader();
    reader.onload = () => {
      setImagemPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    setMensagem('');
  };

  const handleUpdateImagem = async () => {
    if (!imagem) {
      setMensagem('Selecione uma imagem primeiro.');
      clearMessage();
      return;
    }

    setIsLoading(true);
    setMensagem('Processando imagem...');
    
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const imagemString = reader.result as string;
          console.log('Enviando imagem, tamanho:', imagemString.length);
          
          const usuarioAtualizado = await UsuariosService.update(userId, 'imagem', imagemString);
          
          if (usuarioAtualizado) {
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioAtualizado));
            setMensagem('Imagem atualizada com sucesso!');
            setImagem(null);
            setImagemPreview('');
            
            // Recarregar a página para atualizar a imagem
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          } else {
            setMensagem('Erro ao atualizar a imagem.');
            clearMessage();
          }
        } catch (err: any) {
          console.error('Erro ao atualizar imagem:', err);
          setMensagem(`Erro: ${err.message || 'Erro interno do servidor'}`);
          clearMessage();
        } finally {
          setIsLoading(false);
        }
      };
      reader.readAsDataURL(imagem);
    } catch (err: any) {
      console.error('Erro ao processar imagem:', err);
      setMensagem('Erro ao processar a imagem.');
      clearMessage();
      setIsLoading(false);
    }
  };

  const cancelarImagem = () => {
    setImagem(null);
    setImagemPreview('');
    setMensagem('');
  };

  return (
    <>
      <Nav />
      <section className="flex flex-col items-center gap-[30px] mt-[50px] px-4">
        <Title text="Editar Perfil" size="text-[48px]" />
        
        {/* Preview da imagem com indicador de mudança */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300 bg-gray-200">
            <img
              src={getImagemUsuario()}
              alt="Imagem do usuário"
              className="w-full h-full object-cover"
            />
          </div>
          {imagemPreview && (
            <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              ✓
            </div>
          )}
        </div>
        
        <div className="flex flex-col gap-6 bg-gray-800 p-8 rounded-lg w-full max-w-md">
          {/* Nome */}
          <div className="space-y-2">
            <label className="block text-white font-medium">
              Nome:
            </label>
            <input
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu nome"
              disabled={isLoading}
            />
            <button
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              onClick={() => handleUpdate('nome', nome)}
              type="button"
              disabled={isLoading || !nome.trim()}
            >
              {isLoading ? 'Atualizando...' : 'Alterar Nome'}
            </button>
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <label className="block text-white font-medium">
              Descrição:
            </label>
            <textarea
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Digite sua descrição"
              rows={3}
              disabled={isLoading}
            />
            <button
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              onClick={() => handleUpdate('descricao', descricao)}
              type="button"
              disabled={isLoading || !descricao.trim()}
            >
              {isLoading ? 'Atualizando...' : 'Alterar Descrição'}
            </button>
          </div>

          {/* Imagem */}
          <div className="space-y-2">
            <label className="block text-white font-medium">
              Imagem de Perfil:
            </label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/gif"
              onChange={handleImagemChange}
              className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              disabled={isLoading}
            />
            
            {imagem && (
              <div className="flex gap-2">
                <button
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  onClick={handleUpdateImagem}
                  type="button"
                  disabled={isLoading}
                >
                  {isLoading ? 'Salvando...' : 'Salvar Imagem'}
                </button>
                <button
                  className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                  onClick={cancelarImagem}
                  type="button"
                  disabled={isLoading}
                >
                  Cancelar
                </button>
              </div>
            )}
            
            {!imagem && (
              <div className="text-sm text-gray-400 bg-gray-700 p-2 rounded">
                📝 Formatos aceitos: JPG, PNG, GIF (máx. 2MB)
              </div>
            )}
          </div>

          {/* Mensagens */}
          {mensagem && (
            <div className={`text-center p-3 rounded-lg ${
              mensagem.includes('sucesso') || mensagem.includes('Processando')
                ? 'text-green-400 bg-green-900/20 border border-green-500/30' 
                : 'text-red-400 bg-red-900/20 border border-red-500/30'
            }`}>
              {mensagem}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default ProfileEdit;