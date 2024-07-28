import { Link } from 'react-router-dom'
import { Hero, SearchBar } from '../../components'
/* import pets from '../../../data.json' */
import ListPets from '../../components/ListPets'

const PetFilterCard = ({ src, title, href }) => {
  return (
    <div className=' flex flex-col rounded-[14px] overflow-hidden mt-[25px] shadow-[0_0_25px_0_#0000001A] pb-8'>
      <div className='bg-[#D6E4E8] grow'>
        <Link to={href}>
          <img
            className='w-full object-cover'
            src={src}
            alt={title}
          />
        </Link>
      </div>
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
          <div className='grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-[18px] mx-auto w-full max-w-[357px] md:max-w-[638px] lg:max-w-[1172px]'>
            <PetFilterCard src='/dog.png' title='Perros' href='/dogs' />
            <PetFilterCard src='/dog.png' title='Gatos' href='/cats' />
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
