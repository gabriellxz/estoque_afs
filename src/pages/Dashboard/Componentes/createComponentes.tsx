import TabelaCrud from "../../../components/TabelaCrud/TabelaCrud";
import { itemCompany } from "../../../types/itemCompany";
import EditIcon from "../../../svg/edit-icon";
import TrashIcon from "../../../svg/trash-icon";
import Loading from "../../../components/Loading/loading";
import useGetItem from "../../../hooks/useGetItem";
import { Componente } from "../../../types/componente";
import useDelete from "../../../hooks/useDelete";

export default function CreateComponentes() {

    const { componente, items, loading } = useGetItem();
    const { handleDelete } = useDelete();

    function getIdComponente(nome: string) {
        const component = componente.find((comp: Componente) => comp.nome_componente === nome);
        return component ? component.id : null;
    }

    const nomeComp = "Componentes";
    const idComponente = getIdComponente(nomeComp);

    function TabelaComponent() {

        const filteredItems = items.filter((i: itemCompany) => i.component_id === idComponente);

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
                                    <span className="w-full flex justify-center">
                                        <EditIcon />
                                    </span>
                                    <span className="w-full flex justify-center" onClick={() => handleDelete(i.id)}>
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
        <>
            <TabelaCrud componenteTable={<TabelaComponent />} idComponente={idComponente} />
        </>
    )
}