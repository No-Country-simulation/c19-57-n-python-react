import { Link } from 'react-router-dom'
import TitleComponent from '../../components/TitleComponent'
import mascotas from '/admin_mascotas.svg'
import solicitudes from '/admin_solicitudes.svg'

const ROUTES = [
  {
    name: 'Mascotas',
    url: '/admin/pets',
    img: mascotas,
    styles: 'bg-blue-light place-content-end overflow-hidden',
    size: 'w-full h-[114px] md:h-[135.5px] 2xl:h-[234.33px]'
  },
  {
    name: 'Solicitudes',
    url: '/admin/requests',
    img: solicitudes,
    styles: 'bg-pink-default overflow-hidden',
    size: 'w-[112px] md:w-[136.5px] 2xl:w-[236.6px] h-[146.5px] md:h-[174.5px] 2xl:h-[300.86px] -mt-5'
  }
]

const Admin = () => {
  return (
    <>
      <TitleComponent title={'Dashboard'} color={true} />
      <div className='flex flex-wrap gap-11 mt-11 mb-[75px] justify-center'>
        {ROUTES.map((item) => (
          <Link
            to={item.url}
            className='flex items-center gap-10 2xl:gap-[84px] w-[357px] md:w-[424px] 2xl:w-[734px] h-44 md:h-[214px] 2xl:h-[370px] mx-[18px] bg-white shadow-[0_7px_25px_-2px_#00000040] rounded-2xl text-center text-lg font-semibold content-center md:text-xl 2xl:text-3xl'
            key={item.url}
          >
            <div
              className={`ml-[22px] rounded-2xl w-[126px] md:w-[149.8px] 2xl:w-[259px] h-[126px] md:h-[149.8px] 2xl:h-[259px] ${item.styles} shadow-[0_6px_8.3px_-1px_#00000026]`}
            >
              <img className={` ${item.size}`} src={item.img} />
            </div>
            <span> {item.name}</span>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Admin
