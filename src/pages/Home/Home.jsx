import { Hero, PetCard, SearchBar } from '../../components'
import pets from '../../../data.json';

const Home = () => {
  return (
    <div id="home">
      <Hero />
      <div className='mx-[18px] md:mx-[50px] relative mb-[60px]'>
        <SearchBar />
        <h2 className='pt-[62px] text-center text-[#002140] text-lg font-medium'>¿Qué queres adoptar?</h2>
        <div className='lg:container mx-auto'>
          <div className='md:grid grid-flow-row grid-cols-2 gap-[18px]'>
            <div className='rounded-[14px] overflow-hidden mt-[25px] shadow-[0_0_25px_0_#0000001A] pb-8'>
              <div className='bg-[#D6E4E8]'>
                <img className='mx-auto' src="/dog.png" alt="A dog" />
              </div>
              <h3 className='text-center text-[18px] pt-5'>Perros</h3>
            </div>
            <div className='rounded-[14px] overflow-hidden mt-[25px] shadow-[0_0_25px_0_#0000001A] pb-8'>
              <div className='bg-[#D6E4E8]'>
                <img className='mx-auto' src="/dog.png" alt="A dog" />
              </div>
              <h3 className='text-center text-[18px] pt-5'>Gatos</h3>
            </div>
          </div>
          <h2 className='text-lg text-center text-[#002140] py-7 font-medium'>Adopción urgente</h2>
          <div className='md:grid md:grid-cols-2 md:grid-flow-row gap-5 lg:grid-cols-4'>
            {
              pets.map((pet, index) => (
                <PetCard
                  key={index}
                  nombre={pet.nombre}
                  sexo={pet.sexo}
                  edad={pet.edad}
                  tamaño={pet.tamaño}
                  caracter={pet.caracter}
                />))
            }
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home
