// ---  SETUP INIZIALE ---

const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// ---  MIDDLEWARE ---
// Questo comando è un "traduttore". Permette al server di capire
// i pacchetti di dati in formato JSON che arrivano dai form.
app.use(express.json()); 
app.use(express.static(__dirname));

// --- DATABASE ---
const databaseContatti = [
    { id: 1, nome: "Mario Marini", email: "mario@email.com", messaggio: "Bellissimo portfolio!", status: "letto" },
    { id: 2, nome: "Luigi Verdi", email: "luigi@email.com", messaggio: "Cerco uno sviluppatore web.", status: "da leggere" },
    { id: 3, nome: "Perla Todisco", email: "perla@email.com", messaggio: "Come funziona Flexbox?", status: "da leggere" },
    { id: 4, nome: "Fatima Boldi", email: "fboldi@email.com", messaggio: "Codice orribile. Argh!", status: "spam" }
];


//--- Endpoints ---

// Rotta GET /health
app.get('/health', (req, res) => {
    res.status(200).send("Il Server Express è online e funzionante!");
});

// Rotta GET /users
app.get('/users', (req, res) => {
    
    // Filtro dati con .filter() -- solo i messaggi "da leggere", NO spam
    const messaggiUtili = databaseContatti.filter(contatto => {
        return contatto.status === "da leggere";
    });

    // Modificam struttura dati con .map(), NO email utenti al browser
    const datiPuliti = messaggiUtili.map(contatto => {
        return {
            idMessaggio: contatto.id,
            mittente: contatto.nome,
            testo: contatto.messaggio
        };
    });

    // Invio dati puliti e filtrati al browser in formato JSON
    res.status(200).json({
        totaleMessaggi: datiPuliti.length,
        dati: datiPuliti
    });
});

// --- Rotta POST con app.post perché stiamo *ricevendo* dati dal form contatti, Sì gestione errori
app.post('/api/contatti', (req, res) => {
    
    // req.body contiene i dati inviati dal client (browser)
    const { nome, email, messaggio } = req.body;

    // Validazione input e STATUS 400 (Bad Request - Errore dell'utente)
    if (!nome || !email || !messaggio) {
        // Se manca un campo
        return res.status(400).json({ 
            errore: "Validazione fallita", 
            dettaglio: "Nome, email e messaggio sono campi obbligatori." 
        });
    }

    if (!email.includes('@')) {
        return res.status(400).json({ 
            errore: "Validazione fallita", 
            dettaglio: "Formato email non valido." 
        });
    }

    // TRY-CATCH e STATUS 500 (Internal Server Error - Errore nostro)
    try {
        // Creiamo il nuovo oggetto contatto
        const nuovoContatto = {
            id: databaseContatti.length + 1, // Genera un ID finto progressivo
            nome: nome,
            email: email,
            messaggio: messaggio,
            status: "da leggere"
        };

        // Lo salviamo nel database finto
        databaseContatti.push(nuovoContatto);
        fs.writeFileSync('./messaggi.json', JSON.stringify(databaseContatti, null, 2));

        // STATUS 201 (Created - Tutto è andato a buon fine e un dato è stato creato)
        return res.status(201).json({ 
            successo: true, 
            messaggio: "Contatto salvato con successo!",
            datiSalvati: nuovoContatto
        });

    } catch (errore) {
        // Se qualcosa si rompe nel blocco 'try' (es. database offline)
        // catturiamo l'errore qui per non far crashare il server.
        console.error("Errore imprevisto nel salvataggio:", errore);
        return res.status(500).json({ 
            errore: "Errore interno del server", 
            dettaglio: "Si è verificato un problema tecnico, riprova più tardi." 
        });
    }
});

// --- AVVIO SERVER ---
app.listen(PORT, () => {
    console.log(`🚀 Server avviato con successo su http://localhost:${PORT}`);
});