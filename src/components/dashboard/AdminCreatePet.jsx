import { Link } from 'react-router-dom'
import PetForm from '../PetForm'
import TitleComponent from '../TitleComponent'
import { IconParkSolidBack } from '../Icons'

const AdminCreatePet = () => {
  return (
    <div className='relative'>
      <TitleComponent color={true} title={'Agregar Mascota'} />
      <Link
        className='absolute top-2 left-2 w-36'
        to={'/admin/pets'}
        title='Atras'
      >
        <IconParkSolidBack />
      </Link>
      <PetForm />
    </div>
  )
}

export default AdminCreatePet
