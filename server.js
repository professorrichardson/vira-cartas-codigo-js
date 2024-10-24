const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Cria uma aplicação Express
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Servir arquivos estáticos da pasta "public"

// Array de frases que será compartilhado entre todos os jogadores
const frases = [
    "Acredite em você mesmo!",
    "O sucesso começa com o primeiro passo.",
    "Nunca desista dos seus sonhos.",
    "Você é mais forte do que pensa.",
    "A persistência é o caminho do êxito.",
    "Você pode tudo o que quiser!",
    "A única maneira de fazer algo é começar.",
    "Tenha coragem de seguir em frente.",
    "A vitória é daqueles que nunca param de lutar.",
    "Cada dia é uma nova oportunidade.",
    "Você é capaz de coisas incríveis.",
    "O fracasso é apenas um degrau para o sucesso.",
    "Confie no processo.",
    "O trabalho duro supera o talento.",
    "Seja a mudança que você quer ver no mundo.",
    "As dificuldades nos tornam mais fortes.",
    "Faça hoje o que você vai agradecer amanhã.",
    "O impossível é apenas uma opinião.",
    "Você está a um passo de alcançar seus sonhos.",
    "Sonhe alto, trabalhe duro."
];

let estadoCartoes = Array(20).fill(null); 
io.on('connection', (socket) => {
    console.log('Novo jogador conectado!');
    socket.emit('estadoInicial', estadoCartoes);
    socket.on('virarCartao', ({ indice, nome }) => {
        estadoCartoes[indice] = { nome, frase: frases[indice] };
        io.emit('cartaoVirado', { indice, nome, frase: frases[indice] });
    });
    socket.on('disconnect', () => {
        console.log('Jogador desconectado');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
