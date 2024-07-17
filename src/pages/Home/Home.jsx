import Hero from '../../components/Hero'
import SearchBar from '../../components/SearchBar'
import './Home.css'

const Home = () => {
  return (
    <div id="home">
      <Hero />
      <div className='mx-[18px] relative'>
        <SearchBar />
        <h2 className='pt-[62px] text-center text-[#002140]'>¿Qué queres adoptar?</h2>
        <div className='rounded-[14px] overflow-hidden mt-[25px] shadow-[0_0_25px_0_#0000001A] pb-8'>
          <div className='bg-[#D6E4E8]'>
            <img src="/dog.png" alt="A dog" />
          </div>
          <h3 className='text-center text-[18px] pt-5'>Perros</h3>
        </div>
      </div>
    </div>
  )
}
export default Home
