import Nav from '../components/shared/Nav'
import Title from '../components/shared/Title'
import { useState } from 'react'

function SignIn() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const res = await fetch('http://localhost:3001/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          email,
          senha,
          descricao: '',
          imagem: '',
          ehAdmin: false
        })
      })
      if (res.ok) {
        setMensagem('Usuário cadastrado com sucesso!')
        setNome('')
        setEmail('')
        setSenha('')
      } else {
        const erro = await res.json();
        setMensagem('Erro: ' + erro.error);
      }
    } catch (err) {
      setMensagem('Erro ao conectar com o servidor.')
    }
  }

  return (
    <>
      <Nav />
      <section className="flex flex-col items-center gap-[30px] mt-[50px]">
        <Title text="Sign In" size="text-[48px]" />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-gray-800 p-8 rounded-lg w-[350px]"
        >
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
            className="p-2 rounded"
            required
          />
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
            Cadastrar
          </button>
          {mensagem && (
            <span className="text-white text-center">{mensagem}</span>
          )}
        </form>
      </section>
    </>
  )
}

export default SignIn