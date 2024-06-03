import { useContext, useState } from "react";
import logo_afs from "../../assets/afs-logo-aside.png";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { AuthUser } from "../../context/authContext";

const SquareGroup = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
        </svg>
    );
};

const Box = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
        </svg>
    );
};

const Logout = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
        </svg>
    );
};



export default function Aside() {

    // const location = useLocation()
    const { logout } = useContext(AuthUser);
    const [openEstoque, setOpenEstoque] = useState<boolean>(false);

    return (
        <nav className="flex flex-col items-center bg-greenAFS-200 max-w-[150px] sm:max-w-[200px] w-full h-screen py-5 select-none">
            <div>
                <img src={logo_afs} alt="logo_afs" />
            </div>
            <ul className="flex flex-col h-full justify-between mt-[50px]">
                <div className="flex flex-col gap-[50px]">
                    <Link to={"/dashboard/início"} className={"flex items-center text-white text-xl gap-3 cursor-pointer"}>
                        <SquareGroup />
                        <span>Início</span>
                    </Link>
                    <li className="flex flex-col text-white text-xl gap-5 cursor-pointer" onClick={() => setOpenEstoque(!openEstoque)}>
                        <div className="flex gap-3 items-center">
                            <Box />
                            <span>Estoque</span>
                        </div>
                        <AnimatePresence>
                            {openEstoque &&
                                <motion.ul className="flex flex-col gap-8 text-base list-disc"
                                    initial={{
                                        opacity: 0,
                                        translateY: -50
                                    }}

                                    transition={{
                                        duration: 0.3
                                    }}

                                    animate={{
                                        opacity: 1,
                                        translateY: 0
                                    }}

                                    exit={{
                                        opacity: 0,
                                        translateY: -50
                                    }}
                                >
                                    <li>
                                        <Link to={"/dashboard/criar-componente"}>Componentes</Link>
                                    </li>
                                    <li>
                                        <Link to={"/dashboard/criar-computador"}>Computador</Link>
                                    </li>
                                    <li>Notebook</li>
                                    <li>Materiais</li>
                                    <li>Cabos</li>
                                </motion.ul>
                            }
                        </AnimatePresence>
                    </li>
                </div>
                <div onClick={logout}>
                    <li className="flex items-center text-red-600 text-xl gap-3 cursor-pointer">
                        <Logout />
                        <span>Sair</span>
                    </li>
                </div>
            </ul>
        </nav>
    )
}