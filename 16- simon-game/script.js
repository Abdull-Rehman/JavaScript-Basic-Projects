let playerOrder = [];
let botOrder = [];
let on;
let strict = false;
let compTurn;
let flash;
let round;
let win = false;
let noise = true;
let intervalId;
let lightColors = ["lightgreen", "tomato", "yellow", "lightskyblue"];
let darkColors = ["darkgreen", "darkred", "goldenrod", "darkblue"];

// selecting elements
const rgbyBtns = document.querySelectorAll(".boxe");
const startBtn = document.querySelector(".start-btn");
const powerBtn = document.querySelector(".power-btn");
const strictBtn = document.querySelector(".strict-btn");
const roundBox = document.querySelector(".turn");

// adding eventListeners

strictBtn.addEventListener("click", () => {
    strictBtn.classList.toggle("on");
    if (strictBtn.classList.contains("on")) {
        strict = true;
    }
    else {
        strict = false;
    }
})

powerBtn.addEventListener("click", () => {
    powerBtn.classList.toggle("on");
    if (powerBtn.classList.contains("on")) {
        on = true;
        roundBox.innerHTML = "-";
    }
    else {
        on = false;
        roundBox.innerHTML = "";
    }
})

startBtn.addEventListener("click", () => {
    if (on || win) {
        play();
    }
})

function play() {
    win = false;
    playerOrder = [];
    botOrder = [];
    flash = 0;
    round = 1;
    intervalId = "";
    good = true;
    compTurn = true;
    roundBox.innerHTML = 1;

    for (var i = 0; i < 20; i++) {
        botOrder.push(Math.floor(Math.random() * 4 + 1));
    }
    intervalId = setInterval(botTurn, 1000);
}

function botTurn() {
    on = false;

    if (flash == round) {
        clearInterval(intervalId);
        clearColor();
        compTurn = false;
        on = true;
    }

    if (compTurn) {
        clearColor();
        let index = botOrder[flash];
        pressBtn(index);
        flash++;
    }
}

function pressBtn(index) {
    if (noise) {
        let audio = document.getElementById(`clip${index}`);
        audio.play();
        rgbyBtns[index - 1].style.backgroundColor = lightColors[index - 1];
    }
    noise = true;
}

function clearColor() {
    for (var i = 0; i < 4; i++) {
        rgbyBtns[i].style.backgroundColor = darkColors[i];
    }
}

function flashColor() {
    for (var i = 0; i < 4; i++) {
        rgbyBtns[i].style.backgroundColor = lightColors[i];
    }
}

rgbyBtns.forEach((btn, index) => {

    btn.addEventListener("click", () => {
        if (on) {
            playerOrder.push(index + 1);
            check();
            pressBtn(index + 1);
            if (!win) {
                setTimeout(() => {
                    clearColor();
                }, 300);
            }
        }
    })

});

function check() {
    if (playerOrder[playerOrder.length - 1] !== botOrder[playerOrder.length - 1])
        good = false;

    if (!good) {
        flashColor();
        roundBox.innerHTM = "NO!";
        setTimeout(() => {
            roundBox.innerHTML = round;
            clearColor();

            if (strict) {
                play();
            }
            else {
                compTurn = true;
                flash = 0;
                playerOrder = [];
                good = true;
                intervalId = setInterval(botTurn, 1000);
            }
        }, 800);
        noise = false;
    }

    if (round == playerOrder.length && good && !win) {
        round++;
        playerOrder = [];
        flash = 0;
        compTurn = true;
        roundBox.innerHTML = round;
        intervalId = setInterval(botTurn, 1000);
    }

    if (playerOrder.length == 20 && good) winGame();
}

function winGame() {
    flashColor();
    roundBox.innerHTML = "WIN!";
    on = false;
    win = true;
}