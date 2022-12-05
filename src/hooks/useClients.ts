import CollectionClient from "../backend/db/CollectionClient"
import ClientRepository from "../core/ClientRepository"
import {useEffect, useState} from 'react'
import Client from "../core/Client"
import useTableOrForm from "./useTableOrForm"

export default function useClients() {
    
    const repo: ClientRepository = new CollectionClient()
    
    const { formVisible, tableVisible, showForm, showTable} = useTableOrForm()
    
    const [client, setClient] = useState<Client>(Client.void())
  
    const [clients, setClients] = useState<Client[]>([])

    useEffect(getall, [])
    
    function getall() {
        repo.getAll().then((clients) => {
        setClients(clients)
        showTable()
    })
    }
    
    function selectedClient(client: Client) {
        setClient(client)
        showForm()
    }
    
    async function deletedClient(client: Client) {
        await repo.del(client)
        getall()
    }

    function newClient() {
        setClient(Client.void())
        showForm()
    }

    async function saveClient (client: Client) {
        await repo.save(client)
        getall()
    }


    return {
        clients,
        client,
        newClient,
        saveClient,
        deletedClient,
        selectedClient,
        getall,
        tableVisible,
        formVisible,
        showTable
    }
}