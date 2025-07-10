type GameDescriptionProps = {
  description: string | undefined
  size?: string
}

function GameRating({ description, size = 'text-lg max-w-2xl text-center' }: GameDescriptionProps) {
  return (
    <div className={`flex flex-col gap-2 items-center mt-2 ${size}`}>
      <h1 className="font-bold">{description}</h1>
    </div>
  )
}

export default GameRating