const socket = io();
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


socket.on('cartaoVirado', ({ indice, nome, frase }) => {
    const cartao = document.getElementById(`cartao${indice + 1}`);
    if (!cartao.classList.contains('virado')) {
        cartao.classList.add('virado');  
        const paragrafo = document.createElement('p');
        paragrafo.innerHTML = `Frase de ${nome}: "${frase}"`;
        cartao.appendChild(paragrafo);
    }
});

function resetarCartas() {
    const cartas = document.querySelectorAll('.cartao');

    
    cartas.forEach(cartao => {
        cartao.classList.remove('virado');  
        cartao.style.backgroundImage = "url('img/logo1.png')"; 
        const paragrafo = cartao.querySelector('p');
        if (paragrafo) {
            paragrafo.remove();
        }
    });

    socket.emit('resetarJogo');
}

function revelarFraseViaConsole(indice, nome) {
    const cartao = document.getElementById(`cartao${indice + 1}`);
    const paragrafo = document.createElement('p');
    paragrafo.innerHTML = `Frase de ${nome}: "${frases[indice]}"`;
    cartao.classList.add('virado');  
    cartao.appendChild(paragrafo);
    socket.emit('virarCartao', { indice, nome });
}

socket.on('estadoInicial', (estadoCartoes) => {
    estadoCartoes.forEach((estado, indice) => {
        if (estado) {
            const cartao = document.getElementById(`cartao${indice + 1}`);
            cartao.classList.add('virado');
            const paragrafo = document.createElement('p');
            paragrafo.innerHTML = `Frase de ${estado.nome}: "${estado.frase}"`;
            cartao.appendChild(paragrafo);
        }
    });
});

socket.on('resetarJogo', () => {
    resetarCartas(); 
});
