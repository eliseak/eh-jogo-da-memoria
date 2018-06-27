const fim = document.querySelector(".fimDeJogo");
const cartas = document.querySelectorAll(".carta");
const imagens = ["img/action.png", "img/aqua.png", "img/gale.png", "img/reflect.png", "img/siege.png"];

let ordemCartasEmbaralhadas = [];

// Sorteia um numero
function sortearNumero(min, max){
    return Math.floor(Math.random()*(max - min + 1)) + min;
}

// Embaralha as cartas no início do jogo
function embaralharCartas(){
    let distribuicaoImagens = [];
    let numeroDePares = cartas.length/2;

    for (let i = 0; i < numeroDePares; i++){
        distribuicaoImagens[i] = 0;
    }

    for (let i = 0; i < cartas.length; i++){

        // Enquanto uma imagem não for sorteada...
        while (ordemCartasEmbaralhadas[i] === undefined){
            let num = sortearNumero(0, numeroDePares);
    
            if (distribuicaoImagens[num] < 2){
                ordemCartasEmbaralhadas[i] = imagens[num];
                distribuicaoImagens[num]++;
            }
        }

    }

}

// Mostra a imagem da carta
function virarCarta (){
    if (!this.estaPareada){

        // Mostra a imagem da carta
        this.style.backgroundImage = `url(${ordemCartasEmbaralhadas[this.indice]})`;
        this.estaVirada = true;
        
        let cartasViradas = [];

        // Conta o numero de cartas viradas
        for (let carta of cartas){
            if (carta.estaVirada && !carta.estaPareada) cartasViradas.push(carta);
        }

        if (cartasViradas.length === 2){
    
            // Verificar se o par de cartas viradas são iguais
            verificarPar(cartasViradas);
        }

    }
}

// Verificar se as cartas possuem imagens iguais
function verificarPar(cartasSelecionadas){
    if (cartasSelecionadas[0].style.backgroundImage == cartasSelecionadas[1].style.backgroundImage){
        console.log("Cartas iguais!");

        for (let carta of cartasSelecionadas){
            carta.estaPareada = true; 
        }

        verificarFimDeJogo();
    }
    else{
        console.log("Cartas diferentes!");

        // (Des)vira a carta
        setTimeout(desvirarCarta, 300, cartasSelecionadas);

    }
}

// Esconde a imagem da carta
function desvirarCarta (cartasSelecionadas){
    for (let carta of cartasSelecionadas){
        carta.style.backgroundImage = "url(img/reverse_clear.png)";
        carta.estaVirada = false;
    }
}

// Verifica se todas as cartas foram viradas
function verificarFimDeJogo(){
    let todasPareadas = true;

    for (let carta of cartas){
        if (!carta.estaPareada) todasPareadas = false;
    }

    if (todasPareadas){
        fim.classList.add("aparecer");
        console.log("Fim do jogo!");
    }
}

embaralharCartas();

// Atribuições
for (let carta in cartas){
    cartas[carta].onclick = virarCarta;
    cartas[carta].estaVirada = false;
    cartas[carta].estaPareada = false; 
    cartas[carta].indice = carta; 
}

