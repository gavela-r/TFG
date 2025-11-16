const bd = require("../../conexion/bd");
const Juego = require("../juegos");

function obtenerJuegos(req, res){
    const nombre = req.query.nombre;
    let sql = "SELECT * FROM juegos ";
    if(nombre != undefined){
        sql += `WHERE nombre LIKE '%${nombre}%'`
    }
    const juegos = [];

    try{
        bd.query(sql, (err, result) =>{
            
            if(err){
               return res.status(404).json({Error: "Juegos no encontrados"});
            }else{
                result.map(j =>{
                    let juego = new Juego(j.id, j.nombre, j.precio, j.fecha_lanzamiento, j.desarrollador, j.Pegi, j.foto);
                    juegos.push(juego);
                    
                });
                return res.status(200).json({results: juegos});
            }
        })
    }catch(err){
        return res.status(500).json({Error: "Error en el servidor"});
    }

}


function insertarJuego(juego){
    const sql = `INSERT INTO juegos (nombre, precio, fecha_lanzamiento, pegi, foto) VALUES ('${juego.nombre}', '${juego.precio}', '${juego.fecha_lanzamiento}', '${juego.pegi}', ${juego.foto})`;

    bd.query(sql, (err, result) =>{
        if(err){
            throw new Error("No se pudo insertar el juego");
        }
    })
}

function filtroCategoria(req, res){
    const nombreGenero = req.query.genero;
    const limit = parseInt(req.query.limite);
    const pagina = parseInt(req.query.pagina)
    const offset = (pagina - 1) * limit;
    const juegosFiltros = [];

    try{
        const sql = `SELECT j.* FROM juegos j JOIN juego_genero jg ON j.id = jg.juego_id JOIN genero g ON g.id = jg.genero_id WHERE g.nombre = '${nombreGenero}' LIMIT ${limit} OFFSET ${offset}`;
        bd.query(sql, (err, result) =>{
            console.log(err);
            if(err){
                return res.status(404).json({Error: "No se pudo obtener los datos"});
            }else{
                result.forEach(j =>{
                    let juegoFiltro = new Juego(j.id, j.nombre, j.precio, j.fecha_lanzamiento, j.desarrollador, j.pegi, j.foto);
                    juegosFiltros.push(juegoFiltro);
                })
                return res.status(200).json({results: juegosFiltros});
            }
        })
    }catch(err){
        return res.status(500).json({Error: "Error en la peticion"})
    }
}
module.exports = {obtenerJuegos, insertarJuego, filtroCategoria}