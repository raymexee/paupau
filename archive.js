document.addEventListener('DOMContentLoaded', () => {
    const messageContainer = document.getElementById('message-container');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    const quotes = JSON.parse(localStorage.getItem('quotesArchive')) || [];
    let currentIndex = quotes.length - 1; // Start with the most recent quote

    function renderMessage() {
        messageContainer.innerHTML = '';

        if (currentIndex >= 0 && currentIndex < quotes.length) {
            const { date, message } = quotes[currentIndex];
            const messageDate = new Date(date);
            const today = new Date();

            // Skip today's quotes
            if (messageDate.toDateString() === today.toDateString()) {
                messageContainer.textContent = "Aucun message à afficher pour aujourd'hui.";
            } else {
                const messageElement = document.createElement('p');
                messageElement.textContent = `${date}: ${message}`;
                messageContainer.appendChild(messageElement);
            }
        } else {
            messageContainer.textContent = "Aucun message à afficher.";
        }

        updateNavigationButtons();
    }

    function updateNavigationButtons() {
        prevButton.disabled = currentIndex <= 0;
        nextButton.disabled = currentIndex >= quotes.length - 1;
    }

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            renderMessage();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < quotes.length - 1) {
            currentIndex++;
            renderMessage();
        }
    });

    // Function to archive quotes only after the day changes
    function archiveYesterdayQuote() {
        const quotesArchive = JSON.parse(localStorage.getItem('quotesArchive')) || [];
        const lastArchivedDate = quotesArchive.length > 0 ? new Date(quotesArchive[quotesArchive.length - 1].date) : null;
        const today = new Date();

        // Check if the last archived date is yesterday or earlier
        if (!lastArchivedDate || lastArchivedDate.toDateString() !== new Date(today.setDate(today.getDate() - 1)).toDateString()) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayDateString = yesterday.toLocaleDateString();
            const dailyQuote = getQuoteOfTheDay(yesterday);

            quotesArchive.push({ date: yesterdayDateString, message: dailyQuote });
            localStorage.setItem('quotesArchive', JSON.stringify(quotesArchive));
        }
    }

    // Call the function to archive yesterday's quote
    archiveYesterdayQuote();

    // Initialize the archive view
    if (quotes.length === 0) {
        messageContainer.textContent = "Aucun message dans l'archive pour le moment.";
    } else {
        renderMessage();
    }

    // Mock function for the quote of the day (replace with actual implementation)
    function getQuoteOfTheDay(date) {
        return `Quote for ${date.toDateString()}`;
    }
});
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

document.getElementById("dark-mode-toggle").addEventListener("click", toggleDarkMode);