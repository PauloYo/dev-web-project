import { faStar } from "@fortawesome/free-solid-svg-icons"
import { faStar as faStarOutlined } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Rating from "@mui/material/Rating"

type CardSize = 'large' | 'medium';

type GameRatingProps = {
  rating: number
  quantity: number
  size?: CardSize
}

const SIZE_MAP: Record<CardSize, { size: string }> = {
  large: { size: 'text-7xl' },
  medium: { size: 'text-5xl' },
};

function GameRating({ rating, quantity, size = 'large' }: GameRatingProps) {
  const { size: ratingSize } = SIZE_MAP[size];

  return (
    <div className={`flex flex-col gap-2 items-center mt-2 ${ratingSize}`}>
      <h1 className="font-bold">
        {rating}
        <span className="text-lg font-normal ml-1 align-baseline inline-block" style={{ verticalAlign: "bottom" }}>/5</span>
      </h1>
      <Rating
        value={rating}
        size="large"
        precision={0.5}
        icon={<FontAwesomeIcon icon={faStar} className='text-4xl' fontSize='inherit' />}
        emptyIcon={<FontAwesomeIcon icon={faStarOutlined} className='text-4xl' fontSize='inherit' color="#6a7282" />}
        readOnly
      />
      <h3 className="text-base text-gray-500">({quantity})</h3>
    </div>
  )
}

export default GameRating