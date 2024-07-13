export const validateRegisterForm = (values, setError) => {
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

  if (values.name.trim() === '') {
    newErrors.name = 'Introduce tu nombre'
    isValid = false
  }

  if (values.surname.trim() === '') {
    newErrors.surname = 'Introduce tu apellido'
    isValid = false
  }

  if (values.year.trim() === '') {
    newErrors.year = 'Introduce tu edad'
    isValid = false
  }

  if (values.gender === 'Seleccionar' || values.gender === '') {
    newErrors.gender = 'Seleccione su genero'
    isValid = false
  }

  if (values.country === 'Seleccionar' || values.country === '') {
    newErrors.country = 'Seleccione su genero'
    isValid = false
  }

  if (values.phone.trim() === '') {
    newErrors.phone = 'Introduce tu telefono'
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
