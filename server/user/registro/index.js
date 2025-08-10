const bd = require('../../conexion/bd');
const bcrypt = require('bcrypt');

function registro(req, res){
    const { nombre, correo, pass} = req.body;

    if(!nombre || !correo || !pass){
        res.status(400).json({Error: 'Faltan datos'});
        return;
    }

    try{
        const verificarCorreo = `SELECT * FROM usuarios WHERE correo = '${correo}'`;
        bd.query(verificarCorreo, (err, result) =>{
            if(err){
                return res.status(404).json({Error: 'Error al verificar el correo'});
            }else if(result.length > 0){
                return res.status(400).json({Error: 'El correo ya existe'});
            }else{
                const passHash = bcrypt.hashSync(pass, 10);
                const sql = `INSERT INTO usuarios (nombre, correo, contrasena, rol) VALUES ('${nombre}', '${correo}', '${passHash}', 'user')`;
                bd.query(sql, (err) =>{
                    if(err){
                        return res.status(400).json({Error: 'No se pudo registrar el usuario'});
                    }else{
                        return res.status(201).json({Message: 'Usuario registrado correctamente'});
                    }
                })
            }
        })
 
    }catch(error){
        return res.status(500).json({Error: 'Error en el servidor'});
    }
}

module.exports = registro;