import { useState } from 'react'
import PetCard from './PetCard'
import pets from '../../data.json'
import TitleComponent from './TitleComponent'

const CatsList = () => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('pets')
    return savedData ? JSON.parse(savedData) : []
  })

  if (data.length === 0) {
    setData(pets)
  }

  const filteredData = data.filter(
    (pet) => pet.animal_type.toLowerCase() === 'gato'
  )

  return (
    <>
      <TitleComponent title={'Gatos'} />
      <div className='grid grid-flow-row grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-fit mx-auto'>
        {filteredData.length > 0 ? (
          filteredData.map((pet, index) => (
            <PetCard
              key={index}
              nombre={pet.name || pet.nombre}
              sexo={pet.gender || pet.sexo}
              edad={pet.year || pet.edad}
              tamaño={pet.size || pet.tamaño}
              caracter={pet.characteristics || pet.caracter}
              imagen={pet.imagen_profile || 'gato1.jpeg'}
              id={pet.id || 0}
            />
          ))
        ) : (
          <p>No hay perros disponibles.</p>
        )}
      </div>
    </>
  )
}

export default CatsList
