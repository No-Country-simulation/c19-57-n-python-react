import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const PET_TYPE = ['perro', 'gato']
const PET_GENDER = ['masculino', 'femenino']

const API_URL = import.meta.env.VITE_API_URL
const IMG_FOLDER_URL = import.meta.env.VITE_IMG_FOLDER_URL

const PetEditForm = () => {
  const { id } = useParams()

  const [values, setValues] = useState({
    name: '',
    animal_type: '',
    race: '',
    year: '',
    history: '',
    gender: '',
    size: '',
    characteristics: '',
    location: '',
    imagen_profile: '',
    imagen_details: ''
  })
  const [detailsImages, setDetailsImages] = useState([])
  const [profileImage, setProfileImage] = useState()
  const [currentDetailsImages, setCurrentDetailsImages] = useState()
  const [success, setSuccess] = useState(false)

  const [error, setError] = useState({})

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const handleProfileFileChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = (e) => {
        setProfileImage(e.target.result)
        setValues({ ...values, imagen_profile: file.name })
      }

      reader.readAsDataURL(file)
    }
  }

  const handleDetailsFileChange = (event) => {
    const files = Array.from(event.target.files)
    const imageUrls = []
    const names = files.map((file) => file.name)

    files.forEach((file) => {
      const reader = new FileReader()

      reader.onload = (e) => {
        imageUrls.push({ name: file.name, url: e.target.result })
        if (imageUrls.length === files.length) {
          setDetailsImages(imageUrls)
          const updatedImageNames = values.imagen_details
            ? `${values.imagen_details},${names.join(',')}`
            : names.join(',')
          setValues({ ...values, imagen_details: updatedImageNames })
        }
      }

      reader.readAsDataURL(file)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccess(false)

    /*   este formato 12/7/2024 - 22:35:04   
    const create_at = `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`

    o este: 2024-07-13T01:37:00.629Z
     */
    const create_at = new Date().toISOString()

    console.log(values.imagen_details)

    const body = JSON.stringify({
      ...values,
      year: parseFloat(values.year),
      create_at,
      size: parseFloat(values.size)
    })

    try {
      console.log(values)
      const response = await fetch(`${API_URL}/pets/editing/${id}`, {
        method: 'PUT',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      data.message ? setSuccess(data.message) : setSuccess(false)

      //decidir si se redirige o no
    } catch (error) {
      console.error(error)
      setError({ ...error, apiError: error.message })
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_URL}/pets/${id}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await response.json()

        setValues({
          id: data.id,
          name: data.name || '',
          animal_type: data.animal_type || '',
          race: data.race || '',
          year: data.year ? data.year : 0,
          history: data.history || '',
          gender: data.gender || '',
          size: data.size ? data.size : 0,
          characteristics: data.characteristics || '',
          location: data.location || '',
          imagen_profile: data.imagen_profile || '',
          imagen_details: data.imagen_details || '',
          status: data.status ? data.status : 0
        })
        setCurrentDetailsImages(data.imagen_details)
      } catch (err) {
        setError({ ...error, apiError: err.message })
      }
    }

    fetchData()
  }, [id])

  return (
    <form className='flex flex-col items-center gap-2' onSubmit={handleSubmit}>
      {values.imagen_profile && !profileImage && (
        <div>
          <label>Imagen de Perfil:</label>
          <img
            src={`${IMG_FOLDER_URL}/perfil/${values.imagen_profile}`}
            alt='Imagen de perfil'
            className='size-48 rounded-full'
          />
        </div>
      )}
      {profileImage && (
        <div>
          <label>Imagen de Perfil:</label>
          <img
            src={profileImage}
            alt='Imagen de perfil'
            className='size-48 rounded-full'
          />
        </div>
      )}
      <div>
        <label>Subir nueva imagen de perfil:</label>
        <input
          type='file'
          name='imagen_profile'
          onChange={handleProfileFileChange}
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
        <label>Nombre:</label>
        <input
          type='text'
          name='name'
          placeholder='Ej: Pipo'
          value={values.name}
          onChange={handleChange}
          className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
          required
        />
        {error.name && (
          <p className='mt-2 text-red-600 text-sm'>{error.name}</p>
        )}
      </div>

      <div>
        <label htmlFor='gender'>¿Que tipo de animal es?</label>
        <select
          name='animal_type'
          onChange={handleChange}
          className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
        >
          <option value={values.race}>{values.race.toUpperCase()}</option>
          {PET_TYPE.map((item) => (
            <option key={item} value={item}>
              {item.toUpperCase()}
            </option>
          ))}
        </select>
        {error.animal_type && (
          <p className='mt-2 text-red-600 text-sm'>{error.animal_type}</p>
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
          required
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
          required
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
          required
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
          <option value={values.gender}>{values.gender.toUpperCase()}</option>
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
          required
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
          required
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
          required
        />
        {error.location && (
          <p className='mt-2 text-red-600 text-sm'>{error.location}</p>
        )}
      </div>

      <div>
        <label>Más fotos</label>
        {values.imagen_details && values.imagen_details.length > 0 && (
          <div>
            <div className='flex flex-wrap'>
              {[currentDetailsImages].map((item) => (
                <img
                  src={`${IMG_FOLDER_URL}/details/${item}`}
                  alt='Imagen extra'
                  className='size-20 rounded-full'
                  key={item}
                />
              ))}
              {detailsImages &&
                detailsImages.map((item) => (
                  <img
                    src={item.url}
                    alt='Imagen extra'
                    className='size-20 rounded-full'
                    key={item.url}
                  />
                ))}
            </div>
          </div>
        )}
        <label htmlFor='imagenDetails'>Subir Más Imagenes:</label>
        <input
          type='file'
          name='imagenDetails'
          multiple
          onChange={handleDetailsFileChange}
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
        className='rounded-md p-2 bg-blue-500 text-white hover:bg-blue-900'
        type='submit'
      >
        Editar Mascota
      </button>
      {error.apiError && (
        <p className='mt-2 text-red-600 text-sm'>{error.apiError}</p>
      )}
      {success && <p className='text-green-500'>{success}</p>}
    </form>
  )
}

export default PetEditForm
