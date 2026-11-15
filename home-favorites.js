
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("homeFavoriteGrid");
    const count = document.getElementById("homeFavoriteCount");
    const empty = document.getElementById("homeFavoriteEmpty");

    if (!grid) return;

    const albums = [
        { id: 1, title: "After Hours", artist: "The Weeknd", image: "photo/after.jpg" },
        { id: 2, title: "SOS", artist: "SZA", image: "photo/sos.webp" },
        { id: 3, title: "Blonde", artist: "Frank Ocean", image: "photo/blond.jpg" },
        { id: 4, title: "HIT ME HARD AND SOFT", artist: "Billie Eilish", image: "photo/hit.webp" },
        { id: 5, title: "eternal sunshine", artist: "Ariana Grande", image: "photo/eternal.png" },
        { id: 6, title: "GNX", artist: "Kendrick Lamar", image: "photo/gnx.jpg" },
        { id: 7, title: "BE", artist: "BTS", image: "photo/be.webp" },
        { id: 8, title: "Views", artist: "Drake", image: "photo/drake.jpg" }
    ];

    function renderFavorites() {
        const saved = albums.filter(album =>
            MoodFavorites.has(album.id)
        );

        grid.replaceChildren();
        count.textContent = saved.length;
        empty.hidden = saved.length !== 0;

        saved.forEach(album => {
            const card = document.createElement("article");
            card.className = "s3-album-card";

            const image = document.createElement("img");
            image.src = album.image;
            image.alt = `${album.title} by ${album.artist}`;
            image.loading = "lazy";
            image.className = "home-favorite-image";

            const info = document.createElement("div");
            info.className = "s3-album-info";

            const title = document.createElement("h2");
            title.textContent = album.title;

            const artist = document.createElement("p");
            artist.textContent = album.artist;

            const remove = document.createElement("button");
            remove.type = "button";
            remove.className = "s3-filter";
            remove.textContent = "♥ Remove";

            remove.addEventListener("click", () => {
                MoodFavorites.remove(album.id);
            });

            info.append(title, artist, remove);
            card.append(image, info);
            grid.appendChild(card);
        });
    }

    window.addEventListener(
        "mood-favorites-changed",
        renderFavorites
    );

    window.addEventListener("pageshow", renderFavorites);

    window.addEventListener("storage", event => {
        if (event.key === "mood-favorite-albums") {
            renderFavorites();
        }
    });

    renderFavorites();
});
