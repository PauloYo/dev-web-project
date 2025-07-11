import type { JogoDetails } from '../../types/internal'
import { Link } from 'react-router-dom';
import GameRating from "./GameRating"
import TitleGameCard from "./TitleGameCard"

type CardSize = 'xlarge' | 'large' | 'medium';

type GameCardProps = {
    game: JogoDetails
    ranking?: number
    width?: string
    height?: string
    rating?: number
    quantity?: number
    size?: CardSize
    clickable?: boolean
    description?: boolean
}

const SIZE_MAP: Record<CardSize, { width: string; height: string }> = {
  xlarge: { width: '1200px', height: '480px' },
  large: { width: '1000px', height: '400px' },
  medium: { width: '600px', height: '240px' },
};

function GameCard({ game, ranking, rating = 0, description, quantity = 0, size = 'medium', clickable}: GameCardProps) {
  const { width: defaultWidth, height: defaultHeight } = SIZE_MAP[size];
  const cardWidth = defaultWidth;
  const cardHeight = defaultHeight;
  if (clickable) {
    return (
      <div className="flex flex-row items-center justify-between gap-4 p-8 border border-primary rounded-3xl shadow-2xl shadow-purple-shadow" style={{ width: cardWidth, height: cardHeight }} >
        {ranking ? (
          <h1 className="text-4xl font-bold">#{ranking}</h1>
        ) : null}

        <Link className="h-full w-full" key={game.id} to={`/selected-game/${game.id}`} onClick={() => localStorage.setItem('selectedGame', JSON.stringify(game))}>
          <img className="h-full" src={game?.imagem} alt={game.nome} />
        </Link>

        <div className="flex flex-col w-full">
          <TitleGameCard title={game.nome} developer={game?.desenvolvedor} platforms={game.plataformas} size={size} />
          
          <GameRating rating={rating} quantity={quantity} size={size} />

        </div>
        {description ? (
          <div className={`flex flex-col gap-2 items-center mt-2 text-lg max-w-2xl text-center w-full`}>
            <h1 className="font-bold">{game.descricao}</h1>
          </div>
        ) : null}
      </div>
    );
  } else {
    return (
      <div className="flex flex-row items-center justify-between gap-4 p-8 border border-primary rounded-3xl shadow-2xl shadow-purple-shadow" style={{ width: cardWidth, height: cardHeight }} >
        {ranking ? (
          <h1 className="text-4xl font-bold">#{ranking}</h1>
        ) : null}

        <img className="h-full" src={game?.imagem} alt={game.nome} />

        <div className="flex flex-col w-full">
          <TitleGameCard title={game.nome} developer={game?.desenvolvedor} platforms={game.plataformas} size={size} />
          
          <GameRating rating={rating} quantity={quantity} size={size} />

            {description ? (
              <div className={`flex flex-col gap-2 items-center mt-2 text-lg max-w-2xl text-center`}>
                <h1 className="font-bold">{game.descricao}</h1>
              </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default GameCard;