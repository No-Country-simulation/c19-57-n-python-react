import { useEffect, useState } from "react"

const petDefault = {
  id: "123",
  create_at: "2022-01-01",
  name: "Sara",
  animal_type: "Dog",
  race: "Labrador Retriever",
  year: 9,
  history: "Sara es una hermosa perra adulta de 9 años, que fue rescatada junto a sus 5 hermanos y su mamá, es muy curiosa, juguetona y amorosa. Busca una familia que sepa que la cuide con mucho amor. Además, de que no tenga inconveniente con su tamaño y que siempre sea un miembro más de la familia. Se entrega esterilizada.",
  gender: "Hembra",
  size: "mediana",
  characteristics: "Loyal, playful, and intelligent",
  location: "New York",
  img: "/imagenes/details/perro.jpg",
  status: 1
}

const PetDetails = () => {
  const [pet, setPet] = useState();

  const getPet = async () => {
    const response = petDefault;
    setPet(response);
  }

  useEffect(() => {
    getPet();
  }, [])

  return (
    <div id="PetDetails">
      <div className="w-full bg-pink-default py-[30px] px-[20px] flex items-center place-content-between">
        <h1 className="text-left text-2xl font-semibold">{pet.name}</h1>
        <div className="bg-white p-[6.4px] rounded-md">
          <img src="/heart.svg" alt="" />
        </div>
      </div>
      <div className="shadow-[0px_7px_25px_-9px_#00000040] rounded-2xl">
        <div className="overflow-hidden rounded-b-2xl mb-[34px]">
          <img src={pet.img} alt="Pet image" />
        </div>
        <div className="capitalize flex w-full place-content-between px-[20px] pb-5 mb-6 text-[#516746]">
          <div>{pet.gender}</div>
          <div>Tranquila</div>
          <div>{pet.size}</div>
          <div>{pet.year} años</div>
        </div>
      </div>
      <div className="px-5 mb-[38px]">
        <h2 className="mb-3 font-medium text-[#516746]">Detalle</h2>
        <p className="mb-[38px] text-blue-darker">{pet.history}</p>
        <button className="bg-pink-default font-semibold py-2 w-full rounded-2xl">Quiero adoptar</button>
      </div>
      <h2 className="font-medium text-xl text-center mb-[44px]">Mascotas relacionadas</h2>
    </div>
  )
}
export default PetDetails
