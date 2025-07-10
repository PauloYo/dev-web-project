import type { JogoDetails } from '../types/internal'
import { JogosService } from '../services/jogos'
import { useEffect, useState } from 'react'

import Nav from '../components/shared/Nav'
import Title from '../components/shared/Title'
import GameCard from '../components/GameCard'
import Footer from '../components/shared/Footer'

function Home() {
  const [allGames, setGame] = useState<JogoDetails[] | null>(null)

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const games = await JogosService.getAllWithDetails();
        const gamesSorted = await JogosService.sortByRating(games); 
        if (gamesSorted.length > 0) {
          setGame(gamesSorted);
        } else {
          console.error('No game found for ranking');
        }
      } catch (error) {
        console.error('Error fetching game ranking:', error);
      }
    };

    fetchGame();
  }, []);

  return (
    <>
      <Nav />
      <section className="flex flex-col items-center gap-12 mt-6">
        <Title text='RANKING OF ALL GAMES' size='text-[64px]'/>
        {allGames && allGames.length > 0 && (
          <>
          <GameCard game={allGames[0]} ranking={1} size='large' rating={allGames[0].rating} quantity={allGames[0].totalUserRatings} />
          <div className="flex flex-col items-center gap-6 w-full">
            {allGames.slice(1).map((game, idx) => (
              <GameCard key={game.id} game={game} ranking={idx + 2} size='medium' rating={game.rating} quantity={game.totalUserRatings}/>
            ))}
          </div>
          </>
        )}
      </section>
      <Footer />
    </>
  )
}

export default Home
