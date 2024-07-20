import { useContext, useEffect, useState } from "react";
import { AuthUser } from "../context/authContext";
import useGetAllComponentes from "../hooks/useGetAllComponentes";
import { itemCompany } from "../types/itemCompany";
import api from "../config/config";

export default function useGetItem() {

    const { token } = useContext(AuthUser);
    const { componente } = useGetAllComponentes();
    const [items, setItems] = useState<itemCompany[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function getItems() {

            setLoading(true);

            try {
                if (token) {
                    const response = await api.get("/Item", {
                        headers: {
                            "Authorization": "Bearer " + token
                        }
                    })

                    // console.log(response);
                    setItems(response.data.Company);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        getItems();
    }, [token])

    return {
        componente,
        items,
        loading
    }
}