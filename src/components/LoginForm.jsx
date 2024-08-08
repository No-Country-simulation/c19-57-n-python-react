import { useState } from 'react'
import useToken from '../hooks/useToken'
import { useNavigate } from 'react-router-dom'
import TitleComponent from './TitleComponent'
import InputComponent from './InputComponent'
import Button from './Button'
import { useAuth } from '../context/AuthContext'

const API_URL = import.meta.env.VITE_API_URL

const LoginForm = () => {
  const [values, setValues] = useState({
    username: '',
    password: ''
  })

  const [error, setError] = useState({})

  const { setToken, deleteToken } = useToken()

  const { setUserAuth } = useAuth()

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
        setUserAuth(true)

        //redirige al home al estar logeado
        navigate('/', { replace: true })
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
    <form className='flex flex-col items-center gap-5' onSubmit={handleSubmit}>
      <TitleComponent title={'Iniciar Sesión'} />

      <InputComponent
        label={'Usuario'}
        placeholder={'Nombre de Usuario'}
        name={'username'}
        value={values.username}
        handleChange={handleChange}
        type={'text'}
        error={error.username}
      />

      <InputComponent
        label={'Contraseña'}
        placeholder={'Contraseña'}
        name={'password'}
        value={values.password}
        handleChange={handleChange}
        type={'password'}
        error={error.password}
      />

      <div className='2xl:w-[714px] px-[18px] md:px-[50px] w-full'>
        <Button
          textSize='large'
          color='primary'
          size='login'
          text='Entrar'
          type={'submit'}
        />
      </div>

      {/* <button className='rounded-md p-1.5 bg-blue-600 text-white hover:bg-blue-900'>
        Iniciar Sesion
      </button> */}
      {error.apiError && (
        <p className='mt-2 text-red-600 text-sm'>{error.apiError}</p>
      )}
      {success && <p className='mt-2 text-green-600 text-sm'>{success}</p>}
    </form>
  )
}

export default LoginForm
