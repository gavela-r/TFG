const bd = require('../conexion/bd');

function filtroCategoria(req, res){
    const nombreGenero = req.query.genero;
    const limit = parseInt(req.query.limite);
    const pagina = parseInt(req.query.pagina)
    const offset = (pagina - 1) * limit;

    try{
        const sql = `SELECT j.* FROM juegos j JOIN juego_genero jg ON j.id = jg.juego_id JOIN genero g ON g.id = jg.genero_id WHERE g.nombre = '${nombreGenero}' LIMIT ${limit} OFFSET ${offset}`;
        bd.query(sql, (err, result) =>{
            console.log(err);
            if(err){
                return res.status(404).json({Error: "No se pudo obtener los datos"});
            }else{
                return res.status(200).json({results: result});
            }
        })
    }catch(err){
        return res.status(500).json({Error: "Error en la peticion"})
    }
}

module.exports = {filtroCategoria}