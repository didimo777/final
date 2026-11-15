
"use strict";

(function () {
    const storageKey = "mood-theme";

    let savedTheme = "dark";

    try {
        savedTheme = localStorage.getItem(storageKey) || "dark";
    } catch (error) {
        savedTheme = "dark";
    }

    function applyTheme(theme) {
        const selected = theme === "light" ? "light" : "dark";

        document.documentElement.setAttribute(
            "data-theme",
            selected
        );

        const button = document.getElementById("themeToggle");
        const icon = document.getElementById("themeIcon");

        if (button && icon) {
            icon.textContent = selected === "dark" ? "☀" : "☾";

            button.setAttribute(
                "aria-label",
                selected === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            );

            button.setAttribute(
                "title",
                selected === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            );
        }
    }

    applyTheme(savedTheme);

    document.addEventListener("DOMContentLoaded", function () {
        applyTheme(savedTheme);

        const button = document.getElementById("themeToggle");

        if (!button) return;

        button.addEventListener("click", function () {
            const current = document.documentElement.getAttribute(
                "data-theme"
            );

            const next = current === "dark" ? "light" : "dark";

            applyTheme(next);

            try {
                localStorage.setItem(storageKey, next);
            } catch (error) {
                console.warn("Theme preference could not be saved.");
            }
        });
    });
})();
