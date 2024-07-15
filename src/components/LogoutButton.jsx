import { useNavigate } from 'react-router-dom'
import useToken from '../hooks/useToken'

const LogoutButton = ({ styles }) => {
  const navigate = useNavigate()
  const { deleteToken } = useToken()

  const handleClick = () => {
    deleteToken()
    navigate('/')
  }

  return (
    <button
      type='button'
      onClick={handleClick}
      className={`${
        styles
          ? styles
          : 'rounded-md p-1.5 bg-blue-600 text-white hover:bg-blue-900'
      }`}
    >
      Logout
    </button>
  )
}

export default LogoutButton
