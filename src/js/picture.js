document.addEventListener('DOMContentLoaded', function() {
    fetchAPOD();
});

// Funktion för att hämta "Picture of the Day" från NASA och visa den.
function fetchAPOD() {
    // Använder miljövariabeln istället för en hårdkodad nyckel
    const apiKey = process.env.VITE_NASA_API_KEY;
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayAPOD(data);
        })
        .catch(error => console.error('Error fetching APOD:', error));
}

// Funktion för att visa APOD-dat samt stylin för bild och text
function displayAPOD(data) {
    const apodElement = document.getElementById('apod');
    if (apodElement) {
        apodElement.innerHTML = `
            <h3>${data.title}</h3>
            <img src="${data.url}" alt="Astronomy Picture of the Day" style="max-width: 100%; border-radius: 10px;">
            <p>${data.explanation}</p>
        `;
    } else {
        console.error('Elementet "apod" could not be found.');
    }
}
