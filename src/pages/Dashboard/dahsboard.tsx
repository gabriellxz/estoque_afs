import { Outlet } from "react-router-dom";
import Aside from "../../components/Aside/aside";
import Header from "../../components/Header/header";
import { useState } from "react";


export default function Dashboard() {

    const [openAside, setOpenAside] = useState<boolean>(false);

    function open() {
        setOpenAside(!openAside);
        // console.log(openAside);
    }

    return (
        <div className="flex h-screen overflow-hidden">
            {/* {authenticated === true ? <h1>Bem vindo, {user?.name}!</h1> : <h1>Você não tem acesso.</h1>} */}
            <Aside stateAside={openAside}/>
            <div className="w-full">
                <Header toggleAside={open}/>
                <div className="p-[10px] sm:p-[40px] bg-slate-100 h-customHeight overflow-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}