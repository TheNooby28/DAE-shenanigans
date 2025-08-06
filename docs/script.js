const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const button = document.getElementById("get-quote");
const favoriteButton = document.getElementById("favorite-quote");
let quoteCount = parseInt(localStorage.getItem("quoteCount")) || 0;

button.addEventListener("click", getQuote);

function getQuote() {
    fetch("https://api.api-ninjas.com/v1/quotes", {
        headers: {
            "X-Api-Key": API_KEY
        }
    })
    .then(res => {
        if (!res.ok) throw new Error("Failed to get quote!");
        return res.json();
    })
    .then(data => {
        const quote = data[0];
        quoteText.textContent = `"${quote.quote}"`;
        authorText.textContent = `- ${quote.author}`;

        quoteCount++;
        localStorage.setItem("quoteCount", quoteCount);

        favoriteButton.disabled = false;
    })
    .catch(err => {
        console.error(err);
        quoteText.textContent = "Failed to fetch quote!";
        authorText.textContent = "";
    })
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
        alert("You have already favorited this!")
    }
}
