class plataforma{
    #id;
    #nombre;

    constructor(nombre){
        this.#nombre = nombre;
    }

    getNombre(){
        return this.#nombre;
    }
}