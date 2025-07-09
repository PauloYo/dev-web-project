import { faNeos, faPlaystation, faWindows, faXbox } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type PlatformsProps = {
  platforms: Platform[]
}

function Platforms({ platforms }: PlatformsProps) {
  const platformIcons = {
    'playstation': faPlaystation,
    'nintendo': faNeos,
    'xbox': faXbox,
    'computer': faWindows,
  }

  return platforms.map((platform) => (
      <FontAwesomeIcon icon={platformIcons[platform]} />
    ))
}

export default Platforms