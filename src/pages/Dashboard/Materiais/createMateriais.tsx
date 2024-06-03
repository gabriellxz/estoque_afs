import TabelaCrud from "../../../components/TabelaCrud/TabelaCrud";
import useGetAllComponentes from "../../../hooks/useGetAllComponentes";

export default function CreateMateriais() {

    const { componentes } = useGetAllComponentes();

    return (
        <TabelaCrud getComponents={componentes} id={5} nomeTabela={"Materiais"} />
    )
}