const PetCard = ({ nombre, sexo, edad, tamaño, caracter }) => {
  return (
    <div className="w-[107px] rounded-[14px] overflow-hidden">
      <div className="bg-red-200 h-[120px] w-full"></div>
      <div className="px-2 text-[8px]">
        <h2 className="text-center text-[12px] font-medium">{nombre}</h2>
        <p>Sexo: {sexo}</p>
        <p>Edad: {edad}</p>
        <p>Tamaño: {tamaño}</p>
        <p>Carácter: {caracter}</p>
        <button>Adoptar</button>
      </div>
    </div>
  )
}
export default PetCard
