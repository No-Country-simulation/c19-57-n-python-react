import { useEffect, useState } from 'react'
import TitleComponent from '../TitleComponent'
import useToken from '../../hooks/useToken'
import { Link } from 'react-router-dom'
import {
  IconParkSolidBack,
  InfoIcon,
  PendingIcon,
  TickIcon,
  XIcon
} from '../Icons'
import { Loading } from '../loading'
import TrashIcon from '/Trash.svg'
import EditIcon from '/PencilSquare.svg'

const API_URL = import.meta.env.VITE_API_URL

const AdminRowComponent = ({ item, handleDelete, petData }) => {
  const currentPet = petData.filter((pet) => pet.id === item.id_mascota)
  const petName = currentPet[0].name

  const statusClassname =
    item.status_appli === 'pendiente'
      ? 'border-blue-default text-blue-default'
      : item.status_appli === 'aprobada'
      ? 'border-green-500 text-green-500'
      : 'border-red-500 text-red-500'

  return (
    <>
      <tr className='text-xs md:text-base'>
        <td className='text-start max-w-16'>
          {item.name} {item.last_name}
        </td>
        <td className='text-center'>{petName}</td>
        <td className='text-center'>
          <div className='flex justify-center'>
            {item.status_appli === 'pendiente' ? (
              <PendingIcon title='Pendiente' />
            ) : item.status_appli === 'aprobada' ? (
              <TickIcon title='Aprobada' />
            ) : (
              <XIcon title='Rechazada' />
            )}
          </div>
        </td>
        <td className='flex justify-around h-[34px] items-center'>
          <Link to={`/admin/requests/${item.id}`}>
            <InfoIcon />
          </Link>
          <Link to={`/admin/requests/edit/${item.id}`}>
            <img src={EditIcon} alt='Edit Icon' />
          </Link>
          <button
            className='text-red-500'
            onClick={() => {
              handleDelete(item)
            }}
          >
            <img src={TrashIcon} alt='Trash Icon' />
          </button>
        </td>
      </tr>
    </>
  )
}

const AdminRequests = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [currentRequest, setCurrentRequest] = useState()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const { token } = useToken()
  const [petData, setPetData] = useState(() => {
    const savedData = localStorage.getItem('pets')
    return savedData ? JSON.parse(savedData) : []
  })

  const handleDelete = (pet) => {
    setCurrentRequest(pet)

    setConfirmDelete(true)
  }

  const submitDelete = async (id) => {
    const newData = data.filter((item) => item.id !== id)

    try {
      const response = await fetch(`${API_URL}/pets/application/${id}`, {
        method: 'DELETE',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      if (response.status === 204) {
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
        const response = await fetch(`${API_URL}/pets/application/all/`, {
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
        console.log(data)

        setData(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className='relative'>
      <Link className='absolute top-2 left-2 w-36' to={'/admin'} title='Atras'>
        <IconParkSolidBack />
      </Link>
      <TitleComponent title={'Solicitudes de Adopción'} color={true} />
      <div className='flex justify-between items-center px-4 mb-3'>
        <h3 className='text-blue-darker text-xl font-medium px-4 md:px-[50px] w-full text-center'>
          Solicitudes cargadas
        </h3>
      </div>
      <table className='table-auto text-blue-darker w-full px-4 md:px-[50px] border-separate border-spacing-y-3'>
        <thead>
          <tr>
            <th className='pointer text-start'>Nombre</th>
            <th className='pointer'>Mascota</th>
            <th className='pointer'>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <AdminRowComponent
              key={item.id}
              item={item}
              handleDelete={handleDelete}
              petData={petData}
            />
          ))}
        </tbody>
      </table>
      {error && <span>{error}</span>}

      {loading && data.length === 0 && <Loading height={'h-16'} />}

      {confirmDelete && (
        <div
          className='w-screen min-h-screen h-[1350px] absolute top-0 left-1/2 -translate-x-1/2 z-50 bg-black/10'
          onClick={() => setConfirmDelete(false)}
        >
          <div
            className='text-center absolute top-[15%] left-1/2 -translate-x-1/2 bg-pink-default p-4 rounded border border-blue-darker z-50'
            onClick={(e) => e.stopPropagation()}
          >
            <p>¿Estas seguro de eliminar a {currentRequest.name}?</p>
            <div className='flex justify-between text-white mt-3'>
              <button
                className='w-10 bg-green-700 rounded'
                onClick={() => submitDelete(currentRequest.id)}
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

export default AdminRequests
