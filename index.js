// 
const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const results = document.getElementById("results");

form.addEventListener("submit", async (event) => {
    // Stop the page from refreshing
    event.preventDefault();

    // Get the text entered by the user
    const query = input.value.trim();

    // Ignore empty searches
    if (!query) {
        return;
    }

    // Clear old results
    results.innerHTML = "";

    // Wikimedia Commons API URL
    const url =
        "https://commons.wikimedia.org/w/api.php" +
        "?action=query" +
        "&generator=search" +
        "&gsrsearch=" + encodeURIComponent(query) +
        "&gsrnamespace=6" +
        "&gsrlimit=12" +
        "&prop=imageinfo" +
        "&iiprop=url" +
        "&iiurlwidth=300" +
        "&format=json" +
        "&origin=*";

    try {
        // Fetch data from API
        const response = await fetch(url);

        // Check if request was successful
        if (!response.ok) {
            throw new Error("Request failed: " + response.status);
        }

        // Convert response into JavaScript object
        const data = await response.json();

        // Get the pages/results
        const items = data.query
            ? Object.values(data.query.pages)
            : [];

        // Enhancement: show result count
        const count = document.createElement("p");
        count.textContent = `Showing ${items.length} results for "${query}"`;
        results.appendChild(count);

        // Render every result
        items.forEach((item) => {
            // Create card
            const card = document.createElement("article");
            card.className = "card";

            // Create image
            const img = document.createElement("img");
            img.src = item.imageinfo[0].thumburl;
            img.alt = item.title;

            // Create title
            const caption = document.createElement("p");
            caption.textContent = item.title;

            // Add image and title to card
            card.appendChild(img);
            card.appendChild(caption);

            // Add card to results grid
            results.appendChild(card);
        });

    } catch (error) {
        console.error("Error:", error);
    }
});