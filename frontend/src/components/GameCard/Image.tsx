type GameImageProps = {
  url?: string
}

function GameImage({ url }: GameImageProps) {
  return (
    <img src={url} alt="" />
  )
}

export default GameImage