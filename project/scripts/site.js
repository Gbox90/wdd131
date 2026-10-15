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



if (menuButton && navigation) {
    menuButton.addEventListener("click", toggleMenu);
}


function displayCurrentYear() {
    const yearElement = document.querySelector("#currentyear");

    if (yearElement) {
        yearElement.textContent = `${new Date().getFullYear()}`;
    }
}

displayCurrentYear();


const quizQuestions = [
    {
        question: "How many points are usually needed to win a game?",
        answers: ["5 points", "11 points", "20 points"],
        correctAnswer: 1,
        explanation: "Most standard pickleball games are played to 11 points, and you must win by two."
    },
    {
        question: "What is the kitchen?",
        answers: [
            "The area behind the baseline",
            "The non-volley zone near the net",
            "The space outside the court"
        ],
        correctAnswer: 1,
        explanation: "The kitchen is the non-volley zone extending seven feet from the net."
    },
    {
        question: "What does the two-bounce rule require?",
        answers: [
            "The ball must bounce twice on the same side",
            "The ball must bounce once on each side before volleying",
            "Every shot must bounce before being returned"
        ],
        correctAnswer: 1,
        explanation: "The serve and the return must each bounce before players can volley."
    },
    {
        question: "In traditional scoring, who can earn a point?",
        answers: [
            "Only the serving team",
            "Only the receiving team",
            "Both teams after every rally"
        ],
        correctAnswer: 0,
        explanation: "In traditional side-out scoring, only the serving team can earn points."
    }
];


let currentQuestion = 0;
let quizScore = 0;

const quizQuestion = document.querySelector("#quiz-question");
const quizAnswers = document.querySelector("#quiz-answers");
const quizProgress = document.querySelector("#quiz-progress");
const quizFeedback = document.querySelector("#quiz-feedback");

const nextButton = document.querySelector("#next-question");
const restartButton = document.querySelector("#restart-quiz");


function displayQuestion() {
    const current = quizQuestions[currentQuestion];

    quizQuestion.textContent = current.question;

    quizProgress.textContent =
        `Question ${currentQuestion + 1} of ${quizQuestions.length}`;

    quizAnswers.innerHTML = "";
    quizFeedback.textContent = "";

    nextButton.hidden = true;

    current.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.type = "button";
        button.classList.add("answer-button");
        button.textContent = answer;

        button.addEventListener("click", () => {
            checkAnswer(index);
        });

        quizAnswers.appendChild(button);
    });
}


function checkAnswer(selectedIndex) {
    const current = quizQuestions[currentQuestion];

    const isCorrect = selectedIndex === current.correctAnswer;

    if (isCorrect) {
        quizScore++;

        quizFeedback.textContent =
            `Correct! ${current.explanation}`;
    } else {
        quizFeedback.textContent =
            `Not quite! ${current.explanation}`;
    }

    const answerButtons = quizAnswers.querySelectorAll("button");

    answerButtons.forEach((button) => {
        button.disabled = true;
    });

    nextButton.hidden = false;
}


function showNextQuestion() {
    currentQuestion++;

    if (currentQuestion < quizQuestions.length) {
        displayQuestion();
    } else {
        displayResults();
    }
}


function displayResults() {
    quizProgress.textContent = "Quiz Complete!";

    quizQuestion.textContent =
        `You scored ${quizScore} out of ${quizQuestions.length}!`;

    quizAnswers.innerHTML = "";

    if (quizScore === quizQuestions.length) {
        quizFeedback.textContent =
            "Amazing! You've mastered the basics!";
    } else {
        quizFeedback.textContent =
            "Nice work! Review the rules and try again to improve your score.";
    }

    nextButton.hidden = true;
    restartButton.hidden = false;
}


function restartQuiz() {
    currentQuestion = 0;
    quizScore = 0;

    restartButton.hidden = true;

    displayQuestion();
}


if (quizQuestion && quizAnswers && quizProgress &&
    quizFeedback && nextButton && restartButton) {

    nextButton.addEventListener("click", showNextQuestion);

    restartButton.addEventListener("click", restartQuiz);

    displayQuestion();
}


const checklistForm = document.querySelector("#checklist-form");
const checklistResult = document.querySelector("#checklist-result");
const personalizedList = document.querySelector("#personalized-list");
const clearChecklistButton = document.querySelector("#clear-checklist");


function createChecklist(preferences) {
    const checklist = [
        "Wear comfortable court shoes with good support.",
        "Bring water to stay hydrated.",
        "Wear comfortable clothing.",
        "Arrive early to warm up."
    ];

    if (preferences.experience === "new") {
        checklist.push("Review the basic rules and scoring.");
    } else {
        checklist.push("Practice your serves and returns.");
    }

    if (preferences.location === "indoor") {
        checklist.push("Bring indoor pickleballs.");
    } else if (preferences.location === "outdoor") {
        checklist.push("Bring outdoor pickleballs and consider sun protection.");
    } else {
        checklist.push("Check whether your court is indoors or outdoors.");
    }

    if (preferences.paddle === "no") {
        checklist.push("Borrow or purchase a beginner pickleball paddle.");
    } else {
        checklist.push("Pack your pickleball paddle.");
    }

    return checklist;
}


function displayChecklist(preferences) {
    const checklist = createChecklist(preferences);

    personalizedList.innerHTML = "";

    checklist.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item}`;
        personalizedList.appendChild(listItem);
    });

    checklistResult.hidden = false;
}


function savePreferences(preferences) {
    localStorage.setItem(
        "pickleballPreferences",
        JSON.stringify(preferences)
    );
}


function handleChecklistSubmit(event) {
    event.preventDefault();

    const formData = new FormData(checklistForm);

    const preferences = {
        experience: formData.get("experience"),
        location: formData.get("location"),
        paddle: formData.get("paddle")
    };

    savePreferences(preferences);
    displayChecklist(preferences);
}


function loadPreferences() {
    const savedPreferences = localStorage.getItem(
        "pickleballPreferences"
    );

    if (savedPreferences) {
        const preferences = JSON.parse(savedPreferences);

        const experienceOption = checklistForm.querySelector(
            `input[name="experience"][value="${preferences.experience}"]`
        );

        const paddleOption = checklistForm.querySelector(
            `input[name="paddle"][value="${preferences.paddle}"]`
        );

        const locationSelect = document.querySelector("#playing-location");

        if (experienceOption) {
            experienceOption.checked = true;
        }

        if (paddleOption) {
            paddleOption.checked = true;
        }

        if (locationSelect) {
            locationSelect.value = preferences.location;
        }

        displayChecklist(preferences);
    }
}


function resetChecklist() {
    localStorage.removeItem("pickleballPreferences");

    checklistForm.reset();

    personalizedList.innerHTML = "";

    checklistResult.hidden = true;
}


if (checklistForm && checklistResult &&
    personalizedList && clearChecklistButton) {

    checklistForm.addEventListener(
        "submit",
        handleChecklistSubmit
    );

    clearChecklistButton.addEventListener(
        "click",
        resetChecklist
    );

    loadPreferences();
}

