import { useContext } from "react";
import { AuthUser } from "../context/authContext";
import api from "../config/config";

export default function useDelete() {

    const { token } = useContext(AuthUser);

    async function handleDelete(id_item: number) {
        try {
            if (token) {
                const response = await api.delete(`/Item/${id_item}`, {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(token)
                    }
                });

                console.log(response);
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
        }
    }

    return {
        handleDelete
    }
}