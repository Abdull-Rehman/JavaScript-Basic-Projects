const userCount_div = document.querySelector(".userWin-value");
const compCount_div = document.querySelector(".compWin-value");
const userMove = document.querySelector(".user-move");
const compMove = document.querySelector(".comp-move");
const movBtns = document.querySelectorAll(".move-btn");
const result = document.querySelector(".result h3");
const moods = {
    'happy': '<i class="fa-solid fa-face-laugh-beam"></i>',
    'sad': '<i class="fa-solid fa-face-sad-tear"></i>',
    'normal': '<i class="fa-solid fa-face-rolling-eyes"></i>'
}
let userCount = 0;
let compCount = 0;

movBtns.forEach(btn => {
    btn.addEventListener("click", playGame)
});

function getUserChoice() {
    const choices = ["r", "p", "s"];
    const random = Math.floor(Math.random() * 3);
    return choices[random];
}

function displayChoices(userChoice, CompChoice) {
    const choices = {
        'r': '<i class="fa-solid fa-hand-back-fist"></i>',
        'p': '<i class="fa-solid fa-hand"></i>',
        's': '<i class="fa-solid fa-hand-scissors"></i>'
    }

    userMove.innerHTML = choices[userChoice];
    compMove.innerHTML = choices[CompChoice];
}

function setResult(status, value, userMood, compMood) {
    result.innerHTML = value;

    setTimeout(() => {
        userMove.innerHTML = moods[userMood];
        compMove.innerHTML = moods[compMood];
        result.classList.add(status);
    }, 800);

    setTimeout(() => {
        result.classList.remove(status);
    }, 1500);

}

function youWin() {
    userCount++;
    userCount_div.innerHTML = userCount;
    setResult("win", "You win!", "happy", "sad");
}

function youLost() {
    compCount++;
    compCount_div.innerHTML = compCount;
    setResult("lose", "You Lost!", "sad", "happy");
}

function draw() {
    setResult("draw", "Match Draw!", "normal", "normal");
}

function playGame(e) {
    const userChoice = e.currentTarget.dataset.id;
    const CompChoice = getUserChoice();

    displayChoices(userChoice, CompChoice);

    switch (userChoice + CompChoice) {
        case "rs":
        case "sp":
        case "pr":
            youWin();
            break;
        case "sr":
        case "ps":
        case "rp":
            youLost();
            break;
        case "rr":
        case "pp":
        case "ss":
            draw();
            break;
    }
}