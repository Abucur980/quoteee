const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// get a new quote
function getNewQuote() {
    loading();
    // pick a random api quote   
    const quoteee = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check to see if author is unknown
    if (!quoteee.author) {
        quoteAuthor.textContent = "Unknown";
    } else {
        quoteAuthor.textContent = quoteee.author;
    }

    // check the length of the quote and then determine the style that should be applied
    if (quoteee.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // set quote and hide loader
    quoteText.textContent = quoteee.text;
    complete();
}

// get those quotes from the api
async function getQuotes() {
    loading();
    const apiURL = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        getNewQuote();
    } catch (error) {

    }
}

 // tweet the quoteee
 function tweetQuote() {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`
    window.open(twitterURL, '_blank');
}

// event listeners
newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);

// onload
getQuotes();