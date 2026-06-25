function add(n1, n2) {
    return n1 + n2;
};

function multiply(n1, n2) {
    return n1 * n2;
};

function subtract(n1, n2) {
    return n1 - n2;
};

function divide(n1, n2) {
    return n1 / n2;
};

function rest(n1, n2) {
    return n1 % n2;
};

function calculator(n1, n2, operator) {
    return operator(n1, n2);
};


// ISNERIMENTO VALORI

const inputNum1 = document.getElementById('numero1');
const inputNum2 = document.getElementById('numero2');
const selectOperazione = document.getElementById('operazione');
const bottoneCalcola = document.getElementById('btn-calcola');
const bottoneReset = document.getElementById('btn-reset');
const areaRisultato = document.getElementById('risultato');

// LETTURA VALORI

// Click sul bottone
bottoneCalcola.addEventListener('click', function () {

    // Numeri inseriti (parseFloat per i decimali)
    let val1 = parseFloat(inputNum1.value);
    let val2 = parseFloat(inputNum2.value);

    // Operazione scelta dal menu a tendina
    let operazioneScelta = selectOperazione.value;

    // Controllo errori
    if (isNaN(val1) || isNaN(val2)) {
        areaRisultato.textContent = "Errore: Inserisci entrambi i numeri!";
        areaRisultato.style.color = "#d18882"; // Colore rosso
        return; // Interrompe l'esecuzione in caso di errore
    }

    // Variabile per conservare la funzione scelta temporaneamente
    let functionToPass;

    // Match valore della tendina alla funzione reale
    if (operazioneScelta === "add") {
        functionToPass = add;
    } else if (operazioneScelta === "subtract") {
        functionToPass = subtract;
    } else if (operazioneScelta === "multiply") {
        functionToPass = multiply;


    } else if (operazioneScelta === "divide") {
        functionToPass = divide;
        // Divisione per zero
        if (val2 === 0) {
            areaRisultato.textContent = "Errore: Impossibile dividere per zero!";
            areaRisultato.style.color = "#d18882";
            return;
        }

    } else if (operazioneScelta === "rest") {
        functionToPass = rest;
    }


    // Stampa Calculator
    let totale = calculator(val1, val2, functionToPass);
    // Stampa il risultato a schermo aggiornando il testo dell'h2 vuoto
    areaRisultato.textContent = "Risultato: " + totale;
    areaRisultato.style.color = "#87bfa2"; // Colore verde
});

// Bottone di reset
bottoneReset.addEventListener('click', function() {
    
    // 1. Svuotiamo le caselle di testo impostando il valore a stringa vuota ("")
    inputNum1.value = "";
    inputNum2.value = "";
    
    // 2. Opzionale ma consigliato: riportiamo la tendina sul simbolo "+"
    selectOperazione.value = "add";
    
    // 3. Cancelliamo il testo del risultato precedente
    areaRisultato.textContent = "";
    
});