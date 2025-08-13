const favoritesList = document.getElementById("favorites-list");
const quotePercentage = document.getElementById("quote-percentage");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let quoteCount = parseInt(localStorage.getItem("quoteCount")) || 0;

function saveFavorites() {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

function removeFavorite(index) {
    favorites.splice(index, 1);
    saveFavorites();
    renderFavorites();
}

function renderFavorites() {
    favoritesList.innerHTML = "";

    let percentage = quoteCount > 0 ? Math.round((favorites.length / quoteCount) * 100) : 0;

        quotePercentage.textContent = `You've favorited ${percentage}% of the quotes you've seen!`;
    favorites.forEach((q, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${q.quote} ${q.author || "Unknown"}`;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "❌"
        removeBtn.style.marginLeft = "10px";
        removeBtn.addEventListener("click", () => removeFavorite(index));

        li.appendChild(removeBtn);
        favoritesList.appendChild(li);
    });
}

renderFavorites();

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
