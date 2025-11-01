const bd = require("../../conexion/bd.js");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const secret = "claveSecreta";

function login(req, res) {
  const { correo, pass } = req.body;

  if (!correo || !pass) {
    return res.status(400).json({ Error: 'Campos vacíos' });
  }

  const sql = `SELECT * FROM usuarios WHERE correo = '${correo}'`;

  bd.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ Error: 'Error en la consulta' });
    }

    if (result.length === 0) {
      return res.status(404).json({ Error: 'Correo no encontrado' });
    }

    const user = result[0];
    const passConfirm = bcrypt.compareSync(pass, user.contrasena);

    if (!passConfirm) {
      return res.status(401).json({ Error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        nombre: user.nombre,
        rol: user.rol,
      },
      secret,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      message: "Login correcto",
      token: token,
      user: user.nombre,
      rol: user.rol,
    });
  });
}

module.exports = login;