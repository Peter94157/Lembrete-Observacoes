const express = require ('express');
const cors = require("cors")
const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(cors())

lembretes = {};
contador = 0;

app.get ('/lembretes', (req, res) => {
    res.send(lembretes);

});
app.put('/lembretes', (req, res) => {
contador++;
const { texto } = req.body;
lembretes[contador] = {
contador, texto
 }
res.status(201).send(lembretes[contador]);
});

app.listen(4000, () => {
console.log('Lembretes. Porta 4000');
});