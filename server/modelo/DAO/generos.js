const bd = require("../../conexion/bd");
const Genero = require("../genero");

function obtenerGeneros(req, res){
    const sql = "SELECT * FROM genero";
    const generos = [];
    try{
        bd.query(sql, (err, result) =>{
            if(err){
                return res.status(404).json({Error: "No se encontro ningunm genero"});
            }else{
                result.forEach(g =>{
                    let genero = new Genero(g.id, g.nombre);
                    generos.push({
                        id: genero.id,
                        nombre: genero.nombre
                    });
                })
                return res.status(200).json({results: generos})
            }
        })
    }catch(err){
        return res.status(500).json({Error: "Error en el servidor"});
    }
}

module.exports = {obtenerGeneros}