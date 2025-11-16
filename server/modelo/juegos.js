class Juego{
    id;
    nombre;
    precio;
    fecha_lanzamiento;
    desarrollador;
    pegi;
    foto;

    constructor(id, nombre, precio, fecha_lanzamiento, desarrollador, pegi, foto){
        this.id = id
        this.nombre = nombre;
        this.precio = precio;
        this.fecha_lanzamiento = fecha_lanzamiento;
        this.desarrollador = desarrollador;
        this.pegi = pegi;
        this.foto = foto;  
    }

    getId(){
        return this.id
    }

    getNombre(){
        return this.nombre;
    }

    getPrecio(){
        return this.precio;
    }

    getFechaLanzamiento(){
        return this.fecha_lanzamiento;
    }

    getDesarrollador(){
        return this.desarrollador;
    }

    getPegi(){
        return this.pegi;
    }

    getFoto(){
        return this.foto;
    }
}

module.exports = Juego;