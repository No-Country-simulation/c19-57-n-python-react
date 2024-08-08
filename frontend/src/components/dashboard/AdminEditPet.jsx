import { Link } from 'react-router-dom'
import TitleComponent from '../TitleComponent'
import { IconParkSolidBack } from '../Icons'
import PetEditForm from '../PetEditForm'

const AdminEditPet = () => {
  return (
    <div className='relative'>
      <TitleComponent color={true} title={'Editar Mascota'} />
      <Link
        className='absolute top-2 left-2 w-36'
        to={'/admin/pets'}
        title='Atras'
      >
        <IconParkSolidBack />
      </Link>
      <PetEditForm />
    </div>
  )
}

export default AdminEditPet
