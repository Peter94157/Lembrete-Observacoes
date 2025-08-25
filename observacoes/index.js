const express = require ('express');
const bodyParser = require('body-parser');
const app = express();
const { v4: uuidv4 } = require('uuid');

observacoesPorLembreteId = {};


app.use(bodyParser.json());

 //:id é um placeholder
 //exemplo: /lembretes/123456/observacoes
 
app.put('/lembretes/:id/observacoes', (req, res) => {
const idObs = uuidv4();
const { texto } = req.body;
 //req.params dá acesso à lista de parâmetros da URL
 observacoesDoLembrete =
 observacoesPorLembreteId[req.params.id] || [];
 observacoesDoLembrete.push({ id: idObs, texto });
 observacoesPorLembreteId[req.params.id] =
 observacoesDoLembrete;
res.status(201).send(observacoesDoLembrete);
16 });

app.get('/lembretes/:id/observacoes', (req, res) => {
res.send(observacoesPorLembreteId[req.params.id] || []);
});

app.listen(5000, (() => {
 console.log('Lembretes. Porta 5000');
 }));
