function saveFavoriteQuote(quote) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.includes(quote)) {
        favorites.push(quote);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
}

document.getElementById("save-quote-button").addEventListener("click", () => {
    const quoteElement = document.getElementById("quote");
    if (quoteElement) {
        const quote = quoteElement.textContent;
        saveFavoriteQuote(quote);
    } else {
        console.error("Quote element not found.");
    }
});

function displayFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const favoritesContainer = document.getElementById("favorites-container");
    if (favoritesContainer) {
        favoritesContainer.innerHTML = favorites.map(fav => `<p>${fav}</p>`).join("");
    } else {
        console.error("Favorites container not found.");
    }
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

document.getElementById("dark-mode-toggle").addEventListener("click", toggleDarkMode);
