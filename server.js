// --- SETUP INIZIALE ---
require('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

// --- CONNESSIONE AL DATABASE SQL ---
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error("Errore di connessione al DB:", err.message);
    } else {
        console.log("Connesso al database SQLite con successo.");
    }
});

// --- CREAZIONE TABELLA ---
db.run(`CREATE TABLE IF NOT EXISTS contatti (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    messaggio TEXT NOT NULL,
    risposta_api_esterna TEXT, 
    meteo TEXT,
    status TEXT DEFAULT 'da leggere',
    data_invio DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// --- ENDPOINTS (API) ---

app.get('/health', (req, res) => {
    res.status(200).send("Il Server Express + SQL è online!");
});

// READ dal Database
app.get('/users', (req, res) => {
    const querySQL = "SELECT * FROM contatti WHERE status = 'da leggere'";

    db.all(querySQL, [], (err, rows) => {
        if (err) return res.status(500).json({ errore: err.message });

        // Pulizia dati (privacy)
        const datiPuliti = rows.map(riga => ({
            idMessaggio: riga.id,
            mittente: riga.nome,
            testo: riga.messaggio,
            data: riga.data_invio,
            suggerimento_bot: riga.risposta_api_esterna,
            meteo_roma: riga.meteo
        }));

        res.status(200).json({ totaleMessaggi: datiPuliti.length, dati: datiPuliti });
    });
});

// CREATE nel Database
app.post('/api/contatti', async (req, res) => {
    const { nome, email, messaggio } = req.body;

    if (!nome || !email || !messaggio) {
        return res.status(400).json({ errore: "Campi obbligatori mancanti." });
    }
    if (!email.includes('@')) {
        return res.status(400).json({ errore: "Formato email non valido." });
    }
    db.run(`INSERT INTO contatti (nome, email, messaggio) VALUES (?, ?, ?)`,
        [nome, email, messaggio], function (err) {
            if (err) return res.status(500).json({ errore: "DB Error" });
            res.status(201).json({
                successo: true,
                messaggio: "Il tuo messaggio è stato salvato nel Database!"
            });
        });
});

app.post('/api/meteo', async (req, res) => {
    const { citta } = req.body;
    const city = citta || "Rome";

    try {
        // Passo 1: Trova le coordinate della città
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
        const geoData = await geoRes.json();

        if (geoData.results) {
            const { latitude, longitude, name } = geoData.results[0];

            // Passo 2: Trova il meteo per quelle coordinate
            const meteoRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
            const meteoData = await meteoRes.json();

            return res.json({ meteo: `${name.toUpperCase()}: ${meteoData.current_weather.temperature}°C` });
        } else {
            return res.status(404).json({ meteo: "Città non trovata." });
        }
    } catch (e) {
        return res.status(500).json({ meteo: "Errore interno del server" });
    }
});

// --- 3. NUOVA ROTTA NEWS (100% Gratuita, No Chiavi!) ---
app.get('/api/news', async (req, res) => {
    try {
        // API pubblica che fornisce notizie italiane (senza bisogno di registrazione)
        const resp = await fetch('https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json');
        const data = await resp.json();

        // Prendiamo solo le prime 3 notizie per non intasare il widget
        const primeNotizie = data.articles.slice(0, 3).map(articolo => ({
            titolo: articolo.title,
            url: articolo.url
        }));

        res.json({ notizie: primeNotizie });
    } catch (e) {
        res.status(500).json({ errore: "News non disponibili al momento." });
    }
});

app.post('/api/attivita', async (req, res) => {
    const { partecipanti } = req.body;
    try {



        console.log("Interrogazione Bored API in corso...");

        const boredAPI = partecipanti
            ? `https://bored-api.appbrewery.com/filter?participants=${partecipanti}`
            : 'https://bored-api.appbrewery.com/random';
        const boredResponse = await fetch(boredAPI);
        const data = await boredResponse.json();
        const activity = Array.isArray(data) ? data[0].activity : data.activity;
        res.json({ curiosita: activity || "Nessuna attività trovata con questi criteri." });
    } catch (e) {
        res.json({ curiosita: "Errore di connessione API" });
    }
});

// --- AVVIO SERVER ---
app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
});