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

    get Id(){
        return this.id
    }

    get Nombre(){
        return this.nombre;
    }

    get Precio(){
        return this.precio;
    }

    get FechaLanzamiento(){
        return this.fecha_lanzamiento;
    }

    get Desarrollador(){
        return this.desarrollador;
    }

    get Pegi(){
        return this.pegi;
    }

    get Foto(){
        return this.foto;
    }
}

module.exports = Juego;