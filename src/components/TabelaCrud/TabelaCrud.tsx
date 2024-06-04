import FilterIcon from "../../svg/filter-icon";
import SearchIcon from "../../svg/svg-icon";
import TrashIcon from "../../svg/trash-icon";
import EditIcon from "../../svg/edit-icon";
import { useState } from "react";
import ModalCrud from "./ModalCrud/modalCrud";
import { ToastContainer } from "react-toastify";

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

    const componenteId = props.getComponents.find((c: AllComponentes) => c.id_component === props.id);
    // const itemArray = props.getComponents.filter((c:AllComponentes) => {
    //     c.Category.filter((c:CategoryType) => {
    //         c.item
    //     })
    // })

    const [open, setOpen] = useState<boolean>(false);

    function openModal(open: boolean) {
        setOpen(open);
    }

    function closeModal(close: boolean) {
        setOpen(close);
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
                        componenteId?.Category.map((c: CategoryType) => (
                            c.item?.map((i: ItemType) => (
                                <div className="w-full flex justify-between border-b-[2px] border-zinc-300 py-5">
                                    <span className="w-full flex justify-center">nulo</span>
                                    <span className="w-full flex justify-center">{i.nome}</span>
                                    <span className="w-full flex justify-center">{i.estoque}</span>
                                    <span className="w-full flex justify-center">
                                        <EditIcon />
                                    </span>
                                    <span className="w-full flex justify-center">
                                        <TrashIcon />
                                    </span>
                                </div>
                            ))
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
            <ToastContainer/>
        </div>
    )
}