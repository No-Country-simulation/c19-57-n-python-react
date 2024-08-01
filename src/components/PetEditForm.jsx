import { useEffect, useState } from 'react'
import useToken from '../hooks/useToken'
import { useParams } from 'react-router-dom'
import InputComponent from './InputComponent'
import Button from './Button'

const PET_TYPE = ['perro', 'gato']
const PET_GENDER = ['masculino', 'femenino']

const API_URL = import.meta.env.VITE_API_URL
const IMG_FOLDER_URL = import.meta.env.VITE_IMG_FOLDER_URL

const PetEditForm = () => {
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
  const { id } = useParams()
  const [error, setError] = useState({})
  const { token } = useToken()

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
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response
      data.message ? setSuccess(data.message) : setSuccess(false)
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
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
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
        <div className='text-start text-lg sm:text-[22px] flex flex-col gap-2 w-full 2xl:w-[714px] px-[18px] md:px-[50px]'>
          <label className='font-medium'>Imagen de Perfil:</label>
          <img
            src={`${IMG_FOLDER_URL}/perfil/${values.imagen_profile}`}
            alt='Imagen de perfil'
            className='size-36 rounded-2xl'
          />
        </div>
      )}
      {profileImage && (
        <div>
          <label className='font-medium'>Imagen de Perfil:</label>
          <img
            src={profileImage}
            alt='Imagen de perfil'
            className='size-48 rounded-2xl'
          />
        </div>
      )}
      <div className='text-start text-lg sm:text-[22px] flex flex-col gap-2 w-full 2xl:w-[714px] px-[18px] md:px-[50px]'>
        <label className='font-medium'>Subir nueva imagen de perfil:</label>
        <input
          type='file'
          name='imagen_profile'
          onChange={handleProfileFileChange}
          className='block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
      file:bg-blue-light file:text-blue-800
      hover:file:bg-blue-darker
          '
        />
      </div>
      <InputComponent
        label={'Subir nueva imagen de perfil'}
        name={'imagen_profile'}
        handleChange={handleProfileFileChange}
        type={'file'}
        error={error.imagen_profile}
      />

      <InputComponent
        label={'Nombre'}
        placeholder={'Ej: Pipo'}
        name={'name'}
        value={values.name}
        handleChange={handleChange}
        type={'text'}
        error={error.name}
        required
      />

      <InputComponent
        label={'¿Qué tipo de animal es?'}
        name={'animalType'}
        value={values.animal_type}
        handleChange={handleChange}
        type={'select'}
        options={PET_TYPE}
        error={error.animal_type}
      />

      <InputComponent
        label={'Raza'}
        placeholder={'Ej: Dogo, Siamés'}
        name={'race'}
        value={values.race}
        handleChange={handleChange}
        type={'text'}
        error={error.race}
        required
      />

      <InputComponent
        label={'Edad'}
        placeholder={'Ej: 2'}
        name={'year'}
        value={values.year}
        handleChange={handleChange}
        type={'number'}
        error={error.year}
        required
      />

      <InputComponent
        label={'¿Cuál es su historial?'}
        placeholder={'Ej: Pipo fue abandonado por su familia...'}
        name={'history'}
        value={values.history}
        handleChange={handleChange}
        type={'text'}
        error={error.history}
        required
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
        required
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
        required
      />

      <InputComponent
        label={'Ubicación'}
        placeholder={'Ej: Buenos Aires, Argentina o Santiago, Chile, etc'}
        name={'location'}
        value={values.location}
        handleChange={handleChange}
        type={'text'}
        error={error.location}
        required
      />

      <div className='text-start text-lg sm:text-[22px] flex flex-col gap-2 w-full 2xl:w-[714px] px-[18px] md:px-[50px]'>
        <label className='font-medium'>Más fotos</label>
        {values.imagen_details && values.imagen_details.length > 0 && (
          <div>
            <div className='flex flex-wrap'>
              {[currentDetailsImages].map((item) => (
                <img
                  src={`${IMG_FOLDER_URL}/details/${item}`}
                  alt='Imagen extra'
                  className='size-20 rounded-2xl'
                  key={item}
                />
              ))}
              {detailsImages &&
                detailsImages.map((item) => (
                  <img
                    src={item.url}
                    alt='Imagen extra'
                    className='size-20 rounded-2xl'
                    key={item.url}
                  />
                ))}
            </div>
          </div>
        )}
        <label className='font-medium' htmlFor='imagenDetails'>
          Subir Más Imagenes:
        </label>
        <input
          type='file'
          name='imagenDetails'
          multiple
          onChange={handleDetailsFileChange}
          className='block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-light file:text-blue-800
      hover:file:bg-blue-darker
    '
        />
      </div>
      <Button
        textSize='large'
        color='primary'
        size='large'
        text='Editar'
        type={'submit'}
      />
      {error.apiError && (
        <p className='mt-2 text-red-600 text-sm'>{error.apiError}</p>
      )}
      {success && <p className='text-green-500'>{success}</p>}
    </form>
  )
}

export default PetEditForm
