export default class Client {

    #id: string | null
    #name: string
    #age: number

    /* # = protect ele pode ser acesso aqui dentro da class e derivados da class
    private so pode ser acessado dentro da class derivados n podem usar ele*/

    constructor(name: string, age: number, id: string | null = null) {
        this.#id = id;
        this.#name = name;
        this.#age = age;
    }

    /*static so da para chamar essa func utilizando o nome da class*/

    static void () {
        return new Client('', 0)
    }

    get id() {
        return this.#id
    }

    get name() {
        return this.#name
    }

    get age() {
        return this.#age
    }
}