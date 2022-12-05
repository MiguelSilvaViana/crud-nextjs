import { useEffect, useState } from "react";
import CollectionClient from "../backend/db/CollectionClient";
import Button from "../components/Button";
import Form from "../components/Form";
import Layout from "../components/Layout";
import Table from "../components/Table";
import Client from "../core/Client";
import ClientRepository from "../core/ClientRepository";

export default function Home() {

  const repo: ClientRepository = new CollectionClient()
  
  const [visible, setVisible] = useState<'table' | 'form'>('table') // 2 possiveis estados table ou form
  
  const [client, setClient] = useState<Client>(Client.void())
  
  const [clients, setClients] = useState<Client[]>([])

  useEffect(getall, [])
  
  function getall() {
    repo.getAll().then((clients) => {
      setClients(clients)
      setVisible('table')
    })
  }
  
  function selectedClient(client: Client) {
    setClient(client)
    setVisible('form')
  }
  
  async function deletedClient(client: Client) {
    await repo.del(client)
    getall()
  }

  function newClient() {
    setClient(Client.void())
    setVisible('form')
  }

  async function saveClient (client: Client) {
    await repo.save(client)
    getall()
  }

  
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-sky-600 to-cyan-600">
      
      <Layout titulo="Simple Registration">
        {visible === 'table' ? (
          <>
            <div className="flex justify-end">
              <Button onClick={() => newClient()}
              className="mb-4" color="sky">New Customer</Button>
            </div>
            <Table clients={clients} selectedClient={selectedClient} deletedClient={deletedClient}></Table>
          </>
        ) : (
          <Form client={client}
            cancel={() => setVisible('table')}
            clientChanged={saveClient}
          />
        )}  
      </Layout>
    </div>
  )
}
