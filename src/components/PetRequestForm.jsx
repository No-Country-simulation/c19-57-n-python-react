import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateAdoptionForm } from '../utils'

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

        //al crear un nuevo usuario no se define un id por automatico en el back asi que cambiar el valor del id para que funcione si hay una peticion con el mismo id
        const body = {
          ...values,
          id: 3,
          age: parseAge,
          create_at,
          status_appli: 'pendiente'
        }

        const response = await fetch(`${API_URL}/pets/application`, {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
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

  return (
    <form className='flex flex-col items-center gap-2' onSubmit={handleSubmit}>
      <h2>Solicitud de Adopción</h2>

      <label htmlFor='name'>Nombre</label>
      <input
        type='text'
        placeholder='Nombre'
        value={values.name}
        name='name'
        onChange={handleChange}
        className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
      />
      {error.name && <p className='mt-2 text-red-600 text-sm'>{error.name}</p>}

      <label htmlFor='last_name'>Apellido</label>
      <input
        type='text'
        placeholder='Apellido'
        value={values.last_name}
        name='last_name'
        onChange={handleChange}
        className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
      />
      {error.last_name && (
        <p className='mt-2 text-red-600 text-sm'>{error.last_name}</p>
      )}

      <label htmlFor='age'>Edad</label>
      <input
        type='number'
        placeholder='Edad'
        value={values.age}
        name='age'
        onChange={handleChange}
        className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
      />
      {error.age && <p className='mt-2 text-red-600 text-sm'>{error.age}</p>}

      <label htmlFor='genre'>Género</label>
      <select
        name='genre'
        value={values.genre}
        onChange={handleChange}
        className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
      >
        <option value=''>Seleccionar</option>
        {GENDER.map((item) => (
          <option key={item} value={item}>
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </option>
        ))}
      </select>
      {error.genre && (
        <p className='mt-2 text-red-600 text-sm'>{error.genre}</p>
      )}

      <label htmlFor='email'>Email</label>
      <input
        type='text'
        placeholder='Email'
        value={values.email}
        name='email'
        onChange={handleChange}
        className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
      />
      {error.email && (
        <p className='mt-2 text-red-600 text-sm'>{error.email}</p>
      )}

      <label htmlFor='phone'>Teléfono</label>
      <input
        type='text'
        placeholder='Teléfono'
        value={values.phone}
        name='phone'
        onChange={handleChange}
        className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
      />
      {error.phone && (
        <p className='mt-2 text-red-600 text-sm'>{error.phone}</p>
      )}

      <label htmlFor='type_appli'>Tipo de Solicitud</label>
      <select
        name='type_appli'
        value={values.type_appli}
        onChange={handleChange}
        className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
      >
        <option value=''>Seleccionar</option>
        {APPLICATION_TYPES.map((item) => (
          <option key={item} value={item}>
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </option>
        ))}
      </select>
      {error.type_appli && (
        <p className='mt-2 text-red-600 text-sm'>{error.type_appli}</p>
      )}

      <label htmlFor='employm_situ'>Situación Laboral</label>
      <select
        name='employm_situ'
        value={values.employm_situ}
        onChange={handleChange}
        className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
      >
        <option value=''>Seleccionar</option>
        {EMPLOYMENT_SITUATIONS.map((item) => (
          <option key={item} value={item}>
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </option>
        ))}
      </select>
      {error.employm_situ && (
        <p className='mt-2 text-red-600 text-sm'>{error.employm_situ}</p>
      )}

      <label htmlFor='type_of_house'>Tipo de Vivienda</label>
      <select
        name='type_of_house'
        value={values.type_of_house}
        onChange={handleChange}
        className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
      >
        <option value=''>Seleccionar</option>
        {HOUSE_TYPES.map((item) => (
          <option key={item} value={item}>
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </option>
        ))}
      </select>
      {error.type_of_house && (
        <p className='mt-2 text-red-600 text-sm'>{error.type_of_house}</p>
      )}

      <label htmlFor='income_range'>Rango de Ingresos</label>
      <select
        name='income_range'
        value={values.income_range}
        onChange={handleChange}
        className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
      >
        <option value=''>Seleccionar</option>
        {INCOME_RANGE.map((item) => (
          <option key={item} value={item}>
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </option>
        ))}
      </select>
      {error.income_range && (
        <p className='mt-2 text-red-600 text-sm'>{error.income_range}</p>
      )}

      <label htmlFor='yard'>¿Tiene Patio?</label>
      <select
        name='yard'
        value={values.yard}
        onChange={handleChange}
        className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
      >
        <option value=''>Seleccionar</option>
        {YARD_OPTIONS.map((item) => (
          <option key={item} value={item}>
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </option>
        ))}
      </select>
      {error.yard && <p className='mt-2 text-red-600 text-sm'>{error.yard}</p>}

      <label htmlFor='mt2_yard'>Metros Cuadrados del Patio</label>
      <input
        type='number'
        placeholder='Metros Cuadrados del Patio'
        value={values.mt2_yard}
        name='mt2_yard'
        onChange={handleChange}
        className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
      />
      {error.mt2_yard && (
        <p className='mt-2 text-red-600 text-sm'>{error.mt2_yard}</p>
      )}

      <label htmlFor='another_pet'>¿Tiene Otra Mascota?</label>
      <select
        name='another_pet'
        value={values.another_pet}
        onChange={handleChange}
        className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
      >
        <option value=''>Seleccionar</option>
        {another_pet_OPTIONS.map((item) => (
          <option key={item} value={item}>
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </option>
        ))}
      </select>
      {error.another_pet && (
        <p className='mt-2 text-red-600 text-sm'>{error.another_pet}</p>
      )}

      <label htmlFor='another_pet_desc'>Descripción de su otra Mascota</label>
      <textarea
        placeholder='Descripción de la Otra Mascota'
        value={values.another_pet_desc}
        name='another_pet_desc'
        onChange={handleChange}
        className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
      />
      {error.another_pet_desc && (
        <p className='mt-2 text-red-600 text-sm'>
          {error.anotheranother_pet_descPet_desc}
        </p>
      )}

      <button
        type='submit'
        className='rounded-md p-1.5 bg-blue-600 text-white hover:bg-blue-900'
      >
        Enviar Solicitud
      </button>
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
