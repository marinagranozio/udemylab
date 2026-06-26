document.addEventListener('DOMContentLoaded', () => {
    
    const btnApri = document.getElementById('btn-apri-chat');
    const btnChiudi = document.getElementById('btn-chiudi-chat');
    const btnTermina = document.getElementById('btn-termina-chat');
    const finestraChat = document.getElementById('finestra-chat');
    const inputChat = document.getElementById('input-chat');
    const btnInvia = document.getElementById('btn-invia-chat');
    const areaMessaggi = document.getElementById('area-messaggi');

    // APRE LA CHAT
    btnApri.addEventListener('click', () => {
        finestraChat.style.display = 'flex';
        btnApri.style.display = 'none';
    });

    // RIDUCE A ICONA (Non cancella i messaggi)
    btnChiudi.addEventListener('click', () => {
        finestraChat.style.display = 'none';
        btnApri.style.display = 'flex';
    });

    // TERMINA E RESETTA LA CHAT (Svuota tutto)
    btnTermina.addEventListener('click', () => {
        if(confirm("Sei sicuro di voler terminare la conversazione?")) {
            areaMessaggi.innerHTML = `
                <div class="msg bot-msg">
                    Ciao! 👋 Sono l'assistente virtuale del Portfolio. Come posso aiutarti oggi?
                </div>
            `;
            finestraChat.style.display = 'none';
            btnApri.style.display = 'flex';
        }
    });

    // CREAZIONE MESSAGGI HTML
    function aggiungiMessaggio(testo, mittente) {
        const msgDiv = document.createElement('div');
        msgDiv.className = mittente === 'utente' ? 'msg user-msg' : 'msg bot-msg';
        msgDiv.textContent = testo;
        
        areaMessaggi.appendChild(msgDiv);
        areaMessaggi.scrollTop = areaMessaggi.scrollHeight;
    }

    // LOGICA DI INVIO E RISPOSTA BOT
    function gestisciInvio() {
        const testoUtente = inputChat.value.trim();
        if (testoUtente === "") return;

        aggiungiMessaggio(testoUtente, 'utente');
        inputChat.value = ""; 

        const digitazioneDiv = document.createElement('div');
        digitazioneDiv.id = "indicatore-bot";
        digitazioneDiv.className = 'msg bot-msg';
        digitazioneDiv.style.backgroundColor = 'transparent';
        digitazioneDiv.style.fontStyle = 'italic';
        digitazioneDiv.textContent = "L'agente sta scrivendo...";
        areaMessaggi.appendChild(digitazioneDiv);
        areaMessaggi.scrollTop = areaMessaggi.scrollHeight;

        setTimeout(() => {
            document.getElementById('indicatore-bot').remove();
            aggiungiMessaggio("Al momento non sono disponibile in Live Chat. Utilizza il modulo qui a fianco per inviarmi un'email! 🚀", 'bot');
        }, 1500); 
    }

    btnInvia.addEventListener('click', gestisciInvio);
    inputChat.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') gestisciInvio();
    });
});