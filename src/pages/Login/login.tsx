import { ChangeEvent, JSX, SyntheticEvent, useContext, useState } from "react";
import logo_afs from '../../assets/logo_afs.png';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import Input from "../../components/Input/input.tsx";
import api from "../../config/config.tsx";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { AuthUser } from "../../context/authContext.tsx";

type status = {
    type: string;
    message: string;
    loading: boolean;
}

export default function Login(): JSX.Element {

    //VISUALIZAR SENHA
    const [showPassword, setShowPassword] = useState<boolean>(true);

    function handleShowPassword() {
        setShowPassword(!showPassword);
    }

    //LÓGICA DE LOGIN
    const navigate = useNavigate();
    const { login } = useContext(AuthUser);

    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [status, setStatus] = useState<status>({
        type: "",
        message: "",
        loading: false
    });

    const emailChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    };

    const senhaChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setSenha(e.target.value);
    };

    async function submitLogin(e: SyntheticEvent) {
        e.preventDefault();

        setStatus({ ...status, loading: true });

        const data = {
            email: email,
            senha: senha
        };

        if (email !== "" && senha !== "") {
            try {
                await api.post("/login", data, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then((response: AxiosResponse) => {
                    console.log(response);

                    setStatus({
                        type: "success",
                        message: "Login feito com sucesso!",
                        loading: false
                    });

                    const token = response.data.accessToken;
                    login(token)
                    navigate("/dashboard");

                }).catch((error: AxiosError) => {
                    console.log("erro: ", error);

                    if (error.response?.status === 401) {
                        setStatus({
                            type: "error",
                            message: "Email ou senha incorretos.",
                            loading: false
                        });
                    }

                    if (senha.length < 6) {
                        setStatus({
                            type: "error",
                            message: "Senha deve conter no mínimo 6 caracteres.",
                            loading: false
                        });
                    }
                })
            } catch (error) {
                console.log(error);
                setStatus({
                    type: "error",
                    message: "Erro",
                    loading: false
                });
            }
        } else {
            setStatus({
                type: "error",
                message: "Preencha os campos corretamente.",
                loading: false
            });
        }
    };

    return (
        <div className="sm:flex">
            <div className="hidden sm:flex max-w-[864px] w-full h-screen bg-bgLogin bg-cover bg-center"></div>
            <div className="w-full flex justify-center h-screen items-center">
                <div className="w-full lg:ml-[75px]">
                    <div className="w-full flex flex-col">
                        <img src={logo_afs} alt="logo AFS" className="max-w-[278px] m-full p-3" />
                        {status.loading ? (<span>Acessando...</span>) : (
                            status.type === "error" ? <span className="text-red-600">{status.message}</span> : ""
                        )}
                    </div>
                    <form className="w-full mt-[83px] flex flex-col gap-[60px] p-3" onSubmit={submitLogin}>
                        <div className="w-full">
                            <Input
                                className="p-2 border-b border-black"
                                placeholder="Usuário"
                                type="email"
                                value={email}
                                onChangeInput={emailChange}
                                name={"email"}
                            />
                        </div>
                        <div className="w-full">
                            <div className="max-w-[430px] flex items-center p-2 border-b border-black gap-3">
                                <Input
                                    className="border-r border-zinc-500"
                                    placeholder="Senha"
                                    type={showPassword ? 'password' : 'text'}
                                    value={senha}
                                    onChangeInput={senhaChange}
                                    name={"senha"}
                                />
                                <div className="w-[24px] cursor-pointer" onClick={handleShowPassword}>
                                    {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
                                </div>
                            </div>
                        </div>
                        <div className="w-full mt-8">
                            <button className="text-[20px] font-bold max-w-[430px] w-full text-white bg-greenAFS-200 py-2 rounded-xl">
                                Entrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}