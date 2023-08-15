const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))

app.use((req, res, next) => {
    console.log(`Recibida una solicitud a ${req.url}`)
    next();
})

app.get('/' , (req, res) => {
    res.send('Hola! este es una aplicacion web')
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http:/localhost:${PORT}`);
})
