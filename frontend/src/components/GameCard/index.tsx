import GameRating from "./GameRating"
import TitleGameCard from "./TitleGameCard"

type GameCardProps = {
    title: string
    developer: string
    url?: string
    ranking?: number
    width?: string
    height?: string
}

function GameCard({ title, developer, ranking, url, width = '300px', height = '300px' }: GameCardProps) {
  return (
    <div
      className="flex flex-row items-center justify-between gap-4 p-8 border border-primary rounded-3xl shadow-2xl shadow-purple-shadow"
      style={{ width, height }}
    >
      {ranking ? (
        <h1 className="text-4xl font-bold">#{ ranking }</h1>
      ) : ""}
      <img className="h-full" src={url} alt={title} />
      <div className="flex flex-col">
        <TitleGameCard title={title} developer={developer} platforms={['playstation', 'computer', 'nintendo']} />
        <GameRating rating={4.3} quantity={768} />
      </div>
    </div>
  );
}

export default GameCard;