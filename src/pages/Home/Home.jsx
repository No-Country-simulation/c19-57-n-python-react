import Hero from '../../components/Hero'
import SearchBar from '../../components/SearchBar'
import './Home.css'
import PetCard from '../../components/PetCard'
import pets from '../../../data.json';

const Home = () => {
  return (
    <div id="home">
      <Hero />
      <div className='mx-[18px] relative'>
        <SearchBar />
        <div className='pt-[62px] flex flex-wrap gap-5'>
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
