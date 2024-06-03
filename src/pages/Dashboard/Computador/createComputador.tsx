import TabelaCrud from "../../../components/TabelaCrud/TabelaCrud";
import useGetAllComponentes from "../../../hooks/useGetAllComponentes";

export default function CreateComputador() {

    const { componentes } = useGetAllComponentes();

    return (
        <TabelaCrud getComponents={componentes} id={1} nomeTabela={"Computador"} />
    )
}