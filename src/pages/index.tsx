import { useState } from "react";
import Button from "../components/Button";
import Form from "../components/Form";
import Layout from "../components/Layout";
import Table from "../components/Table";
import Client from "../core/Client";

export default function Home() {
  
  const [visible, setVisible] = useState<'table' | 'form'>('table') // 2 possiveis estados table ou form
  
  const [client, setClient] = useState<Client>(Client.void())
  
  const clients = [
    new Client('Ana', 34, '1'),
    new Client('Bia', 44, '2'),
    new Client('Miguel', 3, '3'),
    new Client('Dog', 55, '4'),
  ]
  
  function selectedClient(client: Client) {
    console.log(client + ' selected')	
    setClient(client)
    setVisible('form')
  }
  
  function deletedClient(client: Client) {
    console.log(`excluir ${client.name}`)
  }

  function newClient() {
    setClient(Client.void())
    setVisible('form')
  }

  function saveClient (client: Client) {
    console.log(client)
    setVisible('table')
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
