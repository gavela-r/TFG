class juegoGenero{
    #idJuego;
    #idGenero;

    constructor(idJuego, idGenero) {
        this.#idJuego = idJuego;
        this.#idGenero = idGenero;
    }

    getIdJuego(){
        return this.#idJuego;
    }

    getIdGenero(){
        return this.#idGenero;
    }
}