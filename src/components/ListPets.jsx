import { useEffect, useState } from 'react'
import useToken from '../hooks/useToken'
import { useNavigate } from 'react-router-dom'
import PetCard from './PetCard'

const API_URL = import.meta.env.VITE_API_URL

const ListPets = () => {
  const [data, setData] = useState()
  const { token } = useToken()
  const [error, setError] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
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
          navigate('/login')
        }

        if (!response.ok) {
          throw new Error('Error')
        }

        const data = await response.json()
        setData(data)
      } catch (err) {
        setError({ ...error, apiError: err.message })
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      {data &&
        data.map((pet, index) => (
          <PetCard
            key={index}
            nombre={pet.name}
            sexo={pet.gender}
            edad={pet.year}
            tamaño={pet.size}
            caracter={pet.characteristics}
            imagen={pet.imagen_profile}
            id={pet.id}
          />
        ))}
      {error.apiError && (
        <p className='mt-2 text-red-600 text-sm'>{error.apiError}</p>
      )}
    </div>
  )
}

export default ListPets
