// selecting number boxes
const hoursBx = document.querySelector("#hours-bx");
const minutesBx = document.querySelector("#minutes-bx");
const secondsBx = document.querySelector("#seconds-bx");
const zoneBx = document.querySelector(".zone");

function includeZero(time) {
  if (time.toString().length < 2) {
    return `0${time}`;
  } else {
    return time;
  }
}

function calculateHours(time) {
  if (time >= 12) {
    time = Math.ceil(time / 12 + 1);
  }

  return includeZero(time);
}

function setZone(time) {
  if (time >= 12) {
    return "PM";
  } else {
    return "AM";
  }
}

setInterval(() => {
  let day = new Date();

  let hours = day.getHours();
  let minutes = day.getMinutes();
  let seconds = day.getSeconds();

  hoursBx.innerHTML = calculateHours(hours);
  minutesBx.innerHTML = includeZero(minutes);
  secondsBx.innerHTML = includeZero(seconds);
  zoneBx.innerHTML = setZone(hours);
}, 500);
