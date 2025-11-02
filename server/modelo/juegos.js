class juego{
    #id;
    #nombre;
    #precio;
    #fecha_lanzamiento;
    #desarrollador;
    #pegi;
    #foto;

    constructor(nombre, precio, fecha_lanzamiento, desarrollador, pegi, foto){
        this.#nombre = nombre;
        this.#precio = precio;
        this.#fecha_lanzamiento = fecha_lanzamiento;
        this.#desarrollador = desarrollador;
        this.#pegi = pegi;
        this.#foto = foto;  
    }

    getNombre(){
        return this.#nombre;
    }

    getPrecio(){
        return this.#precio;
    }

    getFechaLanzamiento(){
        return this.#fecha_lanzamiento;
    }

    getDesarrollador(){
        return this.#desarrollador;
    }

    getPegi(){
        return this.#pegi;
    }

    getFoto(){
        return this.#foto;
    }
}