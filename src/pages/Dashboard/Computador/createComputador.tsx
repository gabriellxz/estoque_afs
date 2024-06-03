import { useContext, useEffect, useState } from "react";
import TabelaCrud from "../../../components/TabelaCrud/TabelaCrud";
import { AuthUser } from "../../../context/authContext";
import api from "../../../config/config";

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

export default function CreateComputador() {

    const { token } = useContext(AuthUser);
    const [computador, setComputador] = useState<AllComponentes[]>([]);

    useEffect(() => {
        async function getComponents() {
            if (token) {
                try {
                    const response = await api.get("/components", {
                        headers: {
                            "Authorization": "Bearer " + JSON.parse(token)
                        }
                    })

                    console.log(response);
                    setComputador(response.data);
                } catch (error) {
                    console.log(error);
                }
            }
        }

        getComponents();
    }, [])

    return (
        <TabelaCrud getComponents={computador} id={1}/>
    )
}