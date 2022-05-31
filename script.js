let inputsElNL = document.querySelectorAll('input');
let spansEl = document.querySelectorAll('span');
let inputsEl = Array.from(inputsElNL);

inputsEl.forEach(input => {
    if (inputsEl.indexOf(input) < 5) {
       input.addEventListener('focus', colore)
        input.addEventListener('focusout', descolore) 
    }
    
});

// Função pra colorir o texto do input selecionado
function colore(e) {
    let inputClicado = e.currentTarget;
    let arr = Array.prototype.slice.call(inputsEl);
    let n = arr.indexOf(inputClicado);

    spansEl[n].style.color = '#6530d9';
}

// Função pra descolorir o texto do input selecionado
function descolore(e) {
    let inputClicado = e.currentTarget;
    let arr = Array.prototype.slice.call(inputsEl);
    let n = arr.indexOf(inputClicado);

    spansEl[n].style.color = '';
}

let btnCalcular = document.querySelector('#btn-calcular');
btnCalcular.addEventListener('click', calcular); 

let massaEl = document.querySelector('#input-massa');
let t1El = document.querySelector('#input-t1');
let t2El = document.querySelector('#input-t2');
let calorEspecificoSolidoEl = document.querySelector('#input-calorEspecificoSolido');
let calorEspecificoLiquidoEl = document.querySelector('#input-calorEspecificoLiquido');
let calorEspecificoVaporEl = document.querySelector('#input-calorEspecificoVapor');
let calorLatenteFusaoEl = document.querySelector('#input-calorLatenteFusao');
let calorLatenteVaporizacaoEl = document.querySelector('#input-calorLatenteVaporização');

function calcular() {

    let resultadoEl = document.querySelector("#resultado");
    let erro = 0;
    let massa = parseInt(massaEl.value);
    let t1 = parseInt(t1El.value);
    let t2 = parseInt(t2El.value);
    let calorEspecificoSolido = parseFloat(calorEspecificoSolidoEl.value);
    let calorEspecificoLiquido = parseFloat(calorEspecificoLiquidoEl.value);
    let calorEspecificoVapor = parseFloat(calorEspecificoVaporEl.value);
    let calorLatenteFusao = parseFloat(calorLatenteFusaoEl.value);
    let calorLatenteVaporizacao = parseInt(calorLatenteVaporizacaoEl.value);
    let variacaoTemperatura;
    let aquecimento = 0;
    let mudancaFase = 0;
    let calorias = 0;

    inputsEl.forEach(input => {
        if(input.value === "" && inputsEl.indexOf(input) < 5){
            erro = 1;
        }
        else if(input.value === "" && inputsEl.indexOf(input) > 4){
            calorEspecificoLiquido = 1;
            calorEspecificoVapor = 0.5;
            calorLatenteFusao = 80;
        }
    });

    if(erro == 1){
        resultadoEl.style.padding = "1.2rem";
        resultadoEl.textContent = "Por favor preencha todos os campos.";
        return
    }

    
 
    if(t1 < 0 && t2 > 0) {
        variacaoTemperatura = t1 - 0;
 
        if (variacaoTemperatura < 0) {
            variacaoTemperatura = variacaoTemperatura * -1;
        }
        aquecimento = aquecimento + massa * calorEspecificoSolido * variacaoTemperatura;
        mudancaFase = mudancaFase + massa * calorLatenteFusao;
        t1 = 0;
    }
 
    if(t1 < 100 && t2 > 100) {
        aquecimento += massa * calorEspecificoLiquido * (100 - t1);
        mudancaFase += massa * calorLatenteVaporizacao;
        t1 = 100
    }
 
    if(t2 < 0) {
        aquecimento += massa * calorEspecificoSolido * (t2 - t1);
    }
 
    if(t2 < 100 && t2 > 0) {
        aquecimento += massa * calorEspecificoLiquido * (t2 - t1);
    }
 
    if(t2 > 100) {
        aquecimento += massa * calorEspecificoVapor * (t2 - t1);
    }
 
    calorias = aquecimento + mudancaFase;
   
    resultadoEl.style.padding = "1.2rem";
    resultadoEl.textContent = "Quantidade de calorias : " + calorias + " cal";
}