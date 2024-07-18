import { Hero, PetCard, SearchBar } from '../../components'
import './Home.css'
import pets from '../../../data.json';

const Home = () => {
  return (
    <div id="home">
      <Hero />
      <div className='mx-[18px] relative'>
        <SearchBar />
        <h2 className='pt-[62px] text-center text-[#002140] text-lg font-medium'>¿Qué queres adoptar?</h2>
        <div className='rounded-[14px] overflow-hidden mt-[25px] shadow-[0_0_25px_0_#0000001A] pb-8'>
          <div className='bg-[#D6E4E8]'>
            <img src="/dog.png" alt="A dog" />
          </div>
          <h3 className='text-center text-[18px] pt-5'>Perros</h3>
        </div>
        <h2 className='text-lg text-center text-[#002140] py-7 font-medium'>Adopción urgente</h2>
        <div className='flex flex-wrap gap-5'>
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
  )
}
export default Home
