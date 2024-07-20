const PetCard = ({ nombre, sexo, edad, tamaño, caracter }) => {
  return (
    <div className="rounded-[14px] overflow-hidden shadow-[0_0_25px_0_#0000001A] pb-[37px] flex flex-col w-full max-w-[357px] md:w-[202px] lg:w-[281px] mx-auto">
      <div className="bg-[#F9D7BD] h-[265px] w-full rounded-b-[14px]"></div>
      <div className="px-7 text-[18px] text-[#002140] md:flex md:flex-col flex-grow justify-between">
        <div>
          <h2 className="text-center text-[18px] font-medium mt-[15px] mb-3">{nombre}</h2>
          <p className="md:text-[14px]">Sexo: {sexo}</p>
          <p className="md:text-[14px]">Edad: {edad}</p>
          <p className="md:text-[14px]">Tamaño: {tamaño}</p>
          <p className="md:text-[14px]">Carácter: {caracter}</p>
        </div>
        <button className="text-[20px] font-semibold bg-[#FDE4D1] rounded-[14px] py-2 w-full mt-[15px]">Adoptar</button>
      </div>
    </div>
  )
}
export default PetCard
