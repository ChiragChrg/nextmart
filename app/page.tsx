import Header from "@components/Header"
import MobileNav from "@components/MobileNav"
import Carousel from "@components/Carousel"
import Feeds from "@components/Feeds"

const Home = () => {
  return (
    <main>
      <Header />
      <Carousel />
      <Feeds />
      <MobileNav />
    </ main>
  )
}

export default Home