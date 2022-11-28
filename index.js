const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const twilio = require('twilio');

app.use(bodyParser.urlencoded({ extended: true }));

let usuarioLogado = '';
let cpf = '';
let primeiraInteracao = false;

const defaultMessage = (req, res) =>{
    res.send('<Response><Message>Olá, Primeiramente me diga qual é o seu nome </Message></Response>')
}

const cpfMessage = (req, res) =>{
    res.send(`<Response><Message>olá ${usuarioLogado}, agora eu preciso que você digite o seu cpf: </Message></Response>`)
}

const validationMessage = (req, res) =>{
    res.send(`<Response><Message>${usuarioLogado}, Estamos Verificando se você possui saldo disponivel no fgts: </Message></Response>`)
}

app.post('/', (req, res) => {
    if (!primeiraInteracao) {
        defaultMessage(req, res);
        primeiraInteracao = true;
    } else if (!usuarioLogado) {
        usuarioLogado = req.body.Body.toLowerCase();
        cpfMessage(req, res);
    } else {
        cpf = req.body.Body.toLowerCase();
        validationMessage(req, res);
    }
});

app.listen(3000, function() {
    console.log('Servidor ativo na porta 3000!');
})