import { useState } from "react";
import Client from "../core/Client";
import Button from "./Button";
import Input from "./Input";


interface FormProps {
    client?: Client
    cancel?: () => void
    clientChanged?: (client: Client) => void
}

export default function Form(props: FormProps) {

    console.log(props.client)

    const id = props.client?.id
    const [name, setName] = useState(props.client?.name ?? '') // nao é obrigatorio nome por isso esse ? primeiro e os dois ?? finais sao para colocar um valor padrão
    const [age, setAge] = useState(props.client?.age ?? 0)

    return(
        <div>
            {id ? <Input text="Code" value={id} readOnly className="mb-4"/> : false}
            <Input text="Name" value={name} onChange={setName} className="mb-4"/>
            <Input text="Age" value={age} type="number" onChange={setAge}/>
            <div className="flex justify-end mt-3">
                
                <Button color="sky" className="mr-2"
                    onClick={() => props.clientChanged?.(new Client(name, +age, id))}>
                    {id ? "Change" : "Save"}
                </Button>
                
                <Button onClick={props.cancel}>
                    Cancel
                </Button>
            </div>
        </div>
    )
}