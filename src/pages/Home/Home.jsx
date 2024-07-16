import './Home.css'

const Home = () => {
  return (
    <div id="home">
      <div className="hero-container">
        <div className="hero__img">
          <img src="/woman.png" alt="Woman with your dog" />
        </div>
        <div className='hero__presentation'>
          <h1 className='hero__title'>Adopta</h1>
          <p className='hero__paragraph'>
            Tu calidad de vida mejora, su vida cambia.
          </p>
        </div>
      </div>
    </div>
  )
}
export default Home
