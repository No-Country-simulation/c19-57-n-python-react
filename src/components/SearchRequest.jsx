import { useState } from 'react'
import TitleComponent from './TitleComponent'
import useToken from '../hooks/useToken'

const API_URL = import.meta.env.VITE_API_URL

const SearchRequest = () => {
  const [search, setSearch] = useState('')
  const [data, setData] = useState()
  const [error, setError] = useState()
  const { token } = useToken()

  //por ahora solo funciona introduciendo ids
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    const fetchUrl = `${API_URL}/pets/application/email/${search}`.toString()

    try {
      const response = await fetch(fetchUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setData(data)
      }
      if (!response.ok) {
        setError(response.statusText)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='flex flex-col items-center justify-center'>
      <TitleComponent title={'Consultar Estado de Solicitud'} />
      <form
        className='flex items-center rounded-[14px] border-[1px] border-[#435B71] px-[20px] py-3 sm:w-96 -mt-12 bg-[#ffff] gap-3 mx-3'
        onSubmit={handleSubmit}
      >
        <button>
          <svg
            width='20'
            height='19'
            viewBox='0 0 20 19'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M18.7818 14.7254L15.4969 11.6244L12.9702 10.639C13.8115 9.50964 14.2622 8.16228 14.2606 6.78161C14.2606 3.07021 11.062 0.0507812 7.13029 0.0507812C3.19862 0.0507812 0 3.07021 0 6.78161C0 10.493 3.19862 13.5124 7.13029 13.5124C8.60562 13.514 10.0447 13.0812 11.2472 12.2742L12.2884 14.653L15.5732 17.7541C15.7839 17.9529 16.034 18.1107 16.3092 18.2183C16.5845 18.326 16.8795 18.3814 17.1774 18.3814C17.4754 18.3814 17.7704 18.326 18.0457 18.2184C18.3209 18.1108 18.571 17.953 18.7817 17.7542C18.9924 17.5553 19.1595 17.3192 19.2736 17.0594C19.3876 16.7995 19.4463 16.521 19.4463 16.2398C19.4463 15.9585 19.3876 15.68 19.2736 15.4202C19.1596 15.1604 18.9925 14.9243 18.7818 14.7254ZM1.29642 6.78161C1.29642 3.74509 3.91356 1.27457 7.13029 1.27457C10.347 1.27457 12.9642 3.74509 12.9642 6.78161C12.9642 9.81814 10.347 12.2887 7.13029 12.2887C3.91356 12.2887 1.29642 9.81814 1.29642 6.78161ZM17.8651 16.8887C17.6826 17.0606 17.4353 17.1571 17.1775 17.1571C16.9197 17.1571 16.6725 17.0606 16.49 16.8887L13.3878 13.9604L12.4198 11.7485L14.7629 12.6623L17.8651 15.5907C18.0472 15.763 18.1494 15.9964 18.1494 16.2397C18.1494 16.4831 18.0471 16.7165 17.8651 16.8887Z'
              fill='#435B71'
            />
          </svg>
        </button>
        <input
          className='placeholder-[#435B71] outline-none'
          type='text'
          placeholder='Search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      {data && !error && (
        <div className='flex flex-col gap-1 text-xl mt-5'>
          <h3>
            NOMBRE :{data.name.toUpperCase()} {data.last_name.toUpperCase()}
          </h3>
          <p>ESTADO: {data.status_appli}</p>
        </div>
      )}
      {!data && !error && (
        <h3 className='mt-5'>Ingrese su mail para consultar</h3>
      )}
      {error && <p className='text-red-500'>{error}</p>}
    </div>
  )
}

export default SearchRequest
