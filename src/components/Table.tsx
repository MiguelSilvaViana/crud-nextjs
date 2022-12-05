import Client from '../core/Client'
import { IconEdit, IconTrash } from './Icons'

interface TableProps {
    clients: Client[],
    selectedClient?: (client: Client) => void,
    deletedClient?: (client: Client) => void,
}


export default function Table(props: TableProps) {

    const showActions = props.deletedClient || props.selectedClient

    function renderHeader() {
        return (
            <tr>
                <th className="p-4 text-left">Code</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Age</th>
                {showActions ? <th className="p-4">Actions</th> : false}
            </tr>
        )
    }

    function renderData() {
        // the ? only continue if the array is not empty
        return props.clients?.map((client, id) => {
            return (
                <tr key={client.id} className={`${id % 2 === 0 ? 'bg-sky-200' : 'bg-sky-100'}`}>
                
                    <td className="p-4 text-left">{client.id}</td>
                    <td className="p-4 text-left">{client.name}</td>
                    <td className="p-4 text-left">{client.age}</td>
                    {showActions ? renderActions(client) : false} 
                    {/* isso para editar o cliente certo ou excluir vai ficar do lado*/}
                </tr>
            )
        })
    }

    
    function renderActions(client: Client) {
        return (
                
            <td className="flex justify-center">
                {props.selectedClient ? 
                    <button onClick={() => props.selectedClient?.(client)} 
                    className={`flex justify-start items-center text-green-400 rounded-full hover:bg-sky-50 p-2 m-1`}>{IconEdit}</button> : false }

                {props.deletedClient ?
                 <button onClick={() => props.deletedClient?.(client)} 
                 className={`flex justify-start items-center text-red-500 rounded-full hover:bg-sky-50 p-2 m-1`}>{IconTrash}</button>
                 : false}
            </td>
        )
    }

    return (
        <table className="w-full overflow-hidden rounded-xl">
            <thead className="text-gray-100 bg-gradient-to-r from-sky-500 to-sky-800">
                {renderHeader()}
            </thead>
            <tbody>
                {renderData()}
            </tbody>
        </table>
    )
}