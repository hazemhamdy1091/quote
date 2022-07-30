const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = []


// show loading
function showLoadingSpinner() {
    loader.hidden = false
    quoteContainer.hidden = true
}

// hide loading 
function removeLoadingSpinner() {
	quoteContainer.hidden = false;
	loader.hidden = true;
}

// show new quote

function newQuote() {
    showLoadingSpinner();
    // pick a random quote form apiQuotes array 
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

    // check if author field is blank and replace it with
    if(!quote.author) {
        authorText.textContent = "Unknown"
    } else {
        authorText.textContent = quote.author;
    }

    // check quote length to determine styling
    if(quote.text.length > 120) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove("long-quote");
    }
    // set quote, hide loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner()
}   

// Get Guote From API
async function getQuotes() {
    showLoadingSpinner()
	const apiUrl = "https://type.fit/api/quotes";

	try {
		const response = await fetch(apiUrl);
		apiQuotes = await response.json();
        newQuote()
	} catch (error) {
		// Catch error here
	}
}

// Tweet Quote

function tweetQuote () {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(tweetUrl, '_blank')
}

// event listners 
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// onload
getQuotes()
