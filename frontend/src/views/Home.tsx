import Nav from '../components/shared/Nav'
import Title from '../components/shared/Title'
import GameCard from '../components/GameCard'
import Footer from '../components/shared/Footer'

function Home() {
  return (
    <>
      <Nav />
      <section className="flex flex-col items-center gap-12 mt-6">
        <Title text='RANKING OF ALL GAMES' size='text-[64px]'/>
        <GameCard title='Batman Arkham Knight' developer='Rocksteady Studios' url='https://image.api.playstation.com/gs2-sec/acpkgo/prod/CUSA00133_00/374/i_21516ca32977519346e7b5cbf52fcadf722998b0d0a781fbeeea687cd3dca173/i/icon0.png' ranking={1} width='1000px' height='400px' />
      </section>
      <Footer />
    </>
  )
}

export default Home
