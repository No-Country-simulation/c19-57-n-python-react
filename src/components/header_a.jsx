import { useState } from 'react'
import logo from '/logo.svg'
import burger from '/Burger.svg'
import { Link } from 'react-router-dom'

const ROUTES = [
  {
    name: 'Inicio',
    url: '/'
  },
  {
    name: 'Adopción perros',
    url: '/dogs'
  },
  {
    name: 'Adopción gatos',
    url: '/cats'
  },
  {
    name: 'Iniciar sesión',
    url: '/login'
  }
]

const StickyNavbar = () => {
  const [isNavVisible, setNavVisible] = useState(false)

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
        className={`w-full z-10 absolute top-0 right-0 bottom-0 bg-pink-default text-black p-8 shadow-md transition-all duration-300 ease-in-out ${
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
          {ROUTES.map((item) => (
            <li key={item.name}>
              <Link
                to={item.url}
                onClick={toggleNav}
                className='text-xl md:font-medium font-semibold text-black no-underline'
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default StickyNavbar
