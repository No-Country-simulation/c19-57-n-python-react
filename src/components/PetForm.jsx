import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL

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
    location: '',
    status: ''
  })
  const [imagenProfile, setImagenProfile] = useState(null)
  const [imagenDetails, setImagenDetails] = useState([])

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
    formData.append('status', values.status)
    formData.append('imagen_profile', imagenProfile)

    for (let i = 0; i < imagenDetails.length; i++) {
      formData.append('imagen_details', imagenDetails[i])
    }

    const response = await fetch(`${API_URL}/pets/register`, {
      method: 'POST',
      body: formData
    })

    if (response.ok) {
      const data = await response.json()
      console.log('Response:', data)
    } else {
      console.error('Error al registrar la mascota')
    }
  }

  return (
    <form className='flex flex-col items-center gap-2' onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type='text'
          name='name'
          value={values.name}
          onChange={handleChange}
          className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
        />
      </div>
      <div>
        <label>Tipo de Animal:</label>
        <input
          type='text'
          name='animalType'
          value={values.animalType}
          onChange={handleChange}
          className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
        />
      </div>
      <div>
        <label>Raza:</label>
        <input
          type='text'
          name='race'
          value={values.race}
          onChange={handleChange}
          className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
        />
      </div>
      <div>
        <label>Año:</label>
        <input
          type='number'
          name='year'
          value={values.year}
          onChange={handleChange}
          className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
        />
      </div>
      <div>
        <label>Historia:</label>
        <input
          type='text'
          name='history'
          value={values.history}
          onChange={handleChange}
          className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
        />
      </div>
      <div>
        <label>Género:</label>
        <input
          type='text'
          name='gender'
          value={values.gender}
          onChange={handleChange}
          className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
        />
      </div>
      <div>
        <label>Tamaño:</label>
        <input
          type='number'
          name='size'
          value={values.size}
          onChange={handleChange}
          className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
        />
      </div>
      <div>
        <label>Características:</label>
        <input
          type='text'
          name='characteristics'
          value={values.characteristics}
          onChange={handleChange}
          className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
        />
      </div>
      <div>
        <label>Ubicación:</label>
        <input
          type='text'
          name='location'
          value={values.location}
          onChange={handleChange}
          className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
        />
      </div>
      <div>
        <label>Estado:</label>
        <input
          type='number'
          name='status'
          value={values.status}
          onChange={handleChange}
          className='rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
        />
      </div>
      <div>
        <label>Imagen de Perfil:</label>
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
        <label>Imágenes Detalles:</label>
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
    </form>
  )
}

export default PetForm
