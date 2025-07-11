import type { PlataformasOptions } from "../../types/internal"

import { faAndroid, faApple, faLinux, faPlaystation, faWindows, faXbox } from "@fortawesome/free-brands-svg-icons"
import { faN } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type CardSize = 'xlarge' | 'large' | 'medium';

type PlatformsProps = {
  platforms: PlataformasOptions[]
  size?: CardSize
}

const SIZE_MAP: Record<CardSize, { size: string }> = {
  xlarge: { size: 'text-lg' },
  large: { size: 'text-lg' },
  medium: { size: 'text-base' },
};

function Platforms({ platforms, size }: PlatformsProps) {
  const platformIcons = {
    'playstation': faPlaystation,
    'nintendo': faN,
    'xbox': faXbox,
    'windows': faWindows,
    'macos': faApple,
    'linux': faLinux,
    'mobile': faAndroid,
  }
  const { size: iconSize } = SIZE_MAP[size || 'medium'];

  return platforms.map((platform) => (
    <FontAwesomeIcon
      key={platform}
      icon={platformIcons[platform]}
      title={platform.charAt(0).toUpperCase() + platform.slice(1)}
      style={{ marginRight: 3 }}
      className={iconSize}
    />
  ))
}

export default Platforms