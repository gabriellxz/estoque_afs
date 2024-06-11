import { ChangeEvent, SyntheticEvent, useContext, useEffect, useState } from "react";
import BackSpaceIcon from "../../../svg/backspace-icon";
import { AuthUser } from "../../../context/authContext";
import api from "../../../config/config";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import Loading from "../../Loading/loading";
// import { AxiosError, AxiosResponse } from "axios";

type ItemType = {
    nome: string;
    estoque: number;
}

type CategoryType = {
    id: number;
    component_id: number;
    nome: string;
    item: ItemType[];
}

// type AllComponentes = {
//     id_component: number;
//     nome_component: string;
//     Category: CategoryType[];
// }

type propsModal = {
    closeModal: (open: boolean) => void;
    id: number | null;
    nomeTabela: string;
}

export default function ModalCrud(props: propsModal) {

    const { token } = useContext(AuthUser);
    const [nome, setNome] = useState<string>("");
    const [estoque, setEstoque] = useState<number>();
    const [categoryId, setCategoryId] = useState<number>();
    const [catState, setCatState] = useState<CategoryType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    //LÓGICA PARA FILTRAR CATEGORIAS COM O MESMO ID DO COMPONENTE
    const [category, setCategory] = useState<CategoryType[]>([]);

    async function getCategory() {
        if (token) {
            try {
                const response = await api.get("/Category", {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(token)
                    }
                })

                console.log("id do componente: ", props.id);
                console.log("Array de categorias: ", response.data);
                setCategory(response.data);
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        getCategory();
    }, []);

    useEffect(() => {
        const idCategory = category.filter((c: CategoryType) => c.component_id === props.id);
        console.log("categorias com o mesmo id do componente: ", idCategory);
        setCatState(idCategory);
    }, [category, props.id]);

    //PEGAR VALORES DE INPUT
    const handleNome = (e: ChangeEvent<HTMLInputElement>) => { setNome(e.target.value); };
    const handleEstoque = (e: ChangeEvent<HTMLInputElement>) => {
        const estoqueN: number = parseInt(e.target.value);
        setEstoque(estoqueN);
    }
    const handleCategory = (e: ChangeEvent<HTMLInputElement>) => {
        const categoryN: number = parseInt(e.target.value);
        setCategoryId(categoryN);
    }

    //CADASTRAR NOVO
    async function postNew(e: SyntheticEvent) {
        e.preventDefault();
        setLoading(true);

        if (
            nome !== "" &&
            estoque !== undefined &&
            category !== undefined
        ) {
            const data = {
                nome,
                estoque,
                categoryId
            }

            try {
                if (token) {
                    await api.post("/Product/create", data, {
                        headers: {
                            "Authorization": "Bearer " + JSON.parse(token)
                        }
                    })

                    toast.success(`${props.nomeTabela} cadastrado com sucesso!`, {
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
                    props.closeModal(false);
                    window.location.reload();
                }
            } catch (error) {
                toast.error(`Não foi possível cadastrar um ${props.nomeTabela}`, {
                    position: "bottom-center",
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
        } else {
            toast.error('Por favor, preencha os campos corretamente.', {
                position: "bottom-center",
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
        <>
            <form className={`
            max-w-[960px] w-full fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white 
            rounded-md shadow-sm shadow-zinc-500 pt-[40px] px-[40px]
        `} onSubmit={postNew}>
                <div className="pb-5 flex flex-col gap-[30px] border-b border-zinc-400 px-5">
                    <span className="text-greenAFS-200 font-semibold text-xl">Adicionar novo</span>
                    <div className="flex flex-col sm:items-center sm:flex-row gap-8">
                        {catState.map((cat) => (
                            <div key={cat.id} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    id={`category-${cat.id}`}
                                    value={cat.id}
                                    onChange={handleCategory}
                                    name="categoryId"
                                />
                                <label htmlFor={`category-${cat.id}`}>{cat.nome}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col w-full sm:flex-row items-center px-5 gap-[20px] sm:gap-[70px] py-10 border-b border-zinc-400">
                    <div className="flex w-full items-center gap-5">
                        <span className="text-zinc-400">Nome</span>
                        <div className="flex w-full items-center py-2 px-3 border border-greenAFS-200 rounded-lg">
                            <input type="text" placeholder="Digite o novo item" className="w-full outline-none border-r border-greenAFS-200" onChange={handleNome} />
                            <span className="pl-4">
                                <BackSpaceIcon />
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <span className="text-zinc-400">Estoque</span>
                        <input type="number" className="max-w-[200px] w-full py-2 px-3 border border-greenAFS-200 rounded-lg outline-none" onChange={handleEstoque} />
                    </div>
                </div>
                <div className="flex justify-between items-center p-5">
                    <div>
                        <button onClick={() => props.closeModal(false)} className="text-red-500 text-xl">Voltar</button>
                    </div>
                    <div>
                        {loading ? <Loading /> : <button className="w-full flex justify-center font-semibold bg-greenAFS-200 items-center text-white px-9 py-1 rounded-[10px]">Salvar</button>}
                    </div>
                </div>
            </form>
        </>
    );
}
