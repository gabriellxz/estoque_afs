import { ChangeEvent, SyntheticEvent, useContext, useEffect, useState } from "react";
import { AuthUser } from "../../../context/authContext";
import api from "../../../config/config";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import Loading from "../../Loading/loading";
import { Category } from "../../../types/category";
import { itemCompany } from "../../../types/itemCompany";

type propsModal = {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
    id: number | null;
    nomeTabela: string;
    idItem: itemCompany | null;
}

export default function ModalEdit(props: propsModal) {

    const { token } = useContext(AuthUser);
    const [nome, setNome] = useState<string | undefined>(props.idItem?.nome_item);
    const [estoque, setEstoque] = useState<number | undefined>(props.idItem?.estoque);
    const [categoryValue, setCategoryValue] = useState<number>();
    const [loading, setLoading] = useState<boolean>(false);
    const [category, setCategory] = useState<Category[]>([]);
    const [loadingCat, setLoadingCat] = useState<boolean>(false);

    async function getCategory() {

        setLoadingCat(true);

        try {
            if (token) {
                const response = await api.get("/labs-item", {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })

                // console.log(response);
                setCategory(response.data);
            }
        } catch (err) {
            console.log(err)
        } finally {
            setLoadingCat(false);
        }
    }

    useEffect(() => {
        getCategory();
    }, []);



    //PEGAR VALORES DE INPUT
    const handleNome = (e: ChangeEvent<HTMLInputElement>) => { setNome(e.target.value); };
    const handleEstoque = (e: ChangeEvent<HTMLInputElement>) => {
        const estoqueN: number = parseInt(e.target.value);
        setEstoque(estoqueN);
    }
    const handleCategory = (e: ChangeEvent<HTMLInputElement>) => {
        const catN: number = parseInt(e.target.value);
        setCategoryValue(catN);
    }


    //CADASTRAR NOVO
    async function editItem(e: SyntheticEvent) {
        e.preventDefault();
        setLoading(true);

        console.log("id do item: ", props.idItem);

        if (
            nome !== "" &&
            estoque !== undefined &&
            categoryValue !== undefined
        ) {
            const data = {
                nome_item: nome,
                estoque: estoque,
                lab_id: categoryValue,
                component_id: props.id
            }
            console.log(data);

            try {
                if (token) {
                    await api.put(`/Item/${props.idItem?.id}`, data, {
                        headers: {
                            "Authorization": "Bearer " + token
                        }
                    })

                    toast.success(`Item editado com sucesso!`, {
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
                toast.error(`Não foi possível editar o item`, {
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
                console.log(error);
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
        `} onSubmit={editItem}>
                <div className="pb-5 flex flex-col gap-[30px] border-b border-zinc-400 px-5">
                    <span className="text-greenAFS-200 font-semibold text-xl">Editar item</span>
                    <div className="flex flex-col sm:items-center sm:flex-row gap-8">
                        {
                            loadingCat ? <Loading /> : (
                                category.map((cat: Category) => (
                                    <div key={cat.id} className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            id={`category-${cat.id}`}
                                            value={cat.id}
                                            onChange={handleCategory}
                                            name="lab_id"
                                        />
                                        <label htmlFor={`category-${cat.id}`}>{cat.nome_lab}</label>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </div>
                <div className="flex flex-col w-full sm:flex-row items-center px-5 gap-[20px] sm:gap-[70px] py-10 border-b border-zinc-400">
                    <div className="flex w-full items-center gap-5">
                        <span className="text-zinc-400">Nome</span>
                        <div className="flex w-full items-center py-2 px-3 border border-greenAFS-200 rounded-lg">
                            <input value={nome} type="text" placeholder="Digite o novo item" className="w-full outline-none border-r border-greenAFS-200" onChange={handleNome} />
                        </div>
                    </div>
                    <div className="flex w-full items-center gap-5">
                        <span className="text-zinc-400">Estoque</span>
                        <input value={estoque} type="number" className="sm:max-w-[200px] w-full py-2 px-3 border border-greenAFS-200 rounded-lg outline-none" onChange={handleEstoque} />
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
