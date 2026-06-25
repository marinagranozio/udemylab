const formContatti = document.getElementById('form-contatti');
const nomeInput = document.getElementById('nome'); // Assicurati che l'input nome in HTML abbia id="nome"
const emailInput = document.getElementById('email');
const testoMessaggio = document.getElementById('messaggio');
const boxEsito = document.getElementById('messaggio-esito');

formContatti.addEventListener('submit', async function(evento) {
    
    evento.preventDefault(); 
    
    // Feedback visivo
    boxEsito.textContent = "Invio in corso...";
    boxEsito.style.color = "#79c5ce"; 

    let nomeDigitato = nomeInput.value;
    let emailDigitata = emailInput.value;
    let testoDigitato = testoMessaggio.value;

    // --- VALIDAZIONE ---
    if (!emailDigitata.includes('@') || !emailDigitata.includes('.')) {
        boxEsito.textContent = "Errore: Inserisci un indirizzo email valido!";
        boxEsito.style.color = "#d18882"; 
        return; 
    }

    if (testoDigitato.length < 15) {
        boxEsito.textContent = "Errore: Il messaggio è troppo corto (min. 15 caratteri).";
        boxEsito.style.color = "#d18882"; 
        return; 
    }

    // --- CHIAMATA API AL SERVER NODE.JS ---
    try {
        const datiDaInviare = {
            nome: nomeDigitato,
            email: emailDigitata,
            messaggio: testoDigitato
        };

        // Richiesta POST a localhost:3000
        const risposta = await fetch('/api/contatti', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datiDaInviare)
        });

        const datiRisposta = await risposta.json();

        // Se il server risponde con un errore
        if (!risposta.ok) {
            boxEsito.textContent = "Errore dal Server: " + datiRisposta.dettaglio;
            boxEsito.style.color = "#d18882";
            return;
        }

        // Se il server risponde con 201 Created
        boxEsito.textContent = "Ottimo! " + datiRisposta.messaggio;
        boxEsito.style.color = "#87bfa2"; // Verde pastello del tuo tema
        
        // Pulizia campi del form
        formContatti.reset();

    } catch (errore) {
        boxEsito.textContent = "Errore di connessione: il server non risponde.";
        boxEsito.style.color = "#d18882";
        console.error("Dettaglio errore di rete:", errore);
    }
});