import { useContext, useEffect, useState } from "react"
import { Componente } from "../types/componente";
import { AuthUser } from "../context/authContext";
import api from "../config/config";

export default function useGetAllComponentes() {

    const { token } = useContext(AuthUser);
    // const token = localStorage.getItem("token");
    const [componente, setComponente] = useState<Componente[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function getComp() {
            setLoading(true);

            try {
                if(token) {
                    const response = await api.get("/Componentes", {headers: {
                        "Authorization": "Bearer " + token
                    }})

                    setComponente(response.data);
                    console.log(response.data);
                }
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        }

        getComp();
    }, [token])

    return {
        componente,
        loading
    }
}