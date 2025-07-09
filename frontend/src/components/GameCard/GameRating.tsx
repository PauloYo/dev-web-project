import { faStar } from "@fortawesome/free-solid-svg-icons"
import { faStar as faStarOutlined } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Rating from "@mui/material/Rating"

type GameRatingProps = {
  rating: number
  quantity: number
  size?: string
}

function GameRating({ rating, quantity, size = 'text-7xl' }: GameRatingProps) {
  return (
    <div className={`flex flex-col gap-2 items-center mt-2 ${size}`}>
      <h1 className="font-bold">{rating}</h1>
      <Rating
        value={rating}
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