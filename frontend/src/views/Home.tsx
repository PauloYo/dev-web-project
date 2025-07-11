import type { JogoDetails } from '../types/internal'
import { JogosService } from '../services/jogos'
import { useEffect, useState } from 'react'
import Nav from '../components/shared/Nav'
import Title from '../components/shared/Title'
import GameCard from '../components/GameCard'

function Home() {
  const [allGames, setGame] = useState<JogoDetails[] | null>(null)

  useEffect(() => {
    const fetchGames = async () => {
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

    fetchGames();
  }, []);

  return (
    <>
      <Nav />
      <section className="flex flex-col items-center gap-12 mt-6">
        <Title text='RANKING OF ALL GAMES' size='text-[64px]'/>
        
        {allGames === null ? (
          <p className="text-gray-500 text-xl animate-pulse">Loading games...</p>
        ) : allGames.length > 0 ? (
          <>
            <GameCard
              game={allGames[0]}
              ranking={1}
              size='large'
              rating={allGames[0].rating}
              quantity={allGames[0].totalUserRatings}
              clickable={true}
            />
            <div className="flex flex-col items-center gap-6 w-full">
              {allGames.slice(1).map((game, idx) => (
                <GameCard
                  key={game.id}
                  game={game}
                  ranking={idx + 2}
                  size='medium'
                  rating={game.rating}
                  quantity={game.totalUserRatings}
                  clickable={true}
                />
              ))}
            </div>
          </>
        ) : (
          <p className="text-red-500 text-xl">No games found.</p>
        )}
      </section>
    </>
  );
}

export default Home
