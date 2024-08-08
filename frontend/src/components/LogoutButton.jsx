import { useNavigate } from 'react-router-dom'
import useToken from '../hooks/useToken'
import { useAuth } from '../context/AuthContext'

const LogoutButton = ({ styles }) => {
  const navigate = useNavigate()
  const { deleteToken } = useToken()
  const { setUserAuth } = useAuth()

  const handleClick = () => {
    deleteToken()
    setUserAuth(false)
    navigate('/', { replace: true })
  }

  return (
    <button
      type='button'
      onClick={handleClick}
      className={`${
        styles
          ? styles
          : 'text-xl md:font-medium font-semibold text-black no-underline'
      }`}
    >
      Cerrar Sesion
    </button>
  )
}

export default LogoutButton
