import Client from "./Client"

export default interface ClientRepository {
    save(client: Client): Promise<Client>
    del(client: Client): Promise<null>
    getAll(client: Client): Promise<Client[]>
}