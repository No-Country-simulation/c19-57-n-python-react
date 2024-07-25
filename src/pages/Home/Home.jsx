import { Hero, SearchBar } from '../../components'
/* import pets from '../../../data.json' */
import ListPets from '../../components/ListPets'

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
          <div className='flex gap-[18px] justify-center w-full'>
            <div className='rounded-[14px] overflow-hidden mt-[25px] shadow-[0_0_25px_0_#0000001A] pb-8 w-[583px] flex flex-col'>
              <div className='bg-[#D6E4E8]'>
                <img
                  className='w-full object-cover'
                  src='/dog.png'
                  alt='A dog'
                />
              </div>
              <h3 className='text-center text-[18px] pt-5'>Perros</h3>
            </div>
            <div className='rounded-[14px] overflow-hidden mt-[25px] shadow-[0_0_25px_0_#0000001A] pb-8 w-[583px]'>
              <div className='bg-[#D6E4E8]'>
                <img
                  className='w-full object-cover'
                  src='/dog.png'
                  alt='A dog'
                />
              </div>
              <h3 className='text-center text-[18px] pt-5'>Gatos</h3>
            </div>
          </div>
          <h2 className='text-lg text-center text-[#002140] py-7 font-medium'>
            Adopción urgente
          </h2>
          <div className='justify-center flex flex-col md:flex-row flex-wrap gap-4'>
            <ListPets />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home
