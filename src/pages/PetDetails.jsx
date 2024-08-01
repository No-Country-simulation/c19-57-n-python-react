import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import useToken from "../hooks/useToken";
import { ListPets } from "../components";

const IMG_FOLDER_URL = import.meta.env.VITE_IMG_FOLDER_URL
const API_URL = import.meta.env.VITE_API_URL;

const PetDetails = () => {
  const [pet, setPet] = useState();
  const { id } = useParams();
  const { token } = useToken();

  const getPet = async () => {
    const response = await fetch(`${API_URL}/pets/${id}`, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      setPet(data);
    }
  }

  useEffect(() => {
    getPet();
  }, [])

  return (
    pet && (
      <div id="PetDetails">
        <div className="w-full bg-pink-default py-[30px] px-[20px] flex items-center place-content-between">
          <h1 className="text-left text-2xl font-semibold">{pet.name}</h1>
          <div className="bg-white p-[6.4px] rounded-md">
            <img src="/heart.svg" alt="" />
          </div>
        </div>
        <div className="shadow-[0px_7px_25px_-9px_#00000040] rounded-2xl">
          <div className="overflow-hidden rounded-b-2xl mb-[34px]">
            <img src={`${IMG_FOLDER_URL}/perfil/${pet.imagen_profile}`} alt="Pet image" />
          </div>
          <div className="capitalize flex w-full place-content-between px-[20px] pb-5 mb-6 text-[#516746]">
            <div>{pet.gender}</div>
            <div>{pet.characteristics}</div>
            <div>{pet.size} cm</div>
            <div>{pet.year} años</div>
          </div>
        </div>
        <div className="px-5 mb-[38px]">
          <h2 className="mb-3 font-medium text-[#516746]">Detalle</h2>
          <p className="mb-[38px] text-blue-darker">{pet.history}</p>
          <button className="bg-pink-default font-semibold py-2 w-full rounded-2xl">Quiero adoptar</button>
        </div>
        <h2 className="font-medium text-xl text-center mb-[44px]">Mascotas relacionadas</h2>
        <ListPets />
      </div>
    )
  )
}
export default PetDetails
