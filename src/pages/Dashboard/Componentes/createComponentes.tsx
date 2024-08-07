import TabelaCrud from "../../../components/TabelaCrud/TabelaCrud";
import { itemCompany } from "../../../types/itemCompany";
import EditIcon from "../../../svg/edit-icon";
import TrashIcon from "../../../svg/trash-icon";
import Loading from "../../../components/Loading/loading";
import useGetItem from "../../../hooks/useGetItem";
import { Componente } from "../../../types/componente";
import useDelete from "../../../hooks/useDelete";
import { useEffect, useState } from "react";

export default function CreateComponentes() {

    const { componente, items, loading } = useGetItem();
    const { handleDelete, loadingDelete } = useDelete();
    const [selectedItem, setSelectedItem] = useState<itemCompany | null>(null);
    const [openModalEditState, setModalEditState] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");

    function getSelectedItem(itemId: itemCompany | undefined) {
        setSelectedItem(itemId ?? null);
        setModalEditState(true);
        // console.log(selectedItem);
    }

    useEffect(() => {
        if (selectedItem !== null) {
            console.log(selectedItem);
        }
    }, [selectedItem]);

    function getIdComponente(nome: string) {
        const component = componente.find((comp: Componente) => comp.nome_componente === nome);
        return component ? component.id : null;
    }

    const nomeComp = "Componentes";
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
                                    <span className="w-full flex justify-center" onClick={() => getSelectedItem(i)}>
                                        <EditIcon />
                                    </span>
                                    <span className="w-full flex justify-center" onClick={() => handleDelete(i.id)}>
                                        {
                                            loadingDelete ? <Loading /> : <TrashIcon />
                                        }
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
        <>
            <TabelaCrud
                componenteTable={<TabelaComponent />}
                idComponente={idComponente}
                item={selectedItem}
                openModalEdit={openModalEditState}
                closeModalEdit={setModalEditState}
                onSearch={handleSearch}
            />
        </>
    )
}