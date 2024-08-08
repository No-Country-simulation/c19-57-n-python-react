const Hero = () => {
  return (
    <div className='w-full px-4 bg-pink-default flex justify-center items-center rounded-b-2xl text-blue-darker'>
      <div className='h-[190px] sm:h-[250px] md:h-[250]'>
        <img
          className='h-full object-cover object-bottom w-auto'
          src='/woman.png'
          alt='Woman with your dog'
        />
      </div>
      <div className='w-1/2'>
        <h1 className='text-2xl font-semibold pb-4 sm:text-3xl md:text-[30px]'>
          Adoptá.
        </h1>
        <p className='text-[12px] sm:text-xl md:text-[20px] font-medium md:pr-[70px]'>
          Tu calidad de vida mejora, su vida cambia.
        </p>
      </div>
    </div>
  )
}
export default Hero
