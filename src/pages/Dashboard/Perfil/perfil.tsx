import { ChangeEvent, SyntheticEvent, useContext, useEffect, useState } from "react";
import perfil_img from "../../../assets/user_icon.png";
import Input from "../../../components/Input/input";
import { AuthUser } from "../../../context/authContext";
import { useLocation } from "react-router-dom";
import api from "../../../config/config";
import { toast, ToastContainer } from "react-toastify";
import Loading from "../../../components/Loading/loading";

export default function Perfil() {

    const location = useLocation();

    const { user, token, newUser } = useContext(AuthUser);

    const [nome, setNome] = useState<string>(user?.name || "");
    const [email, setEmail] = useState<string>(user?.email || "");
    const [senha, setSenha] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    function changeNome(e: ChangeEvent<HTMLInputElement>) {
        setNome(e.target.value);
    }

    function changeEmail(e: ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    function changeSenha(e: ChangeEvent<HTMLInputElement>) {
        setSenha(e.target.value);
    }

    useEffect(() => {
        if (user) {
            setNome(user.name);
            setEmail(user.email);
            setSenha("");
        }
    }, [user])

    async function putUser(e: SyntheticEvent) {
        e.preventDefault();

        setLoading(true);
        
        const data = {
            nome: nome,
            email: email,
            senha: senha,
            role: user?.role
        }
        
        if (
            nome !== "" &&
            email !== "" &&
            senha !== "" &&
            data.role !== undefined
        ) {
            try {
                if (token) {
                    const response = await api.put(`/users/${user?.id}`, data, {
                        headers: {
                            "Authorization": "Bearer " + token
                        }
                    })

                    console.log(response);

                    newUser(response.data);

                    toast.success(`Usuário editado com sucesso!`, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored"
                    });
                }
            } catch (error) {
                console.log(error);

                toast.error(`Não foi possível editar o usuário!`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                });
            } finally {
                setLoading(false);
            }
        } else {
            toast.error(`Preencha os campos corretamente!`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });

            setLoading(false);
        }

    }

    return (
        <div className="bg-white p-8 rounded-[25px]">
            <div className="border-b border-zinc-200 flex gap-[100px] px-3 text-greenAFS-100">
                <span className={`pb-1 w-full max-w-[100px] ${location.pathname === "/dashboard/perfil" ? "font-bold text-greenAFS-200 border-b-2 border-green-950" : ""}`}>Perfil</span>
            </div>
            <div className="flex sm:flex-row flex-col pt-[40px]">
                <div className="flex justify-center items-center px-[50px]">
                    <img src={perfil_img} alt="foto de perfil do usuário" className="sm:w-[130px]" />
                </div>
                <form className="w-full" onSubmit={putUser}>
                    <div className="w-full grid sm:grid-cols-2 gap-4 grid-cols-1">
                        <div className="flex flex-col gap-1 w-full">
                            <span>Nome</span>
                            <Input
                                className={"w-full py-2 px-3 border border-greenAFS-200 rounded-lg outline-none"}
                                name={"nome"}
                                onChangeInput={changeNome}
                                placeholder="Nome"
                                type="text"
                                value={nome}
                            />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <span>Email</span>
                            <Input
                                className={"w-full py-2 px-3 border border-greenAFS-200 rounded-lg outline-none"}
                                name={"email"}
                                onChangeInput={changeEmail}
                                placeholder="Email"
                                type="email"
                                value={email}
                            />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <span>Senha</span>
                            <Input
                                className={"w-full py-2 px-3 border border-greenAFS-200 rounded-lg outline-none"}
                                name={"senha"}
                                onChangeInput={changeSenha}
                                placeholder="Senha"
                                type="password"
                                value={senha}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-[10px]">
                        {
                            loading ? <Loading/> : <button className="sm:max-w-[200px] w-full py-2 px-3 border bg-greenAFS-200 text-white rounded-lg outline-none">Salvar</button>
                        }
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}