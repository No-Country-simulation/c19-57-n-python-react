import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL

const PET_GENDER = ['masculino', 'femenino']
const APPLICATION_TYPES = ['Adopción', 'Acogida']
const EMPLOYMENT_SITUATIONS = ['Empleado', 'Desempleado', 'Estudiante', 'Otro']
const HOUSE_TYPES = ['Apartamento', 'Casa', 'Otro']
const INCOME_RANGE = ['Bajo', 'Medio', 'Alto']
const YARD_OPTIONS = ['Sí', 'No']
const another_pet_OPTIONS = ['Sí', 'No']

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

  const navigate = useNavigate()

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = {}

    const validateEmail = (email) => {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
      return regex.test(email)
    }

    if (!validateEmail(values.email)) {
      newErrors.email = 'Introduce un email válido'
      isValid = false
    }

    setError(newErrors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const create_at = new Date().toISOString()

    const parseAge = parseFloat(values.age)

    const body = JSON.stringify({
      ...values,
      id: 0,
      age: parseAge,
      create_at,
      status_appli: 'pendiente'
    })

    if (validateForm()) {
      console.log(values)
      try {
        const response = await fetch(`${API_URL}/pets/application`, {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        })
        const data = await response.json()
        console.log(body)
        console.log(data)

        navigate('/home')
      } catch (error) {
        console.error(error)
        setError({ ...error, apiError: error.message })
      }
    } else {
      console.error('Ocurrió un error')
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
        {PET_GENDER.map((item) => (
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

      <button className='rounded-md p-1.5 bg-blue-600 text-white hover:bg-blue-900'>
        Enviar Solicitud
      </button>
      {error.apiError && (
        <p className='mt-2 text-red-600 text-sm'>{error.apiError}</p>
      )}
    </form>
  )
}

export default PetRequestForm
