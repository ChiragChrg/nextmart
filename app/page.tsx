import Header from "@components/Header"
import MobileNav from "@components/MobileNav"
import Carousel from "@components/Carousel"
import Feeds from "@components/Feeds"

const Home = () => {
  return (
    <>
      <Header />
      <Carousel />
      <Feeds />
      <MobileNav />
    </>
  )
}

export default Home