const {registro, validar} = require("./user/registro");
const login = require("./user/login");
const editarPerfil = require("./user/editar");
const verificarToken = require("./middleware/verificarToken");
const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.post('/user/registro', registro)
app.post('/user/login', login);
app.post('/user/editar', verificarToken, editarPerfil);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`);
});