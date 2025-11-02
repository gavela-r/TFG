class compra{
    #id;
    #idUsuario;
    #idLicencia;

    constructor(idUsuario, idLicencia) {
        this.#idUsuario = idUsuario;
        this.#idLicencia = idLicencia
    }

    getIdUsuario(){
        return this.#idUsuario
    }

    getIdLicencia(){
        return this.#idLicencia
    }
}