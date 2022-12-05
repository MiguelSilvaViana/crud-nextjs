import { dataBase } from '../config'
import firestore, {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore'
import Client from '../../core/Client'
import ClientRepository from '../../core/ClientRepository'
 
export default class CollectionClient implements ClientRepository {

  save(client: Client): Promise<Client> {
      throw new Error('Method not implemented.')
  }
  del(client: Client): Promise<null> {
      throw new Error('Method not implemented.')
  }
  getAll(client: Client): Promise<Client[]> {
      throw new Error('Method not implemented.')
  }
 
  #converter = {
    toFirestore: (cliente: Client) => {
      return {
        nome: cliente.name,
        idade: cliente.age,
      }
    },
    fromFirestore: (
      snapshot: firestore.QueryDocumentSnapshot,
      options: firestore.SnapshotOptions,
      ) => {
        const data = snapshot.data(options)
        return new Client(data.name, data.age, snapshot.id)
      },
    }
    
  #colecaoCliente = collection(dataBase, 'clientes').withConverter(this.#converter)
 
  async salvar(client: Client): Promise<Client> {
    if (client?.id) {
      await setDoc(
        doc(dataBase, 'clientes', client.id).withConverter(this.#converter),
        client,
      )
      return client
    } else {
      const docRef = await addDoc(
        this.#colecaoCliente,
        client,
      )
      const doc = await getDoc(docRef)
      return doc.data()
    }
  }
 
  async excluir(client: Client): Promise<void> {
    return await deleteDoc(doc(dataBase, 'clients', client.id))
  }
 
  async obterTodos(): Promise<Client[]> {
    const clientesCol = this.#colecaoCliente
    const clientesSnapshot = await getDocs(clientesCol)
    const clientesList = clientesSnapshot.docs.map((doc) => doc.data()) ?? []
    return clientesList
  }
}