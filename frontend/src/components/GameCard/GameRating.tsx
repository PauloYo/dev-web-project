import { faStar } from "@fortawesome/free-solid-svg-icons"
import { faStar as faStarOutlined } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Rating from "@mui/material/Rating"

type CardSize = 'xlarge' | 'large' | 'medium';

type GameRatingProps = {
  rating: number
  quantity?: number
  size?: CardSize
}

const SIZE_MAP: Record<CardSize, { size: string; starSize: string }> = {
  xlarge: { size: 'text-7xl', starSize: 'text-4xl' },
  large: { size: 'text-7xl', starSize: 'text-4xl' },
  medium: { size: 'text-5xl', starSize: 'text-2xl' },
};

function GameRating({ rating, quantity, size = 'large' }: GameRatingProps) {
  const { size: ratingSize, starSize } = SIZE_MAP[size];

  return (
    <div className={`flex flex-col gap-2 items-center mt-2 ${ratingSize}`}>
      <h1 className="font-bold">
        {rating.toFixed(1)}
        <span className="text-lg font-normal ml-1 align-baseline inline-block" style={{ verticalAlign: "bottom" }}>/5</span>
      </h1>
      <Rating
        value={rating}
        precision={0.5}
        icon={<FontAwesomeIcon icon={faStar} className={starSize} fontSize='inherit' />}
        emptyIcon={<FontAwesomeIcon icon={faStarOutlined} className={starSize} fontSize='inherit' color="#6a7282" />}
        readOnly
      />
      {<h3 className="text-lg font-normal text-gray-500">({quantity})</h3>}
    </div>
  )
}

export default GameRating