import Nav from '../components/Nav'
import Title from '../components/Title'
import GameCard from '../components/GameCard'

function Home() {
  return (
    <>
      <Nav />
      <section className="flex flex-col items-center gap-[50px] mt-[25px]">
        <Title text='RANKING OF ALL GAMES' size='text-[64px]'/>
        <GameCard width='1000px' height='500px' />
      </section>
    </>
  )
}

export default Home
