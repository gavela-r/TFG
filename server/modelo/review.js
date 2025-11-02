class review{
    #id;
    #comentario;
    #puntuacion;
    #idUsuario;
    #idJuego;
    #idPlataforma;

    constructor(comentario, puntuacion, idUsuario, idJuego, idPlataforma) {
        this.#comentario = comentario;
        this.#puntuacion = puntuacion;
        this.#idUsuario = idUsuario;
        this.#idJuego = idJuego;
        this.#idPlataforma = idPlataforma;
    }

    getComentario(){
        return this.#comentario;
    }

    getPuntuacion(){
        return this.#puntuacion;
    }

    getIdUsuario(){
        return this.#idUsuario;
    }

    getIdJuego(){
        return this.#idJuego;
    }

    getIdPlataforma(){
        return this.#idPlataforma;
    }
}