import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { validateAdoptionForm } from '../utils'
import useToken from '../hooks/useToken'
import TitleComponent from './TitleComponent'
import InputComponent from './InputComponent'
import Button from './Button'

const API_URL = import.meta.env.VITE_API_URL

const GENDER = ['m', 'f']
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
const another_pet_OPTIONS = ['si', 'no']

const PetRequestForm = () => {
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
    another_pet_desc: ''
  })

  const [error, setError] = useState({})
  const [success, setSuccess] = useState(false)
  const { id } = useParams()
  const [acceptTerms, setAcceptTerms] = useState(false)
  const { token } = useToken()
  const [petName, setPetName] = useState('')

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
    setError({})
    const isValid = validateAdoptionForm(values, setError)
    console.log(values)

    if (isValid) {
      try {
        const create_at = new Date()
          .toLocaleDateString('es', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })
          .split('/')
          .reverse()
          .join('-')

        const parseAge = parseFloat(values.age)

        const body = {
          ...values,
          id: 0,
          age: parseAge,
          create_at,
          status_appli: 'pendiente',
          id_mascota: id
        }

        const response = await fetch(`${API_URL}/pets/application`, {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(body)
        })

        if (response.ok) {
          await response.json()
          setSuccess(true)
          setTimeout(() => {
            navigate('/')
          }, 2000)
        }
      } catch (e) {
        console.error(e)
        setError((prev) => ({ ...prev, apiError: e.message }))
      }
    } else {
      console.error('Error al rellenar el formulario')
      setError((prev) => ({
        ...prev,
        apiError: 'Error al rellenar el formulario'
      }))
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_URL}/pets/${id}`, {
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
        setPetName(data.name)
      } catch (err) {
        setError({ ...error, apiError: err.message })
      }
    }

    fetchData()
  }, [id])

  return (
    <form
      className='flex flex-col 2xl:flex-wrap items-center gap-5'
      onSubmit={handleSubmit}
    >
      <TitleComponent title={'Solicitud de Adopción'} />

      <div className='flex flex-col 2xl:flex-row w-full 2xl:flex-wrap 2xl:justify-center 2xl:gap-[30px]'>
        <InputComponent
          label={'¿A quien quieres adoptar?'}
          placeholder={'Nombre de mascota'}
          name={'petName'}
          value={petName}
          handleChange={handleChange}
          type={'text'}
          error={error.petName}
          disabled={true}
        />

        <InputComponent
          label={'Nombre'}
          placeholder={'Nombre'}
          name={'name'}
          value={values.name}
          handleChange={handleChange}
          type={'text'}
          error={error.name}
        />

        <InputComponent
          label='Apellido'
          placeholder='Apellido'
          name='last_name'
          type='text'
          value={values.last_name}
          handleChange={handleChange}
          error={error.last_name}
        />

        <InputComponent
          label={'Ciudad'}
          placeholder={'Ciudad'}
          name={'ciudad'}
          value={'Ciudad'}
          handleChange={handleChange}
          type={'text'}
          error={error.city}
          disabled={true}
        />

        <InputComponent
          label='Edad'
          placeholder='Edad'
          name='age'
          type='number'
          value={values.age}
          handleChange={handleChange}
          error={error.age}
        />

        <InputComponent
          type={'select'}
          label='Género'
          name='genre'
          value={values.genre}
          handleChange={handleChange}
          options={GENDER}
          error={error.genre}
        />

        <InputComponent
          type={'select'}
          label='Tipo de Solicitud'
          name='type_appli'
          value={values.type_appli}
          handleChange={handleChange}
          options={APPLICATION_TYPES}
          error={error.type_appli}
        />

        <InputComponent
          type={'select'}
          label='Situación Laboral'
          name='employm_situ'
          value={values.employm_situ}
          handleChange={handleChange}
          options={EMPLOYMENT_SITUATIONS}
          error={error.employm_situ}
        />

        <InputComponent
          type={'select'}
          label='¿Vives en casa o departamento? ¿Propio o alquiler?'
          name='type_of_house'
          value={values.type_of_house}
          handleChange={handleChange}
          options={HOUSE_TYPES}
          error={error.type_of_house}
        />

        <InputComponent
          type={'select'}
          label='Rango de Ingresos'
          name='income_range'
          value={values.income_range}
          handleChange={handleChange}
          options={INCOME_RANGE}
          error={error.income_range}
        />

        <InputComponent
          type={'select'}
          label='¿Tiene Otra Mascota?'
          name='another_pet'
          value={values.another_pet}
          handleChange={handleChange}
          options={another_pet_OPTIONS}
          error={error.another_pet}
        />

        <InputComponent
          type={'text'}
          label='Descripción de su otra Mascota'
          placeholder='Descripción de la Otra Mascota'
          name='another_pet_desc'
          value={values.another_pet_desc}
          handleChange={handleChange}
          error={error.another_pet_desc}
        />

        <InputComponent
          type={'select'}
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
          type='number'
          value={values.mt2_yard}
          handleChange={handleChange}
          error={error.mt2_yard}
        />

        <InputComponent
          label='Teléfono'
          placeholder='Teléfono'
          name='phone'
          type='number'
          value={values.phone}
          handleChange={handleChange}
          error={error.phone}
        />

        <InputComponent
          label='Email'
          placeholder='Email'
          name='email'
          type='text'
          value={values.email}
          handleChange={handleChange}
          error={error.email}
        />
      </div>

      <div className='2xl:pl-44 text-start flex gap-2 my-5 w-full px-[18px] md:px-[50px]'>
        <label className='flex items-center gap-6 text-base'>
          <input
            type='checkbox'
            name={'accept'}
            value={acceptTerms}
            checked={acceptTerms}
            onChange={() => setAcceptTerms(!acceptTerms)}
            className='text-indigo-600 focus:ring-indigo-600'
          />
          Acepto el aviso de privacidad y términos y condiciones de Patitas
        </label>
        {error.accept && (
          <p className='mt-2 text-red-600 text-sm'>{error.accept}</p>
        )}
      </div>

      <Button
        textSize='large'
        color='primary'
        size='large'
        text='Enviar'
        type={'submit'}
      />
      {error.apiError && (
        <p className='mt-2 text-red-600 text-sm'>{error.apiError}</p>
      )}
      {success && (
        <p className='text-green-500'>
          Solicitud enviada... será redirigido en breve al inicio
        </p>
      )}
    </form>
  )
}

export default PetRequestForm
