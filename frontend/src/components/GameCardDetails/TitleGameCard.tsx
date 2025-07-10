import type { Plataforma } from '../../types/api'
import type { PlataformasOptions } from '../../types/internal'

import Title from "../shared/Title";
import Platforms from "./Platforms";

import { platformToIcon } from '../../utils/plataformas'

type TitleGameCardProps = {
  title: string
  developer: string | undefined
  platforms: Plataforma[]
}

function TitleGameCard({ title, developer, platforms }: TitleGameCardProps) {
  const platformOptions = platforms.map(platform => platformToIcon(platform.descricao)) as PlataformasOptions[]

  return (
    <div className="flex flex-col gap-2">
      <div>
        <Title text={title} />
        {developer ? <p className="text-gray-500">by {developer}</p> : ''}
      </div>
      <div className="flex gap-2 text-2xl">
        <Platforms platforms={platformOptions} />
      </div>
    </div>
  )
}

export default TitleGameCard