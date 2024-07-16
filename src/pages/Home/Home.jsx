import PetCard from '../../components/PetCard'
import './Home.css'
import pets from '../../../data.json';

const Home = () => {
  return (
    <div id="home">
      <div className="hero-container">
        <div className="hero__img">
          <img src="/woman.png" alt="Woman with your dog" />
        </div>
        <div className='hero__presentation'>
          <h1 className='hero__title'>Adopta</h1>
          <p className='hero__paragraph'>
            Tu calidad de vida mejora, su vida cambia.
          </p>
        </div>
      </div>
      <div className='flex justify-center mt-[20px] flex-wrap gap-4'>
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
  )
}
export default Home
