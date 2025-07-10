import type { JogoDetails } from '../../types/internal'

import GameRating from "./GameRating"
import TitleGameCard from "./TitleGameCard"
import GameDescription from "./GameDescription"

type GameCardProps = {
    game: JogoDetails
    ranking?: number
    width?: string
    height?: string
}

function GameCardDetails({ game, ranking, width = '300px', height = '300px' }: GameCardProps) {
  return (
    <div
      className="flex flex-row items-center justify-between gap-4 p-8 border border-primary rounded-3xl shadow-2xl shadow-purple-shadow"
      style={{ width, height }}
    >
      {ranking ? (
        <h1 className="text-4xl font-bold">#{ ranking }</h1>
      ) : ""}
      <img className="h-full" src={game?.imagem} alt={game.nome} />
      <div className="flex flex-col">
        <TitleGameCard title={game.nome} developer={game?.desenvolvedor} platforms={game.plataformas} />
        <GameRating rating={4.3} quantity={768} />
        <GameDescription description={game.descricao} />
      </div>
    </div>
  );
}

export default GameCardDetails;