const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-nav");



function toggleMenu() {
    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    menuButton.textContent = isOpen ? "✕" : "☰";

    menuButton.setAttribute("aria-expanded", `${isOpen}`);

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
}


menuButton.addEventListener("click", toggleMenu);

