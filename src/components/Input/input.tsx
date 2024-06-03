import {ChangeEvent, JSX} from "react";

interface Input {
    type: string;
    placeholder: string;
    className: string;
    value: any;
    onChangeInput: (e:ChangeEvent<HTMLInputElement>) => void;
    name: string;
}

export default function Input(props:Input): JSX.Element {
    return (
        <>
            <input name={props.name} value={props.value} onChange={props.onChangeInput} type={props.type} placeholder={props.placeholder} className={`
                max-w-[430px] w-full ${props.className}
                outline-none
            `}/>
        </>
    )
}