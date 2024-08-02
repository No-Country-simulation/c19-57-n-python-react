import { createContext, useContext, useEffect, useState } from 'react'
import useToken from '../hooks/useToken'

const AuthContext = createContext({
  userAuth: null,
  setUserAuth: () => {},
  isLoading: true
})

export const useAuth = () => useContext(AuthContext)

const API_URL = import.meta.env.VITE_API_URL

const AuthProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { token, deleteToken } = useToken()

  useEffect(() => {
    const verifyToken = async () => {
      setIsLoading(true)
      if (!token) {
        setUserAuth(false)
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch(`${API_URL}/auth`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })

        if (!response.ok) {
          deleteToken()
          setUserAuth(false)
          setIsLoading(false)
          return
        }

        await response.json()
        setUserAuth(true)
      } catch (err) {
        deleteToken()
        setUserAuth(false)
        console.error('Error from the API', err.message)
      } finally {
        setIsLoading(false)
      }
    }

    verifyToken()
  }, [token])

  return (
    <AuthContext.Provider value={{ userAuth, setUserAuth, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
