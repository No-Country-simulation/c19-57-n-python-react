import { useSearchParams } from 'react-router-dom'
import TitleComponent from './TitleComponent'
import { useEffect, useState } from 'react'
import PetCard from './PetCard'
import SearchBar from './SearchBar'

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') || ''

  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('pets')
    return savedData ? JSON.parse(savedData) : []
  })

  const [filteredData, setFilteredData] = useState([])

  const normalizeString = (str) => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  }

  useEffect(() => {
    const filterPets = () => {
      if (!query) {
        setFilteredData(data)
        return
      }

      const lowerCaseQuery = normalizeString(query)
      const results = data.filter((pet) =>
        pet.characteristics
          .split(', ')
          .some((characteristic) =>
            characteristic.toLowerCase().includes(lowerCaseQuery)
          )
      )
      console.log(data)
      console.log(filteredData)

      setFilteredData(results)
    }

    filterPets()
  }, [query])

  return (
    <>
      <TitleComponent title={'Resultados'} />
      <div className='relative mx-4 -mt-10'>
        <SearchBar />
        <h3 className='pt-[62px] text-blue-darker text-xl font-medium mb-5 md:px-[50px] w-full text-center'>
          Resultados de busqueda: {query}
        </h3>
      </div>
      {filteredData.length > 0 ? (
        <div className='grid grid-flow-row grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-fit mx-auto'>
          {filteredData.map((pet) => (
            <PetCard
              key={pet.id}
              nombre={pet.name || pet.nombre}
              sexo={pet.gender || pet.sexo}
              edad={pet.year || pet.edad}
              tamaño={pet.size || pet.tamaño}
              caracter={pet.characteristics || pet.caracter}
              imagen={pet.imagen_profile || 'gato1.jpeg'}
              id={pet.id || 0}
            />
          ))}
        </div>
      ) : (
        <p className='text-blue-darker px-4 font-medium w-full'>
          No results found
        </p>
      )}
    </>
  )
}

export default SearchResults
