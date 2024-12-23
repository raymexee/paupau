document.addEventListener('DOMContentLoaded', () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const favoritesList = document.getElementById("favorites-list");

    if (favoritesList) {
        // Filtrer les entrées pour exclure "Bienvenue !"
        const filteredFavorites = favorites.filter(fav => !fav.startsWith("Bienvenue !"));

        // Remplir la liste avec les entrées filtrées
        favoritesList.innerHTML = filteredFavorites.map(fav => `<li>${fav}</li>`).join('');
    }

    const addFavoriteForm = document.getElementById("add-favorite-form");

    if (addFavoriteForm) {
        addFavoriteForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const newFavorite = document.getElementById("new-favorite").value;

            if (newFavorite && !favorites.includes(newFavorite)) {
                favorites.push(newFavorite);
                localStorage.setItem("favorites", JSON.stringify(favorites));
                location.reload(); // Recharger la page pour afficher la mise à jour
            }
        });
    }

    const clearFavoritesButton = document.getElementById("clear-favorites");

    if (clearFavoritesButton) {
        clearFavoritesButton.addEventListener("click", () => {
            localStorage.removeItem("favorites");
            location.reload(); // Recharger la page pour afficher la mise à jour
        });
    }
});


function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

document.getElementById("dark-mode-toggle").addEventListener("click", toggleDarkMode);
