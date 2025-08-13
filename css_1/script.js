// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcrSB7PbHjlJ4AEvW4GRF4GaiRBcbkVcw",
  authDomain: "quote-generator-a92ff.firebaseapp.com",
  projectId: "quote-generator-a92ff",
  storageBucket: "quote-generator-a92ff.firebasestorage.app",
  messagingSenderId: "771305045294",
  appId: "1:771305045294:web:d66cb47646d58264230ebf",
  measurementId: "G-LMRLCST5L9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const button = document.getElementById("get-quote");
const favoriteButton = document.getElementById("favorite-quote");
let quoteCount = parseInt(localStorage.getItem("quoteCount")) || 0;
const loadingElement = document.getElementById("loading");

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


const logo = document.getElementById('logoImg');
const darkModeToggle = document.getElementById('darkModeToggle');

function setTheme(theme) {
    document.body.classList.toggle('dark-mode', theme === 'dark');

    if (theme === 'dark') {
        logo.src = 'lightQuoteIcon.png';
    } else {
        logo.src = 'quoteIcon.png';
    }

    localStorage.setItem('theme', theme);
}

darkModeToggle.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
    setTheme(newTheme);
});

const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);
