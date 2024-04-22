let on = false;
let start = false;
let strictMode;
let computerTurn;
let humanTurn;
let sound = true;
let totalTurns = 1;
let round;
let humanTurnCount;

const gameContainer = document.querySelector(".simon-game");
const onBtn = document.querySelector("#on-of");
const startBtn = document.querySelector("#start");
const strictBtn = document.querySelector("#strict-btn");
const colorBoxes = document.querySelectorAll(".color-box");
const sounds = document.querySelectorAll(".sound");
const countBox = document.querySelector(".count-box");

strictBtn.addEventListener("change", () => {
  if (strictBtn.checked) {
    strictMode = true;
  } else {
    strictMode = false;
  }
});

onBtn.addEventListener("click", () => {
  if (!on) {
    on = true;
    computerTurn = true;
    humanTurn = false;
  } else {
    on = false;
    computerTurn = false;
    humanTurn = true;
  }
  gameOn();
});

startBtn.addEventListener("click", startGame);

// functions

// function to on the game
function gameOn() {
  if (on) {
    onBtn.innerHTML = "Off";
    countBox.innerHTML = "-";
    gameContainer.classList.add("on");
  }
  if (!on) {
    onBtn.innerHTML = "On";
    countBox.innerHTML = "";
    gameContainer.classList.remove("on");
  }
}

let sequence = [];
let colors = ["#a5474f", "#5ea590", "#4d5daa", "#a5944d"];
let defaultColors = ["#782c35", "#2c7865", "#2c3b78", "#786c2c"];
let flashColors = ["#ff0015", "#6cc7ac", "#5e6fc9", "#c5b161"];

// function to start the game
function startGame() {
  if (on) {
    start = true;
    round = 1;
    computerTurn = true;
    humanTurn = false;
    random();
    play();
  }
}

// function that will create 20 random numbers and push them into the sequence array
function random() {
  sequence = [];
  for (let i = 0; i < 20; i++) {
    let randomeNum = Math.floor(Math.random() * 4);
    sequence.push(randomeNum);
  }
}

// function that will decide that whoes this turn is computer or human
function play() {
  // totalTurns will count the total turns/rounds played succesfully and if completed 20 (invoke function after 20th turn)
  //    then winGame function will be invoked
  if (totalTurns > 20) {
    winGame();
  }
  // this statement will check if the it is the computer turn and also start is true then it will remove events from color boxes
  //because we need these events when it is human turn and else statement will add events to the color buttons/boxes
  if (computerTurn && start) {
    removeevents();
    playComputer();
  } else if (humanTurn && start) {
    addevents();
  }
}

// function to add events on the color boxes/buttons
function addevents() {
  colorBoxes.forEach((btn) => {
    btn.addEventListener("click", playHuman);
    btn.style.cursor = "pointer";
  });
}

// function to remove events on the color boxes/buttons
function removeevents() {
  colorBoxes.forEach((btn) => {
    btn.removeEventListener("click", playHuman);
    btn.style.cursor = "context-menu";
  });
}

// this functin will call when there is computer turn
function playComputer() {
  countBox.innerHTML = round;
  let i = 0;
  //setting inverval untill the value of i is less than round, means we press buttons in a round is one minus round
  let intervaId = setInterval(() => {
    if (i < round) {
      pressBtn(sequence[i++]);
    } else {
      // setting conditions so that control given to the human
      computerTurn = false;
      humanTurn = true;
      humanTurnCount = 0;
      clearInterval(intervaId);
      // it will take us to the play function where computer will again choose whose turn it is.
      play();
    }
  }, 700);
}

// it is the function to press the buttons and produce sound on pressing button aslo changing the colors and restoring them
function pressBtn(id) {
  colorBoxes[id].style.backgroundColor = colors[id];
  setTimeout(() => {
    colorBoxes[id].style.backgroundColor = defaultColors[id];
  }, 500);

  if (sound) {
    sounds[id].play();
  }
  sound = true;
}

// this function will run when the turn is computer
function playHuman(btn) {
  // the parameter is the pressed button we have to extract id/button number from this dive
  let id = btn.currentTarget.dataset.id;

  // checking if the pressed box is the same box pressed by computer in its turn
  // in simple words we will compare the pressed button id/number with the sequence array using the humanTurnCount counter
  if (check(id)) {
    //press button if conditin(means pressed button is the same button in the array at same index)
    pressBtn(id);
    // increment humanturncount means if we press button once it is humanturncount =1, if two times then 2 and so on
    humanTurnCount++;
    if (humanTurnCount >= round) {
      round++;
      totalTurns++;
      humanTurn = false;
      computerTurn = true;
      setTimeout(() => {
        play();
      }, 300);
    }
  } else {
    // if return false then we press button and again invoke play (this turn will be computer)
    pressBtn(id);
    // checking if the strict mode is on then starting from round 0
    if (strictMode) {
      totalTurns = 1;
      round = 1;
    }
    play();
  }
}

function check(id) {
  // checking if the both buttons pressed and from the array are not same then flash all the
  // buttons and unflash them after 0.5s (500ms) also return false
  if (id != sequence[humanTurnCount]) {
    flashLight();
    sound = false;
    humanTurn = false;
    computerTurn = true;
    setTimeout(() => {
      notFlashLight();
    }, 500);
    return false;
  } else {
    // if both buttons are same then return true
    return true;
  }
}

function flashLight() {
  for (let i = 0; i < 4; i++) {
    colorBoxes[i].style.backgroundColor = flashColors[i];
  }
}

function notFlashLight() {
  for (let i = 0; i < 4; i++) {
    colorBoxes[i].style.backgroundColor = defaultColors[i];
  }
}

function winGame() {
  computerTurn = false;
  humanTurn = true;
  sound = true;
  totalTurns = 1;
  round = 1;
  start = false;
  removeevents();
  countBox.innerHTML = "Win!";
}
