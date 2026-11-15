
"use strict";

const MoodFavorites = (() => {
    const KEY = "mood-favorite-albums";

    function getIds() {
        try {
            const data = JSON.parse(localStorage.getItem(KEY) || "[]");

            return Array.isArray(data)
                ? data.filter(id => Number.isInteger(id))
                : [];
        } catch (error) {
            return [];
        }
    }

    function saveIds(ids) {
        try {
            localStorage.setItem(KEY, JSON.stringify(ids));
        } catch (error) {
            console.warn("Favorites could not be saved.", error);
        }

        window.dispatchEvent(new Event("mood-favorites-changed"));
    }

    function has(id) {
        return getIds().includes(id);
    }

    function toggle(id) {
        const ids = getIds();

        if (ids.includes(id)) {
            saveIds(ids.filter(item => item !== id));
            return false;
        }

        saveIds([...ids, id]);
        return true;
    }

    function remove(id) {
        saveIds(getIds().filter(item => item !== id));
    }

    function clear() {
        saveIds([]);
    }

    return { getIds, has, toggle, remove, clear };
})();
