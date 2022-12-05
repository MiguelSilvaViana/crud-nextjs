import Button from "../components/Button";
import Form from "../components/Form";
import Layout from "../components/Layout";
import Table from "../components/Table";
import useClients from "../hooks/useClients";

export default function Home() {

  const {
      client,
      clients,
      selectedClient,
      saveClient,
      deletedClient,
      newClient,
      tableVisible,
      showTable,
    } = useClients()
  
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-sky-600 to-cyan-600">
      
      <Layout titulo="Simple Registration">
        {tableVisible ? (
          <>
            <div className="flex justify-end">
              <Button onClick={() => newClient()}
              className="mb-4" color="sky">New Customer</Button>
            </div>
            <Table clients={clients} selectedClient={selectedClient} deletedClient={deletedClient}></Table>
          </>
        ) : (
          <Form client={client}
            cancel={showTable}
            clientChanged={saveClient}
          />
        )}  
      </Layout>
    </div>
  )
}
