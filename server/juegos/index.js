const bd = require('../conexion/bd');

function obtenerJuegos(req, res){
    const nombre = req.query.nombre;
    console.log(nombre);
    let sql = "SELECT * FROM juegos ";
    
    if(nombre != undefined){
       sql += `WHERE nombre LIKE '%${nombre}%'`;
    }
    try{
       bd.query(sql, (err, result) =>{
            if(err){
                console.log(err);
                return res.status(404).json({Error: "Juegos no encontrados"} )
            }else{
                return res.status(200).json({results: result});
            }
       }) 
    }catch(error){
        return res(500).json({Error: "Error en el servidor"});
    }
}

module.exports = {obtenerJuegos}