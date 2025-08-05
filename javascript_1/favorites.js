const favoritesList = document.getElementById("favorites-list");
const totalQuotes = document.getElementById("total-quotes");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

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

    totalQuotes.textContent = `Total Quotes: ${favorites.length}`

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