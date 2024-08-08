import { useEffect, useState } from 'react'
import TitleComponent from '../TitleComponent'
import { Link, useParams } from 'react-router-dom'
import useToken from '../../hooks/useToken'
import { IconPrinter } from '../Icons'
import { Loading } from '../loading'

const API_URL = import.meta.env.VITE_API_URL

const AdminRequestById = () => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({})
  const { token } = useToken()
  const { id } = useParams()

  useEffect(() => {
    setLoading(true)
    async function fetchData() {
      try {
        const response = await fetch(`${API_URL}/pets/application/${id}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await response.json()

        setData(data)
      } catch (err) {
        setError({ ...error, apiError: err.message })
      }
    }

    fetchData()
    setLoading(false)
  }, [id])

  console.log(data)

  return (
    <div>
      <TitleComponent title={'Información de Solicitud'} color={true} />
      {loading && <Loading height={'h-16'} />}
      {data && (
        <div className='p-4 md:text-xl 2xl:text-3xl'>
          <p>
            <strong>Nombre:</strong> {data.name} {data.last_name}
          </p>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <p>
            <strong>Telefono:</strong> {data.phone}
          </p>
          <p>
            <strong>Edad:</strong> {data.age}
          </p>
          <p>
            <strong>Situación Laboral:</strong> {data.employm_situ}
          </p>
          <p>
            <strong>Tipo de Vivienda:</strong> {data.type_of_house}
          </p>
          <p>
            <strong>Patio:</strong> {data.yard ? 'Sí' : 'No'} ({data.mt2_yard}
            mt2)
          </p>
          <p>
            <strong>Otra Mascota:</strong> {data.another_pet ? 'Sí' : 'No'} (
            {data.another_pet_desc})
          </p>
          <p>
            <strong>Rango de Ingresos:</strong> {data.income_range}
          </p>
          <p>
            <strong>Solicitad realizada el</strong> {data.create_at}
          </p>
          <div className='flex justify-between mt-5'>
            <button
              className='h-8 rounded-md text-blue-darker font-semibold bg-green-default hover:bg-[#ffd4b3] py-1 px-[30px] sm:px-[58px] 2xl:px-[110px]'
              type='button'
              onClick={() => window.print()}
            >
              <IconPrinter />
            </button>
            <Link
              className='h-8 rounded-md text-blue-darker font-semibold bg-green-default hover:bg-[#ffd4b3] py-1 px-[30px] sm:px-[58px] 2xl:px-[110px]'
              to={`/admin/requests/edit/${data.id}`}
            >
              ✏
            </Link>
            <Link
              to={'/admin/requests'}
              className='h-8 rounded-md text-blue-darker font-semibold bg-pink-default hover:bg-[#ffd4b3] py-1 px-[50px] sm:px-[78px] 2xl:px-[130px]'
            >
              Volver
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminRequestById
