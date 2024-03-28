//MASHUP - wikipedia + nasa

// Initierar funktioner när sidan är fullständigt laddad
document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const clearButton = document.getElementById('clearButton');
    const searchInput = document.getElementById('searchInput');
    const planetInfo = document.getElementById('planetInfo');

    // Initierar sökning när användaren klickar på sökknappen
    searchButton.addEventListener('click', function() {
        const searchQuery = searchInput.value.trim();
        if (searchQuery) {
            fetchWikipediaInfo(searchQuery);
        }
    });


    // Rensar sökresultat och återställer input när användaren klickar på "Clear"
    clearButton.addEventListener('click', clearSearchResults);

    // Hanterar klick på element inom 'planetInfo' genom "event delegation"
    planetInfo.addEventListener('click', function(event) {
        if (event.target.classList.contains('click-for-images')) {
            const title = event.target.closest('.wiki-result').getAttribute('data-title');
            fetchNasaImages(title); // Använder titeln från sökt Wikipedia-artikel för att hämta bilder från NASA
        }
    });
});


// Hämtar information från Wikipedia baserat på sökterm 
function fetchWikipediaInfo(searchTerm) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&titles=${encodeURIComponent(searchTerm)}&format=json&origin=*`;
   //AJAX-anrop
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const pages = data.query.pages;
            const resultsHTML = Object.keys(pages).map(pageId => {
                const page = pages[pageId];
                const wikipediaUrl = `https://en.wikipedia.org/?curid=${pageId}`; // Skapar URL för "Läs mer" på Wikipedia
                // Skapar HTML för varje Wikipedia-resultat +  inkluderar en "Läs mer"-länk på engelska
                return `<div class="wiki-result" data-title="${page.title}">
                            <h3>${page.title}</h3>
                            <p>${page.extract}</p>
                            <p>Read more on <a href="${wikipediaUrl}" target="_blank">Wikipedia</a>.</p>
                            <p class="click-for-images">Click for matching images from NASA</p>
                        
                        </div>`;
            }).join('');
            document.getElementById('planetInfo').innerHTML = resultsHTML; // Visar resultaten på sidan
        })
        .catch(error => {
            console.error('Error fetching Wikipedia info:', error);
            alert('Failed to fetch information from Wikipedia.');
        });
}


// Hämtar och visar bilder från NASA baserat på Wikipedia-artikelns titel
function fetchNasaImages(title) {
    //AJAX-anrop
    fetch(`https://images-api.nasa.gov/search?q=${encodeURIComponent(title)}&media_type=image`)
        .then(response => response.json())
        .then(data => {
            // Begränsar till 3 bilder
            const images = data.collection.items.filter(item => item.links).slice(0, 3); 
            const imagesHTML = images.map(item => {
                const imageInfo = item.data[0]; // Hämtar bildtext
                // Skapar HTML för varje bild inklusive bildtext
                return `<div class="nasa-image-container">
                            <img src="${item.links[0].href}" alt="${imageInfo.title}" style="max-width: 100%; margin-top: 10px; border-radius: 10px;">
                            <p>${imageInfo.description || 'No description available.'}</p> 
                        </div>`;
            }).join('');
            document.getElementById('planetImages').innerHTML = imagesHTML; // Visar bilderna på sidan
        })
        .catch(error => console.error('Error fetching NASA images:', error));
}


// Rensar tidigare sökresultat och återställer formuläret
function clearSearchResults() {
    document.getElementById('planetInfo').innerHTML = '<h2>Curious About Space?</h2>';
    document.getElementById('planetImages').innerHTML = '';
    document.getElementById('searchInput').value = '';
}
