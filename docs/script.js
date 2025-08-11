const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const button = document.getElementById("get-quote");
const favoriteButton = document.getElementById("favorite-quote");
let quoteCount = parseInt(localStorage.getItem("quoteCount")) || 0;
const loadingElement = document.getElementById("loading");

// UPDATE THIS TO YOUR BACKEND URL (Render, Railway, etc)
const BACKEND_URL = "https://quotegeneratorserver.onrender.com/quote";

button.addEventListener("click", getQuote);

function getQuote() {
    loadingElement.style.display = "block";
    quoteText.style.display = "none";
    authorText.style.display = "none";
    favoriteButton.disabled = true

    fetch(BACKEND_URL)
        .then(res => {
            if (!res.ok) throw new Error("Failed to get quote!");
            return res.json();
        })
        .then(data => {
            quoteText.textContent = `"${data.quote}"`;
            authorText.textContent = `- ${data.author}`;

            quoteCount++;
            localStorage.setItem("quoteCount", quoteCount);

            favoriteButton.disabled = false;
        })
        .catch(err => {
            console.error(err);
            quoteText.textContent = "Failed to fetch quote!";
            authorText.textContent = "";
        })
        .finally(() => {
            loadingElement.style.display = "none";
            quoteText.style.display = "block";
            authorText.style.display = "block";
        });
}

favoriteButton.addEventListener("click", saveFavoriteQuote);

function saveFavoriteQuote() {
    const quote = quoteText.textContent;
    const author = authorText.textContent;

    if (!quote.trim() || !author.trim()) {
        console.warn("Empty quote or author, nothing was saved");
        return;
    }

    const favorite = {
        quote: quote,
        author: author
    };

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const alreadySaved = favorites.some(
        (q) => q.quote === favorite.quote && q.author === favorite.author
    );

    if (!alreadySaved) {
        favorites.push(favorite);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert("Quote added to favorites!");
    } else {
        alert("You have already favorited this!");
    }
}
