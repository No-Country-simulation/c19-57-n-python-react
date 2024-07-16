const Hero = () => {
  return (
    <div className="w-full px-4 bg-[#F9D7BD] flex justify-center items-center rounded-b-[14px] text-[#002140]">
      <div className="h-[190px] sm:h-[250px] md:h-[420px]">
        <img className="h-full object-cover object-bottom w-auto" src="/woman.png" alt="Woman with your dog" />
      </div>
      <div className='w-1/2'>
        <h1 className='text-[26px] font-semibold pb-4 sm:text-[30px] md:text-[50px]'>Adopta</h1>
        <p className='text-[12px] sm:text-[20px] md:text-[38px]'>
          Tu calidad de vida mejora, su vida cambia.
        </p>
      </div>
    </div>
  )
}
export default Hero
