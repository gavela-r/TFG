class Genero{
    id;
    nombre;

    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    get Id(){
        return this.id;
    }

    get Nombre(){
        return this.nombre
    }
}

module.exports = Genero