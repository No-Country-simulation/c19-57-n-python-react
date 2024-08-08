import { useState, useEffect } from 'react'
import StickyNavbar from './components/header_a' // Ajusta la ruta según la ubicación correcta de tu archivo header.jsx
import { Loading } from './components/loading' // Asegúrate de que la ruta sea correcta
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { FooterWithSitemap } from './components/footer'

const App = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simula un proceso de carga (por ejemplo, una llamada a una API)
    setTimeout(() => {
      setLoading(false)
    }, 3000) // Cambia el tiempo según tus necesidades
  }, [])

  if (loading) {
    return <Loading /> // Asegúrate de usar el componente Loading con la letra mayúscula
  }

  return (
    <div>
      <StickyNavbar />
      <Outlet />
      <FooterWithSitemap />
      <ScrollRestoration />
    </div>
  )
}

export default App
