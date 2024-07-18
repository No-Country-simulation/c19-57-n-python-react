const PetCard = ({ nombre, sexo, edad, tamaño, caracter }) => {
  return (
    <div className="w-full rounded-[14px] overflow-hidden shadow-[0_0_25px_0_#0000001A] pb-[37px]">
      <div className="bg-[#F9D7BD] h-[265px] w-full rounded-b-[14px]"></div>
      <div className="px-7 text-[18px] text-[#002140]">
        <h2 className="text-center text-[18px] font-medium mt-[15px] mb-3">{nombre}</h2>
        <p>Sexo: {sexo}</p>
        <p>Edad: {edad}</p>
        <p>Tamaño: {tamaño}</p>
        <p>Carácter: {caracter}</p>
        <button className="text-[20px] font-semibold bg-[#FDE4D1] rounded-[14px] py-2 w-full mt-[15px]">Adoptar</button>
      </div>
    </div>
  )
}
export default PetCard
