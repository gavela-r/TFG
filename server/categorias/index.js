const bd = require('../conexion/bd');

function obtenerCategorias(req, res){
    const sql = "SELECT * FROM genero";
    try{
        bd.query(sql, (err, result) =>{
            if(err){
                return res.status(404).json({Error: "No se encontro niguna categoria"});
            }else{
                return res.status(200).json({results: result});
            }
        })

    }catch(err){
        return res.status(500).json({Error: "Error en el servidor"});
    }
}

module.exports = {obtenerCategorias};