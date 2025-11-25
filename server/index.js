const { loginUsuario, registroUsuario, editarUsuario} = require("./modelo/DAO/usuarios");
const verificarToken = require("./middleware/verificarToken");
const express = require("express");
const { obtenerJuegos, filtroCategoria } = require("./modelo/DAO/juegos");
const { obtenerGeneros } = require("./modelo/DAO/generos");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.post('/usuarios/registro', registroUsuario);
app.post('/usuarios', loginUsuario);
app.post('/usuarios/editar', verificarToken, editarUsuario);
app.get('/juegos', obtenerJuegos);
app.get('/categorias', obtenerGeneros);
app.get('/juegos/filtro', filtroCategoria);


app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`);
});