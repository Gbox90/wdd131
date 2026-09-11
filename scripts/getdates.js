const currentYear = new Date().getFullYear();
const yearElement = document.getElementById("currentyear");

yearElement.textContent = currentYear;


const lastModified = document.getElementById("lastModified");

lastModified.textContent =
    "Last Modification: " + document.lastModified;