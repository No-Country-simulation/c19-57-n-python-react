import { Link } from 'react-router-dom'
import { Hero, SearchBar } from '../../components'
import ListPets from '../../components/ListPets'

const PetFilterCard = ({ src, title, href }) => {
  return (
    <div className=' flex flex-col rounded-[14px] overflow-hidden mt-[25px] shadow-[0_0_25px_0_#0000001A] pb-8'>
      <Link
        className='bg-[#D6E4E8] grow w-[357px] h-[399px] md:w-[311px] md:h-[348px] lg:w-[446px] lg:h-[501px]'
        to={href}
      >
        <img className='w-full h-full object-contain' src={src} alt={title} />
      </Link>
      <h3 className='text-center text-[18px] pt-5'>{title}</h3>
    </div>
  )
}

const Home = () => {
  return (
    <div id='home'>
      <Hero />
      <div className='mx-[18px] md:mx-[50px] relative mb-[60px]'>
        <SearchBar />
        <h2 className='pt-[62px] text-center text-[#002140] text-lg font-medium'>
          ¿Qué queres adoptar?
        </h2>
        <div className='lg:container mx-auto'>
          <div className='flex flex-wrap place-content-between mx-auto w-full max-w-[357px] md:max-w-[638px] lg:max-w-[1172px]'>
            <PetFilterCard src='/dog.png' title='Perros' href='/dogs' />
            <PetFilterCard src='/Gato.webp' title='Gatos' href='/cats' />
          </div>
          <h2 className='text-lg text-center text-[#002140] py-7 font-medium'>
            Adopción urgente
          </h2>
          <ListPets />
        </div>
      </div>
    </div>
  )
}
export default Home
