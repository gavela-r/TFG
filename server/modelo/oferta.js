class oferta{
    #id;
    #nombre;
    #descuento;
    #estado;

    constructor(nombre, descuento, estado) {
        this.#nombre = nombre;
        this.#descuento = descuento;
        this.#estado = estado;
    }

    getNombre(){
        return this.#nombre;
    }

    getDescuento(){
        return this.#descuento;
    }

    getEstado(){
        return this.#estado;
    }
}