const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October", "November",
    "December"
]
const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
]

const giveaway = document.querySelector(".giveaway");
const deadlineBoxes = document.querySelectorAll(".deadline-container h4");
const deadline = document.querySelector(".deadline-container");

const futureDate = new Date(2024, 1, 12, 12, 30, 30);
const fDay = weekdays[futureDate.getDay()];
const fDate = futureDate.getDate();
const fMonth = months[futureDate.getMonth()];
const fYear = futureDate.getFullYear();
const fhours = futureDate.getHours();
const fminutes = futureDate.getMinutes();

giveaway.textContent = `Giveaway Ends On ${fDay}, ${fDate} ${fMonth} ${fYear} ${fhours}:${fminutes} am`

function calculateRemainTime() {
    // getting today date 
    // when we substract today data with future date then we will get the difference b/w them
    // we use that number(difference) to extract the remaining days, hours, minutes, seconds
    const todayDate = new Date();
    const remainingTime = futureDate.getTime() - todayDate.getTime();
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    const remainingDays = Math.floor(remainingTime / oneDay);
    const remainingHours = Math.floor((remainingTime % oneDay) / oneHour);
    const remainingMinutes = Math.floor((remainingTime % oneHour) / oneMinute)
    const remainingSeconds = Math.floor((remainingTime % oneMinute) / 1000);

    const finalReamins = [remainingDays, remainingHours, remainingMinutes, remainingSeconds];

    function format(data) {
        if (data < 10) {
            return `0${data}`
        }
        else {
            return data;
        }
    }

    deadlineBoxes.forEach((box, index) => {
        box.innerHTML = format(finalReamins[index]);
    });

    if (remainingTime < 0) {
        clearInterval(countdown);
        deadline.innerHTML = `<h3 class="expired">Sorry! the Givaway has been expired.</h3>`
    }
}

let countdown = setInterval(calculateRemainTime, 1000);

calculateRemainTime();