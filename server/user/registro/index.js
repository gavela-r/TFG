const bd = require('../../conexion/bd');
const bcrypt = require('bcrypt');

function validar(email, contrasena, dni){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const contrasenaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/;
    const dniNifRegex = /^([XYZ]|[A-HJUVNPQRSW])?\d{7,8}[A-Z]$/;

    const esEmailValido = emailRegex.test(email);
    const esContrasenaValida = contrasenaRegex.test(contrasena);
    const esDniNifValido = dniNifRegex.test(dni);

    
    return esEmailValido && esContrasenaValida && esDniNifValido;
}

function registro(req, res){
    const { nombre, correo, pass, dni, fecha} = req.body;
    
    
    if(!validar(correo, pass, dni)){
        res.status(400).json({Error: 'Correo o contraseña o dni no validos'});
        return;
    }

    if(!nombre || !fecha || !correo || !pass || !dni){
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
                const sql = `INSERT INTO usuarios (nombre, correo, contrasena, dni, fecha_nacimiento, rol) VALUES ('${nombre}', '${correo}', '${passHash}', '${dni}', '${fecha}', 'user')`;    
                bd.query(sql, (err) =>{
                    if(err){
                        console.log(err);
                        return res.status(400).json({Error: 'No se pudo registrar el usuario'});
                    }else{
                        return res.status(201).json({Message: 'Usuario registrado correctamente'});
                    }
                })
            }
        })
 
    }catch(error){
        console.log(error);
        return res.status(500).json({Error: 'Error en el servidor'});
    }
}

module.exports = {registro, validar};
