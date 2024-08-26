/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PetRelatedList from '../components/PetRelatedList'
import { Loading } from '../components/loading'

const IMG_FOLDER_URL = import.meta.env.VITE_IMG_FOLDER_URL
const API_URL = import.meta.env.VITE_API_URL

const PetDetails = () => {
  const [pet, setPet] = useState()
  const { id } = useParams()

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

  const getPet = async () => {
    const response = await fetch(`${API_URL}/pets/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()
    console.log(data)

    if (response.ok) {
      data.characteristics = decodeText(data.characteristics)
      data.history = decodeText(data.history)
      setPet(data)
    }
  }

  const handleImageError = (event) => {
    event.target.src = `/pet_not_found.png`
  }

  useEffect(() => {
    getPet()
  }, [id])

  return (
    <>
      {!pet && <Loading />}
      {pet && (
        <div className='mx-auto lg:max-w-[1216px]' id='PetDetails'>
          <div className='w-full bg-pink-default py-[30px] px-[20px] flex items-center place-content-between'>
            <h1 className='text-left text-2xl font-semibold'>{pet.name}</h1>
          </div>
          <div className='shadow-[0px_7px_25px_-9px_#00000040] rounded-2xl md:flex md:mb-[43px] items-center'>
            <div className='overflow-hidden rounded-b-2xl mb-[34px] md:mb-0 md:w-1/2'>
              <img
                className='m-auto'
                src={pet.imagen_profile}
                alt='Pet image'
                onError={handleImageError}
              />
            </div>
            <div className='capitalize flex w-full px-[20px] pb-5 mb-6 md:mb-0 md:flex-col md:w-1/2 md:pr-[50px]'>
              <div className='md:space-y-3 md:ml-[29px] md:mb-[25px] flex place-content-between w-full md:block'>
                <p className='font-semibold flex flex-col items-center text-[14px] md:text-[20px] gap-1 md:flex-row md:font-normal'>
                  <img
                    className='md:inline mr-2'
                    src='/gender.svg'
                    alt='Gender Icon'
                  />
                  <span className='md:font-semibold uppercase text-[10px] md:text-xl'>
                    Sexo<span className='hidden md:inline'>:</span>{' '}
                  </span>
                  {pet.gender}
                </p>
                <p className='font-semibold flex flex-col items-center text-[14px] md:text-[20px] gap-1 md:flex-row md:font-normal'>
                  <img
                    className='md:inline mr-2'
                    src='/caracter.svg'
                    alt='Caracter Icon'
                  />
                  <span className='md:font-semibold uppercase text-[10px] md:text-xl'>
                    Carácter<span className='hidden md:inline'>:</span>{' '}
                  </span>
                  {pet.characteristics.split(',')[0]}
                </p>
                <p className='font-semibold flex flex-col items-center text-[14px] md:text-[20px] gap-1 md:flex-row md:font-normal'>
                  <img
                    className='md:inline mr-2'
                    src='/size.svg'
                    alt='Size Icon'
                  />
                  <span className='md:font-semibold uppercase text-[10px] md:text-xl'>
                    Tamaño<span className='hidden md:inline'>:</span>{' '}
                  </span>
                  {pet.size} cm
                </p>
                <p className='font-semibold flex flex-col items-center text-[14px] md:text-[20px] gap-1 md:flex-row md:font-normal'>
                  <img
                    className='md:inline mr-2'
                    src='/years.svg'
                    alt='Years Icon'
                  />
                  <span className='md:font-semibold uppercase text-[10px] md:text-xl'>
                    Edad<span className='hidden md:inline'>:</span>{' '}
                  </span>
                  {pet.year} años
                </p>
              </div>
              <Link
                to={`/petRequestForm/${id}`}
                className='hidden md:block bg-pink-default font-semibold py-2 w-full rounded-2xl'
              >
                Quiero adoptar
              </Link>
            </div>
          </div>
          <div className='px-5 mb-[38px]'>
            <h2 className='mb-3 font-medium text-blue-darker'>Detalle</h2>
            <p className='mb-[38px] text-blue-darker'>{pet.history}</p>
            <Link
              to={`/petRequestForm/${id}`}
              className='md:hidden bg-pink-default font-semibold py-2 w-full rounded-2xl block text-center'
            >
              Quiero adoptar
            </Link>
          </div>
          <h2 className='font-medium text-xl text-center mb-[44px]'>
            Mascotas relacionadas
          </h2>
          <PetRelatedList type={pet.animal_type} id={pet.id} />
        </div>
      )}
    </>
  )
}
export default PetDetails
