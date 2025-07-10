import type { PlataformasOptions } from "../../types/internal"

import { faAndroid, faApple, faLinux, faPlaystation, faWindows, faXbox } from "@fortawesome/free-brands-svg-icons"
import { faN } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type PlatformsProps = {
  platforms: PlataformasOptions[]
}

function Platforms({ platforms }: PlatformsProps) {
  const platformIcons = {
    'playstation': faPlaystation,
    'nintendo': faN,
    'xbox': faXbox,
    'windows': faWindows,
    'macos': faApple,
    'linux': faLinux,
    'mobile': faAndroid,
  }

  return platforms.map((platform) => (
    <FontAwesomeIcon
      key={platform}
      icon={platformIcons[platform]}
      title={platform.charAt(0).toUpperCase() + platform.slice(1)}
      style={{ marginRight: 3 }}
    />
  ))
}

export default Platforms