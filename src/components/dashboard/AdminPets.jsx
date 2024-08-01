import { useEffect, useState } from 'react'
import TitleComponent from '../TitleComponent'
import useToken from '../../hooks/useToken'
import { Loading } from '../loading'
import { Link } from 'react-router-dom'
import { IconParkSolidBack } from '../Icons'

const API_URL = import.meta.env.VITE_API_URL
const PET_STATUS = ['Pendiente', 'Aprobado', 'Rechazada']

const PetComponent = ({ pet, handleDelete }) => {
  const statusClassname =
    pet.status === 0
      ? 'border-blue-default text-blue-default'
      : pet.status === 1
      ? 'border-green-500 text-green-500'
      : 'border-red-500 text-red-500'
  return (
    <>
      <tr className='text-sm text-center'>
        <td>
          <div>
            <p>{pet.name}</p>
          </div>
        </td>
        <td>{pet.create_at}</td>
        <td>
          <span className={`rounded border-[1px] px-1 ${statusClassname}`}>
            {PET_STATUS[pet.status]}
          </span>
        </td>
        <td className='flex justify-around'>
          <Link to={`/admin/pets/edit/${pet.id}`} className='text-blue-800'>
            ✏
          </Link>
          <button
            onClick={() => {
              handleDelete(pet)
            }}
            className='text-red-500'
          >
            🗑
          </button>
        </td>
      </tr>
    </>
  )
}

const AdminPets = () => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('pets')
    return savedData ? JSON.parse(savedData) : []
  })
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [currentPet, setCurrentPet] = useState()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const { token } = useToken()

  if (data.length === 0) {
    setData([])
  }

  const handleDelete = (pet) => {
    setCurrentPet(pet)

    setConfirmDelete(true)
  }

  const submitDelete = async (id) => {
    const newData = data.filter((item) => item.id !== id)

    try {
      const response = await fetch(`${API_URL}/pets/delete/${id}`, {
        method: 'DELETE',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      if (response.status === 200) {
        console.log('Pet deleted successfully')
        setData(newData)
        setConfirmDelete(false)
      } else {
        const data = await response.json()
        throw new Error(data.detail || 'Failed to delete pet')
      }
    } catch (error) {
      console.error('Error deleting pet:', error)
    }
  }

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

        if (!response.ok) {
          throw new Error('Error')
        }

        const data = await response.json()

        const savedData = localStorage.getItem('pets')
        const parsedSavedData = savedData ? JSON.parse(savedData) : null

        if (JSON.stringify(data) !== JSON.stringify(parsedSavedData)) {
          setData(data)
          localStorage.setItem('pets', JSON.stringify(data))
        }
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchData()
  }, [data])

  return (
    <div className='relative'>
      <Link className='absolute top-2 left-2 w-36' to={'/admin'} title='Atras'>
        <IconParkSolidBack />
      </Link>
      <TitleComponent title={'Mascotas'} />
      <div className='flex justify-between items-center px-4 mb-3'>
        <h3 className='text-xl font-semibold'>Mascotas</h3>
        <Link
          to={'/admin/pets/add'}
          className='h-8 rounded-md text-blue-darker font-semibold bg-[#fde4d1] hover:bg-[#ffd4b3] py-1 px-[50px] sm:px-[78px] 2xl:px-[130px]'
        >
          Agregar
        </Link>
      </div>
      <table className='table-auto w-full border-separate border-spacing-y-1'>
        <thead>
          <tr>
            <th className='pointer'>Nombre</th>
            <th className='pointer'>Creado</th>
            <th className='pointer'>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading && data.length === 0 && <Loading height={'h-16'} />}
          {error && <span>{error}</span>}
          {data.map((item) => (
            <PetComponent
              pet={item}
              key={item.id}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
      {confirmDelete && (
        <div
          className='w-screen min-h-screen h-[1350px] absolute top-0 left-1/2 -translate-x-1/2 z-50 bg-black/10'
          onClick={() => setConfirmDelete(false)}
        >
          <div
            className='text-center absolute top-[40%] left-1/2 -translate-x-1/2 bg-pink-default p-4 rounded border border-blue-darker z-50'
            onClick={(e) => e.stopPropagation()}
          >
            <p>¿Estas seguro de eliminar a {currentPet.name}?</p>
            <div className='flex justify-between text-white mt-3'>
              <button
                className='w-10 bg-green-700 rounded'
                onClick={() => submitDelete(currentPet.id)}
              >
                Sí
              </button>
              <button
                className='w-32 bg-red-700 rounded'
                onClick={() => setConfirmDelete(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPets
