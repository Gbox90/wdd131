
const params = new URLSearchParams(window.location.search);

const product = params.get("product");
const rating = params.get("rating");
const installation = params.get("installation");

const confirmationTitle =
    document.querySelector("#confirmation-title");

const confirmationMessage =
    document.querySelector("#confirmation-message");

const reviewCounter =
    document.querySelector("#review-counter");

if (product && rating && installation) {
    let count = Number(localStorage.getItem("reviewCount")) || 0;

    count += 1;

    localStorage.setItem("reviewCount", count);

    confirmationTitle.textContent = "Great Scott!";

    confirmationMessage.textContent =
        "Your review has successfully traveled through time!";

    reviewCounter.textContent =
        `Total reviews submitted: ${count}`;
} else {
    confirmationTitle.textContent = "No Review Submitted";

    confirmationMessage.textContent =
        "Please complete the product review form first.";

    reviewCounter.textContent = "";
}

document.querySelector("#currentyear").textContent =
    new Date().getFullYear();

document.querySelector("#lastModified").textContent =
    `Last Modified: ${document.lastModified}`;
