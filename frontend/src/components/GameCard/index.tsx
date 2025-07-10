import type { JogoDetails } from '../../types/internal'

import GameRating from "./GameRating"
import TitleGameCard from "./TitleGameCard"

type CardSize = 'large' | 'medium';

type GameCardProps = {
    game: JogoDetails
    ranking?: number
    width?: string
    height?: string
    rating?: number
    quantity?: number
    size?: CardSize
}

const SIZE_MAP: Record<CardSize, { width: string; height: string }> = {
  large: { width: '1000px', height: '400px' },
  medium: { width: '600px', height: '240px' },
};

function GameCard({ game, ranking, rating = 0, quantity = 0, size = 'medium', }: GameCardProps) {
  const { width: defaultWidth, height: defaultHeight } = SIZE_MAP[size];
  const cardWidth = defaultWidth;
  const cardHeight = defaultHeight;

  return (
    <div className="flex flex-row items-center justify-between gap-4 p-8 border border-primary rounded-3xl shadow-2xl shadow-purple-shadow" style={{ width: cardWidth, height: cardHeight }} >
      {ranking ? (
        <h1 className="text-4xl font-bold">#{ranking}</h1>
      ) : null}
      <img className="h-full" src={game?.imagem} alt={game.nome} />
      <div className="flex flex-col">
        <TitleGameCard title={game.nome} developer={game?.desenvolvedor} platforms={game.plataformas} size={size} />
        <GameRating rating={rating} quantity={quantity} size={size} />
      </div>
    </div>
  );
}

export default GameCard;