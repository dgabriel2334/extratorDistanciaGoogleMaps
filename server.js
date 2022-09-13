/**
FEITO POR:
DÁRIO GABRIEL EM 31/08/2022 
*/
const express = require('express');
const app = express();
const router = express.Router();
const objetos = require('./objeto');
const bodyParser = require("body-parser");

app.use("/", router);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;
app.listen(PORT, _ => { console.log('SERVIDOR RODANDO NA PORTA: ' + PORT); });



app.post('/buscar/', (req, res) => {

    let cidadeAtual = req.body.cidadeAtual;
    let enderecoAtual = req.body.enderecoAtual;
    let cidadeDestino = req.body.cidadeDestino;
    let enderecoDestino = req.body.enderecoDestino;

    objetos.start(cidadeAtual, enderecoAtual, cidadeDestino, enderecoDestino).then(result => {

        res.send(result);

    });
})




