import { useState } from 'react'

const LoginForm = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState({})

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

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      //reemplazar por la conexion al back para loguear al usuario
      console.log(values)
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
    </form>
  )
}

export default LoginForm
