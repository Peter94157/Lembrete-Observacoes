const express = require('express');
const cors = require("cors")
const bodyParser = require('body-parser');
const app = express();

const { v4: uuidv4 } = require('uuid');

observacoesPorLembreteId = {};


app.use(bodyParser.json());
app.use(cors())

//:id é um placeholder
//exemplo: /lembretes/123456/observacoes

app.put('/lembretes/:id/observacoes', (req, res) => {
    let { id: idObs, texto } = req.body;
    if (!idObs) idObs = 1; 

    let observacoesDoLembrete = observacoesPorLembreteId[req.params.id] || [];

    const index = observacoesDoLembrete.findIndex(obs => obs.id === idObs);

    if (index >= 0) {
        observacoesDoLembrete[index].texto = texto;
    } else {
        observacoesDoLembrete.push({ id: idObs, texto });
    }

    observacoesPorLembreteId[req.params.id] = observacoesDoLembrete;

    res.status(201).send(observacoesDoLembrete);
});


app.get('/lembretes/:id/observacoes', (req, res) => {
    res.send(observacoesPorLembreteId[req.params.id] || []);
});

app.listen(5000, (() => {
    console.log('Lembretes. Porta 5000');
}));
