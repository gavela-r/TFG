class licencia{
    #id;
    #codigo_licencia;
    #precio;
    #estado;
    #fecha_alta;
    #idJuego;
    #idOferta;

    constructor(codigo_licencia, precio, estado, fecha_alta, idJuego, idOferta) {
        this.#codigo_licencia = codigo_licencia;
        this.#precio = precio;
        this.#estado = estado;
        this.#fecha_alta = fecha_alta;   
        this.#idJuego = idJuego;
        this.#idOferta = idOferta;
    }

    getCodigo(){
        return this.#codigo_licencia;
    }

    getPrecio(){
        return this.#precio;
    }

    getEstado(){
        return this.#estado
    }

    getFechaAlta(){
        return this.#fecha_alta;
    }

    getIdJuego(){
        return this.#idJuego;
    }

    getIdOferta(){
        return this.#idOferta;
    }
}