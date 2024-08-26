import { useEffect, useState } from 'react'
import logo from '/logo.svg'
import burger from '/Burger.svg'
import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'
import { useAuth } from '../context/AuthContext'
import useToken from '../hooks/useToken'

const ROUTES = [
  {
    name: 'Consultar Solicitud',
    url: '/search/adoptionForm'
  },
  {
    name: 'Sobre Nosotros',
    url: '/about'
  },
  {
    name: 'Iniciar sesión',
    url: '/login'
  }
]

const PROTECTED_ROUTES = [
  {
    name: 'Consultar Solicitud',
    url: '/search/adoptionForm'
  },
  {
    name: 'Sobre Nosotros',
    url: '/about'
  },
  {
    name: 'Dashboard',
    url: '/admin'
  },
  {
    name: 'Cerrar Sesion',
    url: ''
  }
]

const StickyNavbar = () => {
  const [isNavVisible, setNavVisible] = useState(false)
  const { userAuth } = useAuth()
  const { deleteToken } = useToken()
  const [currentRoutes, setCurrentRoutes] = useState(ROUTES)

  useEffect(() => {
    if (userAuth) {
      setCurrentRoutes(PROTECTED_ROUTES)
    } else {
      deleteToken()
      setCurrentRoutes(ROUTES)
    }
  }, [userAuth])

  const toggleNav = () => {
    setNavVisible(!isNavVisible)
  }

  return (
    <header className='flex items-center justify-between py-4 px-8'>
      <Link to={'/'}>
        <img className='md:w-[105px] md:h-[49px]' src={logo} alt='Logo' />
      </Link>
      <button
        className='md:hidden text-xl text-gray-800 bg-transparent border-0 cursor-pointer'
        onClick={toggleNav}
      >
        <img className='max-w-20' src={burger} alt='menu icon' />
      </button>
      <nav
        className={`w-full z-10 fixed top-0 right-0 bottom-0 bg-pink-default text-black p-8 shadow-md transition-all duration-300 ease-in-out ${
          isNavVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
        } md:static md:flex md:items-center md:gap-4 md:p-0 md:bg-transparent md:shadow-none md:opacity-100 md:visible`}
        id='nav'
      >
        <button
          className='absolute right-9 font-semibold bg-transparent border-0 cursor-pointer md:hidden'
          onClick={toggleNav}
        >
          <span className='w-20 text-3xl'>X</span>
        </button>
        <ul className='w-full h-full items-center md:justify-end justify-center list-none flex flex-col lg:gap-8 gap-[60px] md:flex-row md:items-center md:gap-4'>
          {currentRoutes.map((item) => (
            <li key={item.name}>
              {item.url === '' ? (
                <LogoutButton />
              ) : (
                <Link
                  to={item.url}
                  onClick={toggleNav}
                  className='flex w-full text-center text-xl md:font-medium font-semibold text-black no-underline'
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default StickyNavbar
