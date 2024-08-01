/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import useToken from '../hooks/useToken'
/* import { useNavigate } from 'react-router-dom' */
import PetCard from './PetCard'
import pets from '../../data.json'
import { Loading } from './loading'

const API_URL = import.meta.env.VITE_API_URL

const ListPets = () => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('pets')
    return savedData ? JSON.parse(savedData) : null
  })
  const { token } = useToken()
  const [error, setError] = useState({})
  /* const navigate = useNavigate() */
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const response = await fetch(`${API_URL}/pets/all/`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })

        if (response.statusText === 'Unauthorized') {
          console.log('Unauthorized')
          /* navigate('/login') */
        }

        if (!response.ok) {
          setData(pets)
          throw new Error('Error')
        }

        const data = await response.json()

        const savedData = localStorage.getItem('pets')
        const parsedSavedData = savedData ? JSON.parse(savedData) : null
        setLoading(false)

        if (JSON.stringify(data) !== JSON.stringify(parsedSavedData)) {
          setData(data)
          localStorage.setItem('pets', JSON.stringify(data))
        }
      } catch (err) {
        setData(pets)
        setError({ ...error, apiError: err.message })
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className='grid grid-flow-row grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-fit mx-auto'>
      {data &&
        data.map((pet, index) => (
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
        ))}
      {loading && <Loading height={'h-16'} />}
      {error.apiError && !data && (
        <p className='mt-2 text-red-600 text-sm'>{error.apiError}</p>
      )}
    </div>
  )
}

export default ListPets
