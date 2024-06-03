import { ReactNode, useContext } from "react";
import { AuthUser } from "../context/authContext";
import { Navigate } from "react-router-dom";

type typeChildren = {
    children: ReactNode;
}

export default function Authenticated({ children }: typeChildren) {
    const { token } = useContext(AuthUser);

    if(!token) {
        return <Navigate to={"/"}/>
    }

    return children;
}