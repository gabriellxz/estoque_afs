import { useContext, useEffect, useState } from "react";
import { AuthUser } from "../context/authContext";
import api from "../config/config";

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

export default function useGetAllComponentes() {

    const { token } = useContext(AuthUser);
    const [componentes, setComponentes] = useState<AllComponentes[]>([]);

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
                    setComponentes(response.data);
                } catch (error) {
                    console.log(error);
                }
            }
        }

        getComponents();
    }, [])

    return {
        componentes
    }
}