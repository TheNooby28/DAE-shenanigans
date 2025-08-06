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