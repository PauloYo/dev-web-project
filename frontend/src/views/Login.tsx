import Nav from '../components/shared/Nav'
import Title from '../components/shared/Title'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const res = await fetch('http://localhost:3001/usuarios');
      const usuarios = await res.json();
      const usuario = usuarios.find(
        (u: any) => u.email === email && u.senha === senha
      );
      if (usuario) {
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        navigate('/profile-edit');
      } else {
        setMensagem('Email ou senha inválidos.')
      }
    } catch (err) {
      setMensagem('Erro ao conectar com o servidor.')
    }
  }

  return (
    <>
    <Nav />
    <section className="flex flex-col items-center gap-[30px] mt-[50px]">
      <Title text="Login" size="text-[48px]" />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-gray-800 p-8 rounded-lg w-[350px]"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          className="p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Entrar
        </button>
        {mensagem && (
          <span className="text-white text-center">{mensagem}</span>
        )}
      </form>
    </section>
    </>
  )
}

export default Login;