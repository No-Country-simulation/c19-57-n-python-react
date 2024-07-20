import { useState } from 'react'
import useToken from '../hooks/useToken'
import { useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL

const LoginForm = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState({})

  const { setToken, deleteToken } = useToken()

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
      newErrors.email = 'Introduce un email valido'
      isValid = false
    }

    if (values.email.trim() === '') {
      newErrors.email = 'Introduce un email'
      isValid = false
    }

    if (values.password.trim() === '') {
      newErrors.password = 'Introduce una contraseña'
      isValid = false
    }

    setError(newErrors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      try {
        const response = await fetch(`${API_URL}/login`, {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        })
        const data = await response.json()
        setToken(data)

        //redirige al home al estar logeado
        navigate('/')
      } catch (error) {
        console.error(error)
        setError({ ...error, apiError: error.message })
        deleteToken()
      }
    } else {
      console.error('Ocurrio un error')
    }
  }

  return (
    <form className='flex flex-col items-center gap-2' onSubmit={handleSubmit}>
      <h2>Iniciar Sesion</h2>

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

      <button className='rounded-md p-1.5 bg-blue-600 text-white hover:bg-blue-900'>
        Iniciar Sesion
      </button>
      {error.apiError && (
        <p className='mt-2 text-red-600 text-sm'>{error.apiError}</p>
      )}
    </form>
  )
}

export default LoginForm