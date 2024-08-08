import { useEffect, useState } from 'react'
import TitleComponent from '../TitleComponent'
import useToken from '../../hooks/useToken'
import { Loading } from '../loading'
import { Link } from 'react-router-dom'
import { IconParkSolidBack } from '../Icons'
import TrashIcon from '/Trash.svg'
import EditIcon from '/PencilSquare.svg'

const API_URL = import.meta.env.VITE_API_URL
const PET_STATUS = ['Pendiente', 'Aprobado', 'Rechazada']

const PetComponent = ({ pet, handleDelete }) => {
  const [day, month, year] = pet.create_at.split('-')
  const yearFormatted = year.slice(-2)
  const dateFormatted = `${day}/${month}/${yearFormatted}`
  return (
    <>
      <tr className='text-xs md:text-base'>
        <td>{pet.name}</td>
        <td className='text-center'>{dateFormatted}</td>
        <td className='text-center'>
          {pet.animal_type.charAt(0).toUpperCase() + pet.animal_type.slice(1)}
        </td>
        <td className='flex justify-center gap-5'>
          <Link to={`/admin/pets/edit/${pet.id}`} className='text-blue-800'>
            <img src={EditIcon} alt='Edit Icon' />
          </Link>
          <button
            onClick={() => {
              handleDelete(pet)
            }}
            className='text-red-500'
          >
            <img src={TrashIcon} alt='Trash Icon' />
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
      <TitleComponent title={'Mascotas'} color={true} />
      <div className='flex flex-col justify-between items-center px-4 md:px-[50px] mt-11 text-blue-darker'>
        <h3 className='text-xl font-medium mb-9 md:text-[22px]'>
          ¿Rescataste un nuevo animal?
        </h3>
        <Link
          to={'/admin/pets/add'}
          className='h-11 md:w-[357px] w-full text-center text-xl content-center mb-11 rounded-md font-semibold bg-[#fde4d1] hover:bg-[#ffd4b3] py-1 px-[50px] sm:px-[78px] 2xl:px-[130px]'
        >
          Agregar mascotas
        </Link>
        <h3 className='mb-6 pt-6 text-xl font-medium border-t px-4 md:px-[50px] w-full text-center'>
          Mascotas Cargadas
        </h3>
      </div>
      <table className='table-auto text-blue-darker w-full px-4 md:px-[50px] border-separate border-spacing-y-3'>
        <thead>
          <tr className='text-sm md:text-lg font-medium'>
            <th className='pointer text-start'>Nombre</th>
            <th className='pointer'>Fecha</th>
            <th className='pointer'>Animal</th>
            <th>Modificar</th>
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
