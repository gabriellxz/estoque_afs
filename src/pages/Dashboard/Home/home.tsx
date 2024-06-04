import componente_img from "../../../assets/estoque.png";
// import computador_img from "../../../assets/computador_icon.png";
// import notebook_img from "../../../assets/notebook_icon.png";
// import cabos_img from "../../../assets/cabos_icon.png";
// import materiais_img from "../../../assets/materiais_icon.png";
import { AuthUser } from "../../../context/authContext";
import { useContext, useEffect, useState } from "react";
import api from "../../../config/config";
import Loading from "../../../components/Loading/loading";

type ItemType = {
    nome: string;
    estoque: number;
}

type CategoryType = {
    nome: string;
    item: ItemType[];
}

type AllComponentes = {
    id_component: number;
    nome_component: string;
    Category: CategoryType[];
}

export default function Home() {
    const { user, token } = useContext(AuthUser);
    const [allComponentes, setAllComponentes] = useState<AllComponentes[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function getAllComponentes() {
            setLoading(true);

            if (token) {
                try {
                    const response = await api.get("/components", {
                        headers: {
                            "Authorization": "Bearer " + JSON.parse(token)
                        }
                    })

                    setLoading(false);
                    console.log(response.data)
                    setAllComponentes(response.data);

                } catch (error) {
                    setLoading(false);
                    console.log(error);
                }
            }
        }

        getAllComponentes();
    }, []);

    // Função para calcular o total de estoque de um componente
    const calculateTotalStock = (categories: CategoryType[]) => {
        return categories.reduce((total, category) => {
            return total + category.item.reduce((categoryTotal, item) => {
                return categoryTotal + item.estoque;
            }, 0);
        }, 0);
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
                        loading ? <Loading /> : (
                            allComponentes.map((c: AllComponentes) => (
                                <div key={c.id_component} className="flex items-center w-full bg-white p-6 rounded-[20px] gap-5">
                                    <img src={componente_img} alt="componente_img" />
                                    <div className="flex flex-col">
                                        <span className="text-greenAFS-100 text-xl">{c.nome_component}</span>
                                        <span className="text-2xl font-semibold">
                                            {calculateTotalStock(c.Category)}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
        </>
    )
}
