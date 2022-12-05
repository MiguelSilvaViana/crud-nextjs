import Titulo from "./Title";

interface LayoutProps {
    titulo: string;
    children: any;
}


export default function Layout (props: LayoutProps) {
    return (
        <div className="flex flex-col w-2/3 text-gray-800 bg-white rounded-md">
            <Titulo>{props.titulo}</Titulo>
            <div className="p-6">
                {props.children}
            </div>
        </div>
    )
}