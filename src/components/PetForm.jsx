import { useState } from 'react'
import { validatePetRegisterForm } from '../utils'
import useToken from '../hooks/useToken'
import InputComponent from './InputComponent'
import Button from './Button'

const API_URL = import.meta.env.VITE_API_URL

const PET_TYPE = ['perro', 'gato']
const PET_GENDER = ['masculino', 'femenino']

const PetForm = () => {
  const [values, setValues] = useState({
    name: '',
    animalType: '',
    race: '',
    year: '',
    history: '',
    gender: '',
    size: '',
    characteristics: '',
    location: ''
  })
  const [imagenProfile, setImagenProfile] = useState(null)
  const [imagenDetails, setImagenDetails] = useState([])
  const [error, setError] = useState({})
  const { token } = useToken()

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const handleFileChange = (event) => {
    const { name, files } = event.target
    if (name === 'imagenProfile') {
      setImagenProfile(files[0])
    } else if (name === 'imagenDetails') {
      setImagenDetails(files)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (
      validatePetRegisterForm(values, imagenProfile, imagenDetails, setError)
    ) {
      const formData = new FormData()
      formData.append('name', values.name)
      formData.append('animal_type', values.animalType)
      formData.append('race', values.race)
      formData.append('year', values.year)
      formData.append('history', values.history)
      formData.append('gender', values.gender)
      formData.append('size', values.size)
      formData.append('characteristics', values.characteristics)
      formData.append('location', values.location)
      formData.append('status', 0)
      formData.append('imagen_profile', imagenProfile)

      for (let i = 0; i < imagenDetails.length; i++) {
        formData.append('imagen_details', imagenDetails[i])
      }

      try {
        const response = await fetch(`${API_URL}/pets/register`, {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          console.log('Response:', data)
        } else {
          setError({
            ...error,
            apiError: `Error al registrar la mascota: ${response.statusText}`
          })
          console.error(response.statusText)
        }
      } catch (e) {
        console.error('Ocurrio un error')
        setError({ ...error, apiError: e.message })
      }
    } else {
      console.error('Ocurrio un error en el formulario')
    }
  }

  return (
    <form
      className='flex flex-col xl:flex-row w-full xl:flex-wrap 2xl:justify-center 2xl:gap-[30px] 2xl:mt-20 gap-5'
      onSubmit={handleSubmit}
    >
      <InputComponent
        label={'Nombre'}
        placeholder={'Ej: Pipo'}
        name={'name'}
        value={values.name}
        handleChange={handleChange}
        type={'text'}
        error={error.name}
      />

      <InputComponent
        label={'¿Qué tipo de animal es?'}
        name={'animalType'}
        value={values.animalType}
        handleChange={handleChange}
        type={'select'}
        options={PET_TYPE}
        error={error.animalType}
      />

      <InputComponent
        label={'Raza'}
        placeholder={'Ej: Dogo, Siamés'}
        name={'race'}
        value={values.race}
        handleChange={handleChange}
        type={'text'}
        error={error.race}
      />

      <InputComponent
        label={'Edad'}
        placeholder={'Ej: 2'}
        name={'year'}
        value={values.year}
        handleChange={handleChange}
        type={'number'}
        error={error.year}
      />

      <InputComponent
        label={'¿Cuál es su historial?'}
        placeholder={'Ej: Pipo fue abandonado por su familia...'}
        name={'history'}
        value={values.history}
        handleChange={handleChange}
        type={'text'}
        error={error.history}
      />

      <InputComponent
        label={'Género'}
        name={'gender'}
        value={values.gender}
        handleChange={handleChange}
        type={'select'}
        options={PET_GENDER}
        error={error.gender}
      />

      <InputComponent
        label={'Tamaño (cm)'}
        placeholder={'Ej: 24'}
        name={'size'}
        value={values.size}
        handleChange={handleChange}
        type={'number'}
        error={error.size}
      />

      <InputComponent
        label={'Características'}
        placeholder={
          'Ej: Pipo tiene los ojos claros, una mancha negra detrás de la oreja...'
        }
        name={'characteristics'}
        value={values.characteristics}
        handleChange={handleChange}
        type={'text'}
        error={error.characteristics}
      />

      <InputComponent
        label={'Ubicación'}
        placeholder={'Ej: Buenos Aires, Argentina o Santiago, Chile, etc'}
        name={'location'}
        value={values.location}
        handleChange={handleChange}
        type={'text'}
        error={error.location}
      />

      <div className='text-start text-lg sm:text-[22px] flex flex-col gap-2 w-full 2xl:w-[714px] px-[18px] md:px-[50px]'>
        <label className='font-medium' htmlFor='imagenProfile'>
          Foto
        </label>
        <input
          type='file'
          name='imagenProfile'
          onChange={handleFileChange}
          className='block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-light file:text-blue-800
      hover:file:bg-blue-darker
    '
        />
        {error.imagenProfile && (
          <p className='mt-2 text-red-600 text-sm'>{error.imagenProfile}</p>
        )}
      </div>
      <div className='text-start text-lg sm:text-[22px] flex flex-col gap-2 w-full 2xl:w-[714px] px-[18px] md:px-[50px]'>
        <label className='font-medium' htmlFor='imagenDetails'>
          Más fotos
        </label>
        <input
          type='file'
          name='imagenDetails'
          multiple
          onChange={handleFileChange}
          className='block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-light file:text-blue-800
      hover:file:bg-blue-darker
    '
        />
        {error.imagenDetails && (
          <p className='mt-2 text-red-600 text-sm'>{error.imagenDetails}</p>
        )}
      </div>

      <Button
        textSize='large'
        color='primary'
        size='medium'
        text='Agregar'
        type={'submit'}
      />
      {error.apiError && (
        <p className='mt-2 text-red-600 text-sm'>{error.apiError}</p>
      )}
    </form>
  )
}

export default PetForm
