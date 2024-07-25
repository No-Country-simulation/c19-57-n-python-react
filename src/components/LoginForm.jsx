import { useState } from 'react'
import useToken from '../hooks/useToken'
import { useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL

const LoginForm = () => {
  const [values, setValues] = useState({
    username: '',
    password: ''
  })

  const [error, setError] = useState({})

  const { setToken, deleteToken } = useToken()

  const navigate = useNavigate()

  const [success, setSuccess] = useState(null)

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = {}

    if (values.username.trim() === '') {
      newErrors.username = 'Introduce un nombre de usuario'
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

    const body = new URLSearchParams({
      username: values.username,
      password: values.password
    })

    if (validateForm()) {
      try {
        const response = await fetch(`${API_URL}/login`, {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body
        })
        const data = await response.json()
        setToken(data.access_token)
        setSuccess('Exito! Será redirigido en breve.')

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

      <label htmlFor='username'>Nombre de Usuario</label>
      <input
        type='text'
        placeholder='Nombre de Usuario'
        value={values.username}
        name='username'
        onChange={handleChange}
        className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
      />
      {error.username && (
        <p className='mt-2 text-red-600 text-sm'>{error.username}</p>
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
      {success && <p className='mt-2 text-green-600 text-sm'>{success}</p>}
    </form>
  )
}

export default LoginForm
