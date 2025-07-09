import Title from "../shared/Title";
import Platforms from "./Platforms";

type TitleGameCardProps = {
  title: string
  developer: string
  platforms: Platform[]
}

function TitleGameCard({ title, developer, platforms }: TitleGameCardProps) {
  platforms = platforms.sort()

  return (
    <div className="flex flex-col gap-2">
      <div>
        <Title text={title} />
        <p className="text-gray-500">by {developer}</p>
      </div>
      <div className="flex gap-2 text-2xl">
        <Platforms platforms={platforms} />
      </div>
    </div>
  )
}

export default TitleGameCard