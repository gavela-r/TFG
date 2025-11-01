const jwt = require('jsonwebtoken');
const secret = "claveSecreta";

function verificarToken(req, res, next){
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(400).json({Error: "Token faltante"});
    }

    const token = authHeader.split(' ')[1];


    try{
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    }catch(err){
        console.log(err);
        return res.status(400).json({Error: "Token invalido"});
    }
}

module.exports = verificarToken;