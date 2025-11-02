class juegoPlataforma{
    #idJuego;
    #idPlataforma;

    constructor(idJuego, idPlataforma) {
        this.#idJuego = idJuego;
        this.#idPlataforma = idPlataforma;
    }

    getidJuego(){
        return this.#idJuego;
    }

    getidPlataforma(){
        return this.#idPlataforma;
    }
}