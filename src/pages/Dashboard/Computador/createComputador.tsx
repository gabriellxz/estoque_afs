import TabelaCrud from "../../../components/TabelaCrud/TabelaCrud";
import useGetAllComponentes from "../../../hooks/useGetAllComponentes";

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

export default function CreateComputador() {

    const { componentes } = useGetAllComponentes();

    function getIdComponentByName(nome: string) {
        const component = componentes.find((comp: AllComponentes) => comp.nome_component === nome);
        return component ? component.id_component : null;
    }

    const nomeTabela = "Computador";
    const idComponent = getIdComponentByName(nomeTabela);

    return (
        <TabelaCrud getComponents={componentes} id={idComponent} nomeTabela={"Computador"} />
    )
}