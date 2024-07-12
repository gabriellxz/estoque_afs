import componente_img from "../../../assets/estoque.png";
// import computador_img from "../../../assets/computador_icon.png";
// import notebook_img from "../../../assets/notebook_icon.png";
// import cabos_img from "../../../assets/cabos_icon.png";
// import materiais_img from "../../../assets/materiais_icon.png";
import { AuthUser } from "../../../context/authContext";
import { useContext, useEffect, useState } from "react";
import api from "../../../config/config";
import Loading from "../../../components/Loading/loading";
import { Componente } from "../../../types/componente";
import { Items } from "../../../types/items";

export default function Home() {
    const { user, token } = useContext(AuthUser);
    const [componente, setComponente] = useState<Componente[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function getComponentes() {

            setLoading(true);

            try {
                if (token) {
                    const response = await api.get("/Componentes", {
                        headers: {
                            "Authorization": "Bearer " + token
                        }
                    })

                    console.log(response);
                    setComponente(response.data);
                } else {
                    console.log("Sua sessão expirou...");
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        getComponentes();
    }, [])

    function calcularTotalItem(items: Items[]): number {
        return items.reduce((total, item) => total + item.estoque, 0);
    }

    return (
        <>
            <div className="flex flex-col gap-5">
                <span className="font-semibold text-2xl">Bem-Vindo, {user?.name}</span>
                <span className="text-zinc-400 text-xl">Overview</span>
            </div>
            <div className="mt-[35px]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {
                        loading ? <Loading /> : componente.map((comp: Componente) => (
                            <div key={comp.id} className="flex items-center w-full bg-white p-6 rounded-[20px] gap-5">
                                <img src={componente_img} alt="componente_img" />
                                <div className="flex flex-col">
                                    <span className="text-greenAFS-100 text-xl">{comp.nome_componente}</span>
                                    <span className="text-2xl font-semibold">
                                        {calcularTotalItem(comp.Items)}
                                    </span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}
