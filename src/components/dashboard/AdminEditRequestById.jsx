import TitleComponent from '../TitleComponent'
import PetEditRequestForm from '../PetEditRequestForm'
import { Link } from 'react-router-dom'
import { IconParkSolidBack } from '../Icons'

const AdminEditRequestById = () => {
  return (
    <div className='relative'>
      <TitleComponent title={'Editar Formulario'} />
      <Link
        className='absolute top-2 left-2 w-36'
        to={'/admin/requests'}
        title='Atras'
      >
        <IconParkSolidBack />
      </Link>
      <PetEditRequestForm />
    </div>
  )
}

export default AdminEditRequestById
