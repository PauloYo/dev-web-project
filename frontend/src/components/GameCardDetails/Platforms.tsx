import type { PlataformasOptions } from "../../types/internal"

import { faAndroid, faApple, faLinux, faNeos, faPlaystation, faWindows, faXbox } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type PlatformsProps = {
  platforms: PlataformasOptions[]
}

function Platforms({ platforms }: PlatformsProps) {
  const platformIcons = {
    'playstation': faPlaystation,
    'nintendo': faNeos,
    'xbox': faXbox,
    'windows': faWindows,
    'macos': faApple,
    'linux': faLinux,
    'mobile': faAndroid,
  }

  return platforms.map((platform) => (
      <FontAwesomeIcon icon={platformIcons[platform]} />
    ))
}

export default Platforms