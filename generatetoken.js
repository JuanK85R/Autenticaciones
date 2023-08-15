const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()
const PORT = 3000
const secretKey = 'default_secret_key'

// generamos el token
app.get('/api/token', (req, res) =>{
    const payload = {user_id: 1234, username: 'usuario'}
    const token = jwt.sign(payload, secretKey, {expiresIn: '1h'})
    res.json({token})
})

// autenticamos el token
app.get('/api/data', verifyToken, (req, res) =>{
    const data  = {mensaje: "Estos son datos super protegidos"}
    res.send(data)
})

// Si el token esta vacio
function verifyToken(req, res, next){
    const autHeader = req.headers['authorization']
    if(!autHeader){
        return res.status(404).json({error: 'Token no existente'})
    }

    //extraer el token del header
    const token = autHeader.split(' ')[1]
    if (!token) {
        return res.status(404).json({error: 'Token no esta proporcionado'})
    }
// si el token esta mal
    jwt.verify(token, secretKey, (err, decode) => {
        if(err){
            return res.status(401).json({error: 'Token invalido'})
        }
// si los datos son validos
        req.user = decode
        next();
    })
}

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http:/localhost:${PORT}`);
})
