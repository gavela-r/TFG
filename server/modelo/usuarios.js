class Usuarios{
    id;
    nombre;
    correo;
    pass;
    dni;
    fecha;
    rol;

    constructor(id, nombre, correo, pass, fecha, dni, rol){
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.pass = pass;
        this.fecha = fecha;
        this.dni = dni
        this.rol = rol;
    }

    get Id(){
        return this.id;
    }

    get Nombre(){
        return this.nombre;
    }

    get Correo(){
        return this.correo;
    }

    get Pass(){
        return this.pass;
    }

    get Fecha(){
        return this.fecha;
    }

    get Dni(){
        return this.dni;
    }

    get Rol(){
        return this.rol;
    }

}

module.exports = Usuarios;