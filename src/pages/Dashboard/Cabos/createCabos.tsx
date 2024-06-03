import TabelaCrud from "../../../components/TabelaCrud/TabelaCrud";
import useGetAllComponentes from "../../../hooks/useGetAllComponentes";

export default function CreateCabos() {

    const { componentes } = useGetAllComponentes();

    return (
        <TabelaCrud getComponents={componentes} id={4} nomeTabela={"Cabos"} />
    )
}