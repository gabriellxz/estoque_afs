import { useState } from "react";
import Loading from "../../../components/Loading/loading";
import TabelaCrud from "../../../components/TabelaCrud/TabelaCrud";
import useDelete from "../../../hooks/useDelete";
import useGetItem from "../../../hooks/useGetItem";
import EditIcon from "../../../svg/edit-icon";
import TrashIcon from "../../../svg/trash-icon";
import { Componente } from "../../../types/componente";
import { itemCompany } from "../../../types/itemCompany";

export default function CreateNotebook() {

    const { handleDelete } = useDelete();
    const { componente, items, loading } = useGetItem();
    const [openModalEditState, setModalEditState] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");

    function getIdComponente(nome: string) {
        const component = componente.find((comp: Componente) => comp.nome_componente === nome);
        return component ? component.id : null;
    }

    function getSelectedItem(itemId: number | undefined) {
        setSelectedItem(itemId ?? null);
        setModalEditState(true);
        // console.log(selectedItem);
    }

    const nomeComp = "Notbook";
    const idComponente = getIdComponente(nomeComp);

    function handleSearch(searchTerm: string) {
        setSearchTerm(searchTerm);
    }

    function TabelaComponent() {
        const filteredItems = items
            .filter((i: itemCompany) => i.component_id === idComponente)
            .filter((i: itemCompany) =>
                i.nome_item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                i.id.toString().includes(searchTerm)
            );

        return (
            <div>
                {
                    loading ? <Loading /> : (
                        filteredItems.length > 0 ? (
                            filteredItems.map((i: itemCompany) => (
                                <div key={i.id} className="w-full flex justify-between border-b-[2px] border-zinc-300 py-5">
                                    <span className="w-full flex justify-center">{i.id}</span>
                                    <span className="w-full flex justify-center">{i.nome_item}</span>
                                    <span className="w-full flex justify-center">{i.estoque}</span>
                                    <span className="w-full flex justify-center" onClick={() => getSelectedItem(i.id)}>
                                        <EditIcon />
                                    </span>
                                    <span className="w-full flex justify-center" onClick={() => handleDelete}>
                                        <TrashIcon />
                                    </span>
                                </div>
                            ))
                        ) : <span>Não existem {nomeComp} cadastrados...</span>
                    )
                }
            </div>
        )
    }

    return (
        <TabelaCrud
            componenteTable={<TabelaComponent />}
            idComponente={idComponente}
            onSearch={handleSearch}
            closeModalEdit={setModalEditState}
            item={selectedItem}
            openModalEdit={openModalEditState}
        />
    )
}