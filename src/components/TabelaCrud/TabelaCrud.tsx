import FilterIcon from "../../svg/filter-icon";
import SearchIcon from "../../svg/svg-icon";
import TrashIcon from "../../svg/trash-icon";
import EditIcon from "../../svg/edit-icon";
import { useContext, useEffect, useState } from "react";
import ModalCrud from "./ModalCrud/modalCrud";
import { ToastContainer } from "react-toastify";
import { AuthUser } from "../../context/authContext";
import api from "../../config/config";
import useGetAllComponentes from "../../hooks/useGetAllComponentes";

type companyType = {
    categoryId: number;
    estoque: number;
    id_item: number;
    nome: string;
}

type ItemType = {
    nome: string;
    estoque: number;
}

type CategoryType = {
    nome: string;
    item: ItemType[];
}

type AllComponentes = {
    id_component: number;
    nome_component: string;
    Category: CategoryType[];
}

type tabelaProps = {
    getComponents: AllComponentes[];
    id: number | null;
    nomeTabela: string;
}

export default function TabelaCrud(props: tabelaProps) {

    const { token } = useContext(AuthUser);
    const { componentes } = useGetAllComponentes();
    const [items, setItems] = useState<companyType[]>([]);
    // const [selectedItem, setSelectedItem] = useState<companyType>();
    const [filteredItems, setFilteredItems] = useState<companyType[]>([]);
    const componenteId = props.getComponents.find((c: AllComponentes) => c.id_component === props.id);

    const [open, setOpen] = useState<boolean>(false);

    function openModal(open: boolean) {
        setOpen(open);
    }

    function closeModal(close: boolean) {
        setOpen(close);
    }

    useEffect(() => {

        async function getItems() {
            if (token) {
                try {
                    const response = await api.get("/Product", {
                        headers: {
                            "Authorization": "Bearer " + JSON.parse(token)
                        }
                    })

                    setItems(response.data.Company);
                    // console.log(response.data.Company);
                } catch (error) {
                    console.log(error);
                }
            }
        }


        getItems();
    }, []);

    useEffect(() => {
        if (componenteId) {
            const itemNames = new Set();
            componenteId.Category.forEach((cat: CategoryType) => {
                cat.item.forEach((item: ItemType) => {
                    itemNames.add(item.nome);
                });
            });

            const filtered = items.filter((item: companyType) => itemNames.has(item.nome));
            setFilteredItems(filtered);

            // console.log("filtered items: ", filtered);
        }
    }, [props.id, componentes]);

    async function deleteItem(id: number) {

        // setSelectedItem(i);

        if (token) {
            try {
                const response = await api.delete(`/Product/${id}`, {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(token)
                    }
                })

                console.log(response)
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="w-full border-[2px] border-zinc-300 bg-white rounded-[32px] p-7 mt-5">
            <div>
                <div className="w-full flex flex-col gap-2 sm:flex-row justify-between">
                    <span className="w-full flex items-center gap-6">
                        <span className="flex max-w-[350px] w-full rounded-[10px] bg-white px-4 py-1 gap-5 border-[2px] border-greenAFS-100">
                            <SearchIcon />
                            <input type="search" placeholder="Pesquisar" className="w-full placeholder:font-semibold outline-none" />
                        </span>
                        <button className="flex rounded-[10px] bg-white px-4 py-1 items-center gap-2 border-[2px] border-greenAFS-100 text-greenAFS-100 font-semibold">
                            Filtrar
                            <FilterIcon />
                        </button>
                    </span>
                    <button className="sm:max-w-[110px] w-full flex justify-center font-semibold bg-greenAFS-200 items-center text-white px-4 py-1 rounded-[10px]" onClick={() => openModal(true)}>Novo +</button>
                </div>
            </div>
            <div className="w-full mt-[80px]">
                <div className="w-full flex justify-between border-b-[2px] border-zinc-300 font-bold">
                    <span className="w-full text-center">Código</span>
                    <span className="w-full text-center">{props.nomeTabela}</span>
                    <span className="w-full text-center">Estoque</span>
                    <span className="w-full text-center">Editar</span>
                    <span className="w-full text-center">Deletar</span>
                </div>
                <div className="overflow-y-scroll h-[300px]">
                    {
                        filteredItems.map((i: companyType) => (
                            <div className="w-full flex justify-between border-b-[2px] border-zinc-300 py-5" key={i.id_item}>
                                <span className="w-full flex justify-center">nulo</span>
                                <span className="w-full flex justify-center">{i.nome}</span>
                                <span className="w-full flex justify-center">{i.estoque}</span>
                                <span className="w-full flex justify-center">
                                    <EditIcon />
                                </span>
                                <span className="w-full flex justify-center" onClick={() => deleteItem(i.id_item)}>
                                    <TrashIcon />
                                </span>
                            </div>
                        ))
                    }
                </div>
            </div>
            {
                open && <ModalCrud
                    closeModal={closeModal}
                    // getComponentes={props.getComponents}
                    id={props.id}
                    // componentId={componenteId}
                    nomeTabela={props.nomeTabela}
                />
            }
            <ToastContainer />
        </div>
    )
}