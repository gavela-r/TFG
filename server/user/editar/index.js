const bd = require('../../conexion/bd.js');
const bcrypt = require('bcrypt');
const { validar } = require('../registro/index.js');




function editarPerfil(req, res){
    const {nombre, correo, pass, confirmPass, dni, fecha} = req.body;
    const id = req.user.id; 

    if(!validar(correo, pass, dni)){
        res.status(400).json({Error: "El correo, la contraseña o el dni no son validos"})
        return;
    }

    if(!nombre || !correo || !pass || !confirmPass || !dni || !fecha){
        res.status(400).json({Error: "Faltan datos"});
        return;
    }

    if(pass != confirmPass){
        res.status(400).json({Error: "Las contraseñas no coinciden"});
        return;
    }

    try{
        const passHash = bcrypt.hashSync(pass, 10);
        const sql = `UPDATE usuarios SET nombre = '${nombre}', correo = '${correo}', contrasena = '${passHash}', dni = '${dni}', fecha_nacimiento = '${fecha}' WHERE id = ${id}`
        bd.query(sql, (err) =>{
            if(err){
                console.log(err);
                return res.status(400).json({Error: "No se pudo modificar el perfil"});
            }else{
                return res.status(200).json({status: 200, Message: "El perfil se a modificado correctsamente"});
            }
        })
    }catch(error){ 
        return res.status(500).json({Error: "Error en el servidor"});
    }

}
module.exports = editarPerfil;