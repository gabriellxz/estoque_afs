import FilterIcon from "../../svg/filter-icon";
import SearchIcon from "../../svg/svg-icon";
import { useState } from "react";
import ModalCrud from "./ModalCrud/modalCrud";
import { ToastContainer } from "react-toastify";
import ModalEdit from "./ModalEdit/modalEdit";

type PropsTabelaCrud = {
    componenteTable: any;
    idComponente: number | null;
    item: number | null;
    openModalEdit: boolean;
    closeModalEdit: (close: boolean) => void;
}

export default function TabelaCrud(props: PropsTabelaCrud) {

    // const { token } = useContext(AuthUser);
    const [openModalState, setOpenModalState] = useState<boolean>(false);

    function openModal(open: boolean) {
        setOpenModalState(open);
    }

    function closeModal(close: boolean) {
        setOpenModalState(close);
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
                        <span>
                            {/* {loading ? <Loading /> : ""} */}
                        </span>
                    </span>
                    <button className="sm:max-w-[110px] w-full flex justify-center font-semibold bg-greenAFS-200 items-center text-white px-4 py-1 rounded-[10px]" onClick={() => openModal(true)}>Novo +</button>
                </div>
            </div>
            <div className="w-full mt-[80px]">
                <div className="w-full flex justify-between border-b-[2px] border-zinc-300 font-bold">
                    <span className="w-full text-center">Código</span>
                    <span className="w-full text-center">Tabela</span>
                    <span className="w-full text-center">Estoque</span>
                    <span className="w-full text-center">Editar</span>
                    <span className="w-full text-center">Deletar</span>
                </div>
                <div className="overflow-y-scroll h-[300px]">

                    {props.componenteTable}

                </div>
            </div>
            {
                openModalState && <ModalCrud
                    closeModal={closeModal}
                    // getComponentes={props.getComponents}
                    id={props.idComponente}
                    // componentId={componenteId}
                    nomeTabela={"Tabela"}
                />
            }
            {
                props.openModalEdit && <ModalEdit
                    closeModal={() => props.closeModalEdit}
                    id={props.idComponente}
                    nomeTabela={""}
                    idItem={props.item}
                />
            }
            <ToastContainer />
        </div>
    )
}