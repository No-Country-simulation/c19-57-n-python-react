import Hero from '../../components/Hero'
import SearchBar from '../../components/SearchBar'
import './Home.css'

const Home = () => {
  return (
    <div id="home">
      <Hero />
      <div className='mx-[18px] relative'>
        <SearchBar />
      </div>
    </div>
  )
}
export default Home
