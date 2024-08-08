import TitleComponent from '../components/TitleComponent'

const About = () => {
  return (
    <div>
      <TitleComponent title={'Sobre Nosotros'} />
      <div className='text-blue-darker px-5 mt-5'>
        <h3 className='text-xl text-center font-semibold mb-2'>
          Misión y Objetivos
        </h3>
        <p className='text-base'>
          Nuestra misión es conectar a las personas con mascotas que necesitan
          un hogar, facilitando el proceso de adopción a través de una
          plataforma digital accesible y fácil de usar. Nuestro principal
          objetivo es crear un espacio donde los futuros dueños puedan encontrar
          a su compañero ideal de manera rápida y segura, mientras promovemos la
          adopción responsable y el bienestar animal.
        </p>
        <h3 className='text-xl text-center font-semibold mt-5'>Nosotros</h3>
        <ul className='text-base flex flex-col gap-2 mt-2'>
          <li>
            <strong>Cohorte</strong>c19-57-n-python-react
          </li>
          <li>
            <strong>UX/UI Designer:</strong> Laura Rus
          </li>
          <li>
            <strong>Frontend:</strong> Lazaro Vega Sanchez, Roy Huaman Avila y
            Nicolas Espinoza
          </li>
          <li>
            <strong>Backend:</strong> Esteban Casallas, Matias Ezequiel Alvarez
            y Pablo Inaipil
          </li>
        </ul>
      </div>
    </div>
  )
}
export default About
