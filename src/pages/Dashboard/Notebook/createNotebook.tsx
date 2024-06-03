import TabelaCrud from "../../../components/TabelaCrud/TabelaCrud";
import useGetAllComponentes from "../../../hooks/useGetAllComponentes";

export default function CreateNotebook() {

    const {componentes} = useGetAllComponentes();

    return (
        <TabelaCrud getComponents={componentes} id={2} nomeTabela={"Notebook"}/>
    )
}