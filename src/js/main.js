
require('dotenv').config();

//  NASA API-nyckel via .env
const nasaApiKey = process.env.VITE_NASA_API_KEY;


document.addEventListener('DOMContentLoaded', function() {
    // Lägger till en eventlyssnare på sökknappen
    document.getElementById('searchButton').addEventListener('click', function() {
        const searchQuery = document.getElementById('searchInput').value.trim();
        if (searchQuery) {
            // Hämtar Wikipedia-information baserat på söktermen
            fetchWikipediaInfo(searchQuery); 
        }
    });
});

//AJAX Funktion för att hämta information från Wikipedia och visa sammanfattning direkt på sidan
function fetchWikipediaInfo(searchTerm) {
    // URL för Wikipedia-sökning för att hämta sammanfattning
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&titles=${encodeURIComponent(searchTerm)}&format=json&origin=*`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const pageId = Object.keys(data.query.pages)[0];
            if (pageId != "-1") {
                const extract = data.query.pages[pageId].extract;
                const pageTitle = data.query.pages[pageId].title;
                // Skapar URL för att läsa mer på Wiki
                const wikipediaUrl = `https://en.wikipedia.org/?curid=${pageId}`;
                // Hämtar elementet där informationen ska visas och uppdaterar det med Wikipedia-information
                const infoElement = document.getElementById('planetInfo');
                infoElement.innerHTML = `<h3>${pageTitle}</h3><p>${extract}</p><p>Read more on <a href="${wikipediaUrl}" target="_blank">Wikipedia</a>.</p>`;
                // Hämtar bilder relaterade till sökningen
                fetchImages(searchTerm); 
            } else {
                alert('No Wikipedia summary was found.');
            }
        })
        .catch(error => {
            console.error('Error fetching Wikipedia info:', error);
            alert('Failed to fetch information from Wikipedia.');
        });
}

// AJAX Funktion för att hämta och visa bilder från NASA baserat på sökning
function fetchImages(objectName) {
    // URL för bildsökning hos NASA
    fetch(`https://images-api.nasa.gov/search?q=${encodeURIComponent(objectName)}`)
        .then(response => response.json())
        .then(data => {
            const images = data.collection.items.filter(item => item.links).slice(0, 3);
            // Skapar HTML-kod för bilderna och uppdaterar sidan med dessa
            const imagesHTML = images.map(item => `<img src="${item.links[0].href}" alt="Image of ${objectName}" style="max-width: 100%; margin-top: 10px;">`).join('');
            const imagesElement = document.getElementById('planetImages');
            imagesElement.innerHTML = imagesHTML;
        })
        .catch(error => console.error('Error:', error));
}


