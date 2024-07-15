import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validatePetRegisterForm } from '../utils'

const API_URL = import.meta.env.VITE_API_URL

const PET_TYPE = ['Seleccionar', 'perro', 'gato']
const PET_GENDER = ['Seleccionar', 'masculino', 'femenino']

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
  const navigate = useNavigate()

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
          body: formData
        })

        if (response.ok) {
          const data = await response.json()
          console.log('Response:', data)

          //aca deberia redirigir hacia algun otro lado
          navigate('/')
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
    <form className='flex flex-col items-center gap-2' onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type='text'
          name='name'
          placeholder='Ej: Pipo'
          value={values.name}
          onChange={handleChange}
          className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
        />
        {error.name && (
          <p className='mt-2 text-red-600 text-sm'>{error.name}</p>
        )}
      </div>

      <div>
        <label htmlFor='gender'>¿Que tipo de animal es?</label>
        <select
          name='animalType'
          onChange={handleChange}
          className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
        >
          {PET_TYPE.map((item) => (
            <option key={item} value={item}>
              {item.toUpperCase()}
            </option>
          ))}
        </select>
        {error.animalType && (
          <p className='mt-2 text-red-600 text-sm'>{error.animalType}</p>
        )}
      </div>

      <div>
        <label>Raza:</label>
        <input
          type='text'
          name='race'
          placeholder='Ej: Dogo, Siamés'
          value={values.race}
          onChange={handleChange}
          className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
        />
        {error.race && (
          <p className='mt-2 text-red-600 text-sm'>{error.race}</p>
        )}
      </div>

      <div>
        <label>Edad: </label>
        <input
          type='number'
          name='year'
          placeholder='Ej: 2'
          value={values.year}
          onChange={handleChange}
          className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
        />
        {error.year && (
          <p className='mt-2 text-red-600 text-sm'>{error.year}</p>
        )}
      </div>

      <div>
        <label>¿Cual es su historial?</label>
        <input
          type='text'
          name='history'
          placeholder='Ej: Pipo fue abandonado por su familia...'
          value={values.history}
          onChange={handleChange}
          className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
        />
        {error.history && (
          <p className='mt-2 text-red-600 text-sm'>{error.history}</p>
        )}
      </div>

      <div>
        <label htmlFor='gender'>Género:</label>
        <select
          name='gender'
          onChange={handleChange}
          className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
        >
          {PET_GENDER.map((item) => (
            <option key={item} value={item}>
              {item.toUpperCase()}
            </option>
          ))}
        </select>
        {error.gender && (
          <p className='mt-2 text-red-600 text-sm'>{error.gender}</p>
        )}
      </div>

      <div>
        <label>Tamaño (cm):</label>
        <input
          type='number'
          name='size'
          placeholder='Ej: 24'
          value={values.size}
          onChange={handleChange}
          className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
        />
        {error.size && (
          <p className='mt-2 text-red-600 text-sm'>{error.size}</p>
        )}
      </div>

      <div>
        <label>Características:</label>
        <input
          type='text'
          name='characteristics'
          placeholder='Ej: Pipo tiene los ojos claros, una mancha negra detrás de la oreja...'
          value={values.characteristics}
          onChange={handleChange}
          className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
        />
        {error.characteristics && (
          <p className='mt-2 text-red-600 text-sm'>{error.characteristics}</p>
        )}
      </div>

      <div>
        <label>Ubicación:</label>
        <input
          type='text'
          name='location'
          placeholder='Ej: Buenos Aires, Argentina o Santiago, Chile, etc'
          value={values.location}
          onChange={handleChange}
          className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
        />
        {error.location && (
          <p className='mt-2 text-red-600 text-sm'>{error.location}</p>
        )}
      </div>

      <div>
        <label>Foto</label>
        <input
          type='file'
          name='imagenProfile'
          onChange={handleFileChange}
          className='block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    '
        />
      </div>
      <div>
        <label>Más fotos</label>
        <input
          type='file'
          name='imagenDetails'
          multiple
          onChange={handleFileChange}
          className='block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    '
        />
      </div>
      <button
        className='rounded-md p-1.5 bg-blue-600 text-white hover:bg-blue-900'
        type='submit'
      >
        Registrar Mascota
      </button>
      {error.apiError && (
        <p className='mt-2 text-red-600 text-sm'>{error.apiError}</p>
      )}
    </form>
  )
}

export default PetForm
