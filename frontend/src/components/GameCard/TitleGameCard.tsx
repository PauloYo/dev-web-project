import type { Plataforma } from '../../types/api';
import type { PlataformasOptions } from '../../types/internal';

import Title from "../shared/Title";
import Platforms from "./Platforms";

import { platformToIcon } from '../../utils/plataformas';

type CardSize = 'xlarge' | 'large' | 'medium';

type TitleGameCardProps = {
  title: string
  developer: string | undefined
  platforms: Plataforma[]
  size?: CardSize
};

const SIZE_MAP: Record<CardSize, { size: string }> = {
  xlarge: { size: 'text-3xl' },
  large: { size: 'text-4xl' },
  medium: { size: 'text-2xl' },
};

function TitleGameCard({ title, developer, platforms, size = 'medium'}: TitleGameCardProps) {
  const platformOptions = platforms.map(platform => platformToIcon(platform.descricao)) as PlataformasOptions[];

  const { size: titleSize } = SIZE_MAP[size];

  return (
    <div className="flex items-center flex-col gap-2">
      <div>
        <Title text={title} size={titleSize} />
        {developer ? <p className="text-gray-500">by {developer}</p> : ''}
        <div className="flex gap-2 text-2xl">
          <Platforms platforms={platformOptions} />
          <br></br>
        </div>
      </div>
    </div>
  );
}

export default TitleGameCard