async function cercaMeteo() {
    const citta = document.getElementById('input-citta').value;
    const widgetMeteo = document.getElementById('widget-meteo');
    
    widgetMeteo.style.display = "block";
    widgetMeteo.innerHTML = "Ricerca in corso...";

    try {
        const response = await fetch('/api/meteo', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ citta: citta })
        });
        const data = await response.json();
        widgetMeteo.innerHTML = `🌤️ ${data.meteo}`;
    } catch (e) {
        widgetMeteo.innerHTML = "Errore di connessione.";
    }
}

async function cercaAttivita() {
    const pers = document.getElementById('input-persone').value;
    const widgetBored = document.getElementById('widget-bored');
    
    widgetBored.innerHTML = "Ricerca in corso...";

    try {
        const response = await fetch('/api/attivita', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ partecipanti: pers })
        });
        const data = await response.json();
        widgetBored.innerHTML = `🎮 ${data.curiosita}`;
    } catch (e) {
        widgetBored.innerHTML = "Errore di connessione.";
    }
}

async function caricaNews() {
    const widgetNews = document.getElementById('widget-news');
    
    widgetNews.style.display = "block";
    widgetNews.innerHTML = "Caricamento notizie...";

    try {
        const response = await fetch('/api/news');
        const data = await response.json();
        
        if (data.notizie && data.notizie.length > 0) {
            // Creiamo una lista HTML con le notizie
            let htmlNews = "<ul style='padding-left: 20px; margin: 0;'>";
            data.notizie.forEach(news => {
                htmlNews += `<li style="margin-bottom: 8px;"><a href="${news.url}" target="_blank" style="color: #2b3245; text-decoration: none;">${news.titolo}</a></li>`;
            });
            htmlNews += "</ul>";
            
            widgetNews.innerHTML = htmlNews;
        } else {
            widgetNews.innerHTML = "Nessuna notizia trovata.";
        }
    } catch (e) {
        widgetNews.innerHTML = "❌ Errore nel caricamento delle news.";
    }
}