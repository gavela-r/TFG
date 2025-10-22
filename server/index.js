const registro = require("./user/registro");
const login = require("./user/login");

const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.post('/user/registro', registro)
app.post('/user/login', login);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`);
});