import TabelaCrud from "../../../components/TabelaCrud/TabelaCrud";
import useGetAllComponentes from "../../../hooks/useGetAllComponentes";

export default function CreateComponentes() {

    const { componentes } = useGetAllComponentes();

    return (
        <TabelaCrud getComponents={componentes} id={3} nomeTabela={"Componente"} />
    )
}