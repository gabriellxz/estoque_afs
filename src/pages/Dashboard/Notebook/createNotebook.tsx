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

    function getIdComponente(nome: string) {
        const component = componente.find((comp: Componente) => comp.nome_componente === nome);
        return component ? component.id : null;
    }

    const nomeComp = "Notbook";
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
        <TabelaCrud componenteTable={<TabelaComponent />} idComponente={idComponente} />
    )
}