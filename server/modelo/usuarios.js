class Usuario{
    id;
    nombre;
    correo;
    pass;
    dni;
    fecha;

    constructor(nombre, correo, pass, fecha, dni){
        this.nombre = nombre;
        this.correo = correo;
        this.pass = pass;
        this.fecha = fecha;
    }

    getNombre(){
        return this.nombre;
    }

    getCorreo(){
        return this.correo;
    }

    getPass(){
        return this.pass;
    }

    getFecha(){
        return this.fecha;
    }

    getDni(){
        return this.dni;
    }

}