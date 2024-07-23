import { useContext, useState } from "react";
import { AuthUser } from "../context/authContext";
import api from "../config/config";

export default function useDelete() {

    const { token } = useContext(AuthUser);
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

    async function handleDelete(id_item: number) {
        setLoadingDelete(true);

        try {
            if (token) {
                const response = await api.delete(`/Item/${id_item}`, {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                });

                console.log(response);
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoadingDelete(false);
        }
    }

    return {
        handleDelete,
        loadingDelete
    }
}