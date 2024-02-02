const images = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

images.forEach((img, index) => {
    img.style.left = `${index * 100}%`;
});

let counter = 0;

prevBtn.addEventListener("click", function () {
    counter--;
    transform();
})

nextBtn.addEventListener("click", function () {
    counter++;
    transform();
})

function transform() {

    // if (counter < 0) {
    //     counter = images.length - 1;
    // }
    // if (counter >= images.length) {
    //     counter = 0;
    // }

    if (counter > 0) {
        prevBtn.style.display = "block";
    }
    else {
        prevBtn.style.display = "none";
    }
    if (counter >= images.length - 1) {
        nextBtn.style.display = "none";
    }
    else {
        nextBtn.style.display = "block";
    }


    images.forEach(img => {
        img.style.transform = `translateX(-${counter * 100}%)`;
        console.log(img);
    });
}

// previous button will be hidden when load/refreshed first time
prevBtn.style.display = "none";
