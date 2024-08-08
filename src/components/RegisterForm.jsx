import { useState } from 'react'
import { validateRegisterForm } from '../utils'
import useToken from '../hooks/useToken'

const userGender = [
  'Seleccionar',
  'femenino',
  'masculino',
  'no binario',
  'prefiero no decirlo'
]

const userCountries = ['Seleccionar', 'argentina', 'chile', 'colombia', 'peru']

const API_URL = import.meta.env.VITE_API_URL

const RegisterForm = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    surname: '',
    year: '',
    phone: '',
    gender: '',
    country: '',
    imgen_profile: ''
  })

  const [error, setError] = useState({})
  const { token } = useToken()

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { year } = values

    const parseYear = parseFloat(year)

    /*   este formato 12/7/2024 - 22:35:04   
    const create_at = `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`

    o este: 2024-07-13T01:37:00.629Z
     */
    const create_at = new Date().toISOString()
    console.log(create_at)

    //sacar cuando actualicen el back
    const body = JSON.stringify({
      ...values,
      id: 0,
      year: parseYear,
      create_at
    })

    if (validateRegisterForm(values, setError)) {
      try {
        console.log(values)
        await fetch(`${API_URL}/register`, {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body
        })
      } catch (error) {
        console.error(error)
        setError({ ...error, apiError: error.message })
      }
    } else {
      console.error('Ocurrio un error')
    }
  }

  return (
    <form className='flex flex-col items-center gap-2' onSubmit={handleSubmit}>
      <h2>Formulario de Registro</h2>

      <label>Nombre</label>
      <input
        type='text'
        placeholder='Nombre'
        value={values.name}
        name='name'
        onChange={handleChange}
        className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
      />
      {error.name && <p className='mt-2 text-red-600 text-sm'>{error.name}</p>}

      <label>Apellido</label>
      <input
        type='text'
        placeholder='Apellido'
        value={values.surname}
        name='surname'
        onChange={handleChange}
        className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
      />
      {error.surname && (
        <p className='mt-2 text-red-600 text-sm'>{error.surname}</p>
      )}

      <label>Imagen</label>
      <input
        type='text'
        placeholder='url de imagen'
        value={values.imgen_profile}
        name='imgen_profile'
        onChange={handleChange}
        className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
      />
      {error.imgen_profile && (
        <p className='mt-2 text-red-600 text-sm'>{error.imgen_profile}</p>
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

      <label>Edad</label>
      <input
        type='number'
        placeholder='18'
        value={values.year}
        name='year'
        onChange={handleChange}
        className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
      />
      {error.year && <p className='mt-2 text-red-600 text-sm'>{error.year}</p>}

      <label htmlFor='gender'>Genero</label>
      <select
        name='gender'
        onChange={handleChange}
        className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
      >
        {userGender.map((item) => (
          <option key={item} value={item}>
            {item.toUpperCase()}
          </option>
        ))}
      </select>
      {error.gender && (
        <p className='mt-2 text-red-600 text-sm'>{error.gender}</p>
      )}

      <label htmlFor='country'>Nacionalidad</label>
      <select
        name='country'
        onChange={handleChange}
        className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
      >
        {userCountries.map((item) => (
          <option key={item} value={item}>
            {item.toUpperCase()}
          </option>
        ))}
      </select>
      {error.country && (
        <p className='mt-2 text-red-600 text-sm'>{error.country}</p>
      )}

      <label>Telefono</label>
      <input
        type='number'
        placeholder='1112345678'
        value={values.phone}
        name='phone'
        onChange={handleChange}
        className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
      />
      {error.phone && (
        <p className='mt-2 text-red-600 text-sm'>{error.phone}</p>
      )}

      <label htmlFor='password'>Contraseña</label>
      <input
        type='password'
        placeholder='Contraseña'
        value={values.password}
        name='password'
        onChange={handleChange}
        className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
      />
      {error.password && (
        <p className='mt-2 text-red-600 text-sm'>{error.password}</p>
      )}

      <label htmlFor='confirmPassword'>Repetir contraseña</label>
      <input
        type='password'
        placeholder='Contraseña'
        value={values.confirmPassword}
        name='confirmPassword'
        onChange={handleChange}
        className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
      />
      {error.confirmPassword && (
        <p className='mt-2 text-red-600 text-sm'>{error.confirmPassword}</p>
      )}

      <button className='rounded-md p-1.5 bg-blue-600 text-white hover:bg-blue-900'>
        Registrarse
      </button>

      {error.apiError && (
        <p className='mt-2 text-red-600 text-sm'>{error.apiError}</p>
      )}
    </form>
  )
}

export default RegisterForm
