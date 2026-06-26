// Bottone "Calcola"
document.getElementById('btn-calcola').addEventListener('click', function () {

    // Lettura valori
    let persona1 = document.getElementById('persona1').value.trim();
    let persona2 = document.getElementById('persona2').value.trim();
    let boxRisultato = document.getElementById('risultato');

    // Compilazione campi?
    if (persona1 === "" || persona2 === "") {
        boxRisultato.textContent = "Inserisci il nome di entrambe le persone!";
        boxRisultato.style.color = "#d18882"; // Rosso errore
        return;
    }

    // -----
    let n = Math.random() * 100;
    n = Math.floor(n) + 1; // Numero casuale da 1 a 100

    boxRisultato.style.color = "#87bfa2"; // Verde successo

    // condizioni
    if (n > 70) {
        boxRisultato.textContent = "Love score: " + n + "%! Siete innamoratissimi! 💕";
    }
    else if (n <= 70 && n > 30) {
        boxRisultato.textContent = "Love score: " + n + "%! Potrebbe funzionare! 😊";
    }
    else if (n <= 30) {
        boxRisultato.textContent = "Love score: " + n + "%! Non siete molto compatibili... 💔";
    }
});

// Reset
document.getElementById('btn-reset').addEventListener('click', function () {
    document.getElementById('persona1').value = "";
    document.getElementById('persona2').value = "";
    document.getElementById('risultato').textContent = "";
});