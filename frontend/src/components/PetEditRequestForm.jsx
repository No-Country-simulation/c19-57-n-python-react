import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useToken from '../hooks/useToken'
import InputComponent from './InputComponent'
import Button from './Button'

const API_URL = import.meta.env.VITE_API_URL

const GENDER = ['M', 'F']
const APPLICATION_TYPES = ['adopcion', 'transitorio']
const EMPLOYMENT_SITUATIONS = ['empleado', 'desempleado', 'pensionado']
const HOUSE_TYPES = ['casa', 'depto']
const INCOME_RANGE = [
  '500.000-700.000',
  '700.001-900.000',
  '900.001-1.100.000',
  '1.100.001- y más'
]
const YARD_OPTIONS = ['si', 'no']
const ANOTHER_PET_OPTIONS = ['si', 'no']
const REQUEST_STATUS = ['pendiente', 'aprobada', 'rechazada']

const PetEditRequestForm = () => {
  const [values, setValues] = useState({
    name: '',
    last_name: '',
    age: '',
    genre: '',
    email: '',
    phone: '',
    type_appli: '',
    employm_situ: '',
    type_of_house: '',
    income_range: '',
    yard: '',
    mt2_yard: '',
    another_pet: '',
    another_pet_desc: '',
    status_appli: ''
  })
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState({})
  const { token } = useToken()
  const { id } = useParams()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccess(false)

    try {
      const body = JSON.stringify({
        ...values,
        age: parseFloat(values.age),
        mt2_yard: parseFloat(values.mt2_yard)
      })

      const response = await fetch(`${API_URL}/pets/application/${id}`, {
        method: 'PUT',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      setSuccess(true)
      setTimeout(() => {
        navigate('/admin/requests')
      }, 3000)
    } catch (error) {
      console.error(error)
      setError({ ...error, apiError: error.message })
    }
  }

  useEffect(() => {
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

        setValues({
          name: data.name || '',
          last_name: data.last_name || '',
          age: data.age || '',
          genre: data.genre || '',
          email: data.email || '',
          phone: data.phone || '',
          type_appli: data.type_appli || '',
          employm_situ: data.employm_situ || '',
          type_of_house: data.type_of_house || '',
          income_range: data.income_range || '',
          yard: data.yard || '',
          mt2_yard: data.mt2_yard || '',
          another_pet: data.another_pet || '',
          another_pet_desc: data.another_pet_desc || '',
          status_appli: data.status_appli || ''
        })
      } catch (err) {
        setError({ ...error, apiError: err.message })
      }
    }

    fetchData()
  }, [id])

  return (
    <form className='flex flex-col items-center gap-2' onSubmit={handleSubmit}>
      <InputComponent
        label='Nombre'
        placeholder='Nombre'
        name='name'
        value={values.name}
        handleChange={handleChange}
        type='text'
        error={error.name}
      />
      <InputComponent
        label='Apellido'
        placeholder='Apellido'
        name='last_name'
        value={values.last_name}
        handleChange={handleChange}
        type='text'
        error={error.last_name}
      />
      <InputComponent
        label='Edad'
        placeholder='Edad'
        name='age'
        value={values.age}
        handleChange={handleChange}
        type='number'
        error={error.age}
      />
      <InputComponent
        label='Email'
        placeholder='Email'
        name='email'
        value={values.email}
        handleChange={handleChange}
        type='text'
        error={error.email}
      />
      <InputComponent
        label='Teléfono'
        placeholder='Teléfono'
        name='phone'
        value={values.phone}
        handleChange={handleChange}
        type='text'
        error={error.phone}
      />
      <InputComponent
        type='select'
        label='Género'
        name='genre'
        value={values.genre}
        handleChange={handleChange}
        options={GENDER}
        error={error.genre}
      />
      <InputComponent
        type='select'
        label='Tipo de Solicitud'
        name='type_appli'
        value={values.type_appli}
        handleChange={handleChange}
        options={APPLICATION_TYPES}
        error={error.type_appli}
      />
      <InputComponent
        type='select'
        label='Situación Laboral'
        name='employm_situ'
        value={values.employm_situ}
        handleChange={handleChange}
        options={EMPLOYMENT_SITUATIONS}
        error={error.employm_situ}
      />
      <InputComponent
        type='select'
        label='¿Vives en casa o departamento?'
        name='type_of_house'
        value={values.type_of_house}
        handleChange={handleChange}
        options={HOUSE_TYPES}
        error={error.type_of_house}
      />
      <InputComponent
        type='select'
        label='Rango de Ingresos'
        name='income_range'
        value={values.income_range}
        handleChange={handleChange}
        options={INCOME_RANGE}
        error={error.income_range}
      />
      <InputComponent
        type='select'
        label='¿Tiene Patio?'
        name='yard'
        value={values.yard}
        handleChange={handleChange}
        options={YARD_OPTIONS}
        error={error.yard}
      />
      <InputComponent
        label='Metros Cuadrados del Patio'
        placeholder='Metros Cuadrados del Patio'
        name='mt2_yard'
        value={values.mt2_yard}
        handleChange={handleChange}
        type='number'
        error={error.mt2_yard}
      />
      <InputComponent
        type='select'
        label='¿Tiene Otra Mascota?'
        name='another_pet'
        value={values.another_pet}
        handleChange={handleChange}
        options={ANOTHER_PET_OPTIONS}
        error={error.another_pet}
      />
      <InputComponent
        label='Descripción de su otra Mascota'
        placeholder='Descripción de la Otra Mascota'
        name='another_pet_desc'
        value={values.another_pet_desc}
        handleChange={handleChange}
        type='text'
        error={error.another_pet_desc}
      />
      <InputComponent
        type='select'
        label='Estado Solicitud'
        name='status_appli'
        value={values.status_appli}
        handleChange={handleChange}
        options={REQUEST_STATUS}
        error={error.status_appli}
      />
      <Button
        textSize='large'
        color='primary'
        size='large'
        text='Editar'
        type='submit'
      />
      {error.apiError && (
        <p className='mt-2 text-red-600 text-sm'>{error.apiError}</p>
      )}
      {success && (
        <p className='text-green-500'>
          Solicitud editada exitosamente. Se te redigirá a la brevedad
        </p>
      )}
    </form>
  )
}

export default PetEditRequestForm
