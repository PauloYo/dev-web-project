import type { JogoDetails } from '../types/internal'

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Nav from '../components/shared/Nav';
import Footer from '../components/shared/Footer';
import Comentario from '../components/Comentario'
import GameCardDetails from '../components/GameCardDetails';

import { isLogged } from '../utils/login'


function SelectedGame() {
  const [message, setMessage] = useState<string>('Carregando...');
  const [jogo, setJogo] = useState<JogoDetails | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const storedGame = localStorage.getItem('selectedGame');
    if (storedGame) {
      const parsedGame = JSON.parse(storedGame);
      if (parsedGame.id.toString() === id) {
        setJogo(parsedGame);
      } else {
        setMessage('Jogo não encontrado.')
      }
    }
  }, [id]);

  if (!jogo) {
    return (
      <>
        <Nav />
        <div className="text-center mt-10 text-white">{ message }</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <section className="flex flex-col items-center gap-6 mt-10 px-4 text-white">
        <GameCardDetails game={jogo} width='1000px' height='400px' />
        {isLogged() ? <Comentario /> : ''}
      </section>
      <Footer />
    </>
  );
}

export default SelectedGame;
