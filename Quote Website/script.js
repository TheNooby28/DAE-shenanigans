const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const button = document.getElementById("get-quote");

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
    })
    .catch(err => {
        console.error(err);
        quoteText.textContent = "Failed to fetch quote!";
        authorText.textContent = "";
    })
}