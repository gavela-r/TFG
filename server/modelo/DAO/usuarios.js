const bd = require('../../conexion/bd');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const secret = "claveSecreta";
const Usuario = require("../usuarios");

function loginUsuario(req, res){
  const { correo, pass } = req.body;
  const usuarios = [];

  if (!correo || !pass) {
    return res.status(400).json({ Error: 'Campos vacíos' });
  }

  const sql = `SELECT * FROM usuarios WHERE correo = '${correo}'`;

  bd.query(sql, (err, result) =>{
    if(err){
      return res.status(500).json({ Error: 'Error en la consulta' })
    }

    if(result.length === 0){
      return res.status(404).json({ Error: 'Correo no encontrado' });
      
    }

     result.forEach(u =>{
        let usuario = new Usuario(u.nombre, u.correo, u.contrasena, u.fecha_nacimiento, u.dni);
        usuarios.push(usuario);
     })
      const passConfirm = bcrypt.compareSync(pass, user.contrasena);
    
      if (!passConfirm) {
        return res.status(401).json({ Error: 'Contraseña incorrecta' });
      }
    
      const token = jwt.sign(
        {
          id: usuarios.id,
          nombre: usuarios.nombre,
          rol: usuarios.rol,
        },
        secret,
        { expiresIn: '24h' }
      );
    
      return res.status(200).json({
        message: "Login correcto",
        token: token,
        user: usuarios.nombre,
        rol: usuarios.rol,
      });
  })
}

function validar(email, contrasena, dni){
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const contrasenaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/;
  const dniNifRegex = /^([XYZ]|[A-HJUVNPQRSW])?\d{7,8}[A-Z]$/;

  const esEmailValido = emailRegex.test(email);
  const esContrasenaValida = contrasenaRegex.test(contrasena);
  const esDniNifValido = dniNifRegex.test(dni);

    
  return esEmailValido && esContrasenaValida && esDniNifValido;
}

function registroUsuario(req, res){
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
        }else if(result.legth > 0 ){
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
    }catch(err){
      return res.status(500).json({Error: 'Error en el servidor'});
    }
}

function editarUsuario(req, res){
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
module.exports = {loginUsuario, validar, registroUsuario, editarUsuario};