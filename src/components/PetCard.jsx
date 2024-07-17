const PetCard = ({ nombre, sexo, edad, tamaño, caracter }) => {
  return (
    <div className="w-full rounded-[14px] overflow-hidden shadow-[0_0_25px_0_#0000001A] pb-7">
      <div className="bg-[#F9D7BD] h-[265px] w-full rounded-b-[14px]"></div>
      <div className="px-7 text-[18px]">
        <h2 className="text-center text-[18px] font-medium">{nombre}</h2>
        <p>Sexo: {sexo}</p>
        <p>Edad: {edad}</p>
        <p>Tamaño: {tamaño}</p>
        <p>Carácter: {caracter}</p>
        <button className="text-sm font-semibold text-[#002140] bg-[#FDE4D1] rounded-[14px] py-2 w-full mt-4">Adoptar</button>
      </div>
    </div>
  )
}
export default PetCard
