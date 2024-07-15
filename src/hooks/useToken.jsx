import { useState } from 'react'

export default function useToken() {
  const getToken = () => {
    const userToken = localStorage.getItem('token')
    return userToken
  }

  const [token, setToken] = useState(getToken())

  const saveToken = (userToken) => {
    localStorage.setItem('token', userToken)
    setToken(userToken.token)
  }

  const removeToken = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  return {
    setToken: saveToken,
    token,
    deleteToken: removeToken
  }
}
