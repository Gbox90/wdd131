const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('nav');

menuButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    menuButton.classList.toggle('open');
});

const currentYear = new Date().getFullYear();
const yearElement = document.getElementById("currentyear");

yearElement.textContent = currentYear;


const lastModified = document.getElementById("lastModified");

lastModified.textContent =
    "Last Modification: " + document.lastModified;