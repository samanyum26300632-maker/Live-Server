// // 
// const form = document.getElementById("search-form");
// const input = document.getElementById("search-input");
// const results = document.getElementById("results");

// form.addEventListener("submit", async (event) => {
//     // Stop the page from refreshing
//     event.preventDefault();

//     // Get the text entered by the user
//     const query = input.value.trim();

//     // Ignore empty searches
//     if (!query) {
//         return;
//     }

//     // Clear old results
//     results.innerHTML = "";

//     // Wikimedia Commons API URL
//     const url =
//         "https://commons.wikimedia.org/w/api.php" +
//         "?action=query" +
//         "&generator=search" +
//         "&gsrsearch=" + encodeURIComponent(query) +
//         "&gsrnamespace=6" +
//         "&gsrlimit=12" +
//         "&prop=imageinfo" +
//         "&iiprop=url" +
//         "&iiurlwidth=300" +
//         "&format=json" +
//         "&origin=*";

//     try {
//         // Fetch data from API
//         const response = await fetch(url);

//         // Check if request was successful
//         if (!response.ok) {
//             throw new Error("Request failed: " + response.status);
//         }

//         // Convert response into JavaScript object
//         const data = await response.json();

//         // Get the pages/results
//         const items = data.query
//             ? Object.values(data.query.pages)
//             : [];

//         // Enhancement: show result count
//         const count = document.createElement("p");
//         count.textContent = `Showing ${items.length} results for "${query}"`;
//         results.appendChild(count);

//         // Render every result
//         items.forEach((item) => {
//             // Create card
//             const card = document.createElement("article");
//             card.className = "card";

//             // Create image
//             const img = document.createElement("img");
//             img.src = item.imageinfo[0].thumburl;
//             img.alt = item.title;

//             // Create title
//             const caption = document.createElement("p");
//             caption.textContent = item.title;

//             // Add image and title to card
//             card.appendChild(img);
//             card.appendChild(caption);

//             // Add card to results grid
//             results.appendChild(card);
//         });

//     } catch (error) {
//         console.error("Error:", error);
//     }
// });

async function searchImages(query) {

    // -----------------------------
    // 1. LOADING STATE
    // -----------------------------

    status.textContent = "Searching...";
    results.innerHTML = "";


    try {

        // -----------------------------
        // 2. API URL
        // -----------------------------

        const url =
            `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${query}&gsrnamespace=6&gsrlimit=12&prop=imageinfo&iiprop=url&format=json&origin=*`;


        // -----------------------------
        // 3. FETCH DATA
        // -----------------------------

        const response = await fetch(url);


        // -----------------------------
        // 4. ERROR CHECK
        // -----------------------------

        if (!response.ok) {
            throw new Error("Request failed");
        }


        // -----------------------------
        // 5. CONVERT RESPONSE TO JSON
        // -----------------------------

        const data = await response.json();


        // -----------------------------
        // 6. GET RESULTS
        // -----------------------------

        const items = Object.values(data.query?.pages || {});


        // -----------------------------
        // 7. EMPTY STATE
        // -----------------------------

        if (items.length === 0) {

            status.textContent =
                "No results for that word. Try another search.";

            return;
        }


        // -----------------------------
        // 8. POLISH - RESULT COUNT
        // -----------------------------

        status.textContent =
            `Showing ${items.length} results for "${query}"`;


        // -----------------------------
        // 9. DISPLAY RESULTS
        // -----------------------------

        render(items);


    } catch (error) {

        // -----------------------------
        // 10. ERROR STATE
        // -----------------------------

        status.textContent =
            "Something went wrong. Please try again.";

        results.innerHTML = "";
    }
}
try {

    // Loading
    status.textContent = "Searching...";


    // Fetch
    const response = await fetch(url);


    // Check error
    if (!response.ok) {
        throw new Error("Request failed");
    }


    // JSON
    const data = await response.json();


    // Results
    const items = Object.values(data.query?.pages || {});


    // Empty
    if (items.length === 0) {

        status.textContent = "No results.";

    } else {

        // Results
        status.textContent =
            `Showing ${items.length} results`;

        render(items);
    }


} catch (error) {

    // Error
    status.textContent =
        "Something went wrong. Please try again.";
}