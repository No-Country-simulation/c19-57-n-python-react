import { Link } from 'react-router-dom'

const IMG_FOLDER_URL = import.meta.env.VITE_IMG_FOLDER_URL

const PetCard = ({ nombre, sexo, edad, tamaño, caracter, imagen, id }) => {
  const decodeText = (text) => {
    try {
      const bytes = new Uint8Array(
        text.split('').map((char) => char.charCodeAt(0))
      )
      return new TextDecoder('utf-8').decode(bytes)
    } catch (e) {
      console.error('Error decoding text:', e)
      return text
    }
  }

  const handleImageError = (event) => {
    event.target.src = `http://localhost:8000/static/imagenes/perfil/${imagen}`
  }

  return (
    <div className='rounded-[14px] overflow-hidden shadow-[0_0_25px_0_#0000001A] pb-[37px] flex flex-col w-full max-w-[357px] md:max-w-[202px] lg:max-w-[281px] mx-auto'>
      <div className='bg-[#F9D7BD] h-[265px] w-full rounded-b-[14px]'>
        <img
          className='w-full h-full rounded-b-[14px]'
          src={`${IMG_FOLDER_URL}/perfil/${imagen}`}
          alt={`Imagen de ${nombre}`}
          onError={handleImageError}
        />
      </div>
      <div className='px-7 text-[18px] text-[#002140] md:flex md:flex-col flex-grow justify-between'>
        <div>
          <h2 className='text-center text-[18px] font-medium mt-[15px] mb-3'>
            {nombre}
          </h2>
          <p className='md:text-[14px]'>Sexo: {sexo}</p>
          <p className='md:text-[14px]'>Edad: {edad}</p>
          <p className='md:text-[14px]'>Tamaño: {tamaño}</p>
          <p className='md:text-[14px]'>Carácter: {decodeText(caracter)}</p>
        </div>
        <Link to={`/petdetails/${id}`}>
          <button className='text-[20px] font-semibold bg-[#FDE4D1] rounded-[14px] py-2 w-full mt-[15px]'>
            Adoptar
          </button>
        </Link>
      </div>
    </div>
  )
}
export default PetCard
