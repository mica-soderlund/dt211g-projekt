
require('dotenv').config();

//  NASA API-nyckel via .env
const nasaApiKey = process.env.VITE_NASA_API_KEY;

document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const clearButton = document.getElementById('clearButton'); 
    const searchInput = document.getElementById('searchInput');

    // Eventlyssnare för sökknappen
    searchButton.addEventListener('click', function() {
        const searchQuery = searchInput.value.trim();
        if (searchQuery) {
            fetchWikipediaInfo(searchQuery);
            fetchImages(searchQuery);
        }
    });

    // Eventlyssnare för "Clear"-knappen i sök
    clearButton.addEventListener('click', function() {
        clearSearchResults();
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
                infoElement.innerHTML = 
                // rubrik baserat på söktermen
                `<h2>${pageTitle}</h2><p>${extract}</p>
                <p>Read more on <a href="${wikipediaUrl}" target="_blank">Wikipedia</a>.</p>`;
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
             
            // rubrik för bilderna baserat på söktermen
            const imageTitle = `<h2>NASA Images of ${objectName}</h2>`;

            // Skapar HTML-kod för bilderna inklusive bildtexter
            const imagesHTML = images.map(item => {
                const imageInfo = item.data[0]; 
                return `<div class="image-container">
                            <img src="${item.links[0].href}" alt="${imageInfo.title}" style="max-width: 100%; margin-top: 10px; border-radius: 10px;">
                            <p><strong>${imageInfo.title}</strong> (${imageInfo.date_created.split('T')[0]})</p>
                            <p>${imageInfo.description}</p>
                        </div>`;
            }).join('');

            // Kombinerar rubriken med bilderna för en samlad presentation
            const imagesElement = document.getElementById('planetImages');
            imagesElement.innerHTML = imageTitle + imagesHTML;
        })
        .catch(error => console.error('Error:', error));
}

// Funktion för att rensa sökresultaten och återställa ursprungligt innehåll
function clearSearchResults() {
    document.getElementById('planetInfo').innerHTML = '<h2>Still curious About Space?</h2> <h3> Make a new search! </h3>';
    document.getElementById('planetImages').innerHTML = '';
    document.getElementById('searchInput').value = ''; // Rensar sökfältet
}

