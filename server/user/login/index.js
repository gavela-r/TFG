const bd = require("../../conexion/bd.js");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const secret = "claveSecreta";

function login(req, res){
    const { correo, pass } = req.body;
    
    if(!correo || !pass){
        res.status(400).json({Error: 'Campos vacios'});
        return;
    }

    try{
        const sql = `SELECT * FROM usuarios WHERE correo = '${correo}'`;
        bd.query(sql, (err, result) =>{
            
            if(err){
                res.status(400).json({Error:`correo o contraseña incorrectos`});
            }else if(result.length === 0){
                return res.status(404).json({Error: 'correo no encontrado'});
            }

            const user = result[0];
            const passConfirm = bcrypt.compareSync(pass, user.contrasena);
            
            if(!passConfirm){
                return res.status(404).json({Error: 'Contraseña incorrecta'});
            }else{
                const token = jwt.sign(
                    {
                        nombre: user.nombre,
                        rol: user.rol,
                    },
                    secret,
                    {
                        expiresIn: '1h',
                    }
            )
                return res.status(200).json({
                    message: "Login correcto",
                    token: token,
                    user: user.nombre,
                    rol: user.rol,
                })
            }
        })

    }catch(err){
        res.status(500).json({Error: 'Error en el servidor'});
    }

}

module.exports = login;