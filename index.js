let apiQuotes = [];

// get a new quote
function getNewQuote() {
    // pick a random api quote   
    const quoteee = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
}

// get those quotes from the api
async function getQuotes() {
    const apiURL='https://type.fit/api/quotes';

    try{
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        getNewQuote();
    } catch(error){

    }
}

getQuotes();