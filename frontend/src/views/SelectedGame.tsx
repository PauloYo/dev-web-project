import type { JogoDetails } from '../types/internal'

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Nav from '../components/shared/Nav';
import GameCard from '../components/GameCard';
import Avaliacao from '../components/Avaliacao';
import AllReviews from '../components/AllReviews';

import { isLogged } from '../utils/login'


function SelectedGame() {
  const [message, setMessage] = useState<string>('Carregando...');
  const [jogo, setJogo] = useState<JogoDetails | null>(null);
  const { id } = useParams();
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');

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
      </>
    );
  }

  return (
    <>
      <Nav />
      <section className="flex flex-col items-center gap-6 mt-10 px-4 text-white">
        <GameCard game={jogo} size='xlarge' rating={jogo.rating} quantity={jogo.totalUserRatings} width='1000px' height='400px' description={true}/>
      </section>
      
      <section className="w-full px-8 mt-8">
        <Avaliacao logged={isLogged()} userId={usuarioLogado?.id} gameId={jogo.id} />
      </section>
      
      <div className="flex items-center gap-4 my-8 px-8">
        <div className="flex-1 h-[4px] bg-white"></div>
        <h2 className="text-white text-4xl font-bold whitespace-nowrap">ALL REVIEWS</h2>
        <div className="flex-1 h-[4px] bg-white"></div>
      </div>

      <AllReviews gameId={jogo.id} currentUserId={usuarioLogado?.id} />
    </>
  );
}

export default SelectedGame;
