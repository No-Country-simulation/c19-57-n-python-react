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

export const validatePetRegisterForm = (
  values,
  imagenProfile,
  imagenDetails,
  setError
) => {
  let isValid = true
  const newErrors = {}

  if (values.name.trim() === '') {
    newErrors.name = 'Introduce un nombre'
    isValid = false
  }

  if (values.animalType === 'Seleccionar' || values.animalType.trim() === '') {
    newErrors.animalType = 'Seleccione tipo de animal'
    isValid = false
  }

  if (values.race.trim() === '') {
    newErrors.race = 'Introduce su raza'
    isValid = false
  }

  if (values.year.trim() === '' || isNaN(values.year)) {
    newErrors.year = 'Introduce su edad'
    isValid = false
  }

  if (values.history.trim() === '') {
    newErrors.history = 'Introduce su historial'
    isValid = false
  }

  if (values.gender === 'Seleccionar' || values.gender.trim() === '') {
    newErrors.gender = 'Seleccione género'
    isValid = false
  }

  if (values.size.trim() === '' || isNaN(values.size)) {
    newErrors.size = 'Introduce un tamaño aproximado válido (cm)'
    isValid = false
  }

  if (values.characteristics.trim() === '') {
    newErrors.characteristics = 'Introduce características'
    isValid = false
  }

  if (values.location.trim() === '') {
    newErrors.location = 'Introduce una ubicación'
    isValid = false
  }

  if (!imagenProfile) {
    newErrors.imagenProfile = 'Añade una imagen'
    isValid = false
  }

  if (imagenDetails.length === 0) {
    newErrors.imagenDetails = 'Añade aunque sea una imagen más'
    isValid = false
  }

  setError(newErrors)
  return isValid
}
