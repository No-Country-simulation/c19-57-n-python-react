import { useState } from 'react'

const userRoles = [
  'Seleccionar',
  'Quiero adoptar',
  'Soy un refugio',
  'Soy de transito'
]

const RegisterForm = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
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

    if (values.email.trim() === '') {
      newErrors.email = 'Introduce un email'
      isValid = false
    }

    const validateEmail = (email) => {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
      return regex.test(email)
    }

    if (!validateEmail(values.email)) {
      newErrors.email = 'Introduce un email valido'
      isValid = false
    }

    if (values.role === 'Seleccionar' || values.role === '') {
      newErrors.role = 'Seleccione un rol'
      isValid = false
    }

    if (values.password.trim() === '') {
      newErrors.password = 'Introduce una contraseña'
      isValid = false
    }

    if (values.confirmPassword.trim() === '') {
      newErrors.confirmPassword = 'Introduce una contraseña'
      isValid = false
    }

    if (values.password !== values.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden'
      isValid = false
    }

    setError(newErrors)
    return isValid
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      //reemplazar por la conexion al back a crear un nuevo usuario
      console.log(values)
    } else {
      console.error('Ocurrio un error')
    }
  }

  return (
    <form className='flex flex-col items-center gap-2' onSubmit={handleSubmit}>
      <h2>Formulario de Registro</h2>

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

      <label htmlFor='role'>¿Que quieres hacer?</label>
      <select
        name='role'
        onChange={handleChange}
        className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
      >
        {userRoles.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      {error.role && <p className='mt-2 text-red-600 text-sm'>{error.role}</p>}

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
    </form>
  )
}

export default RegisterForm
