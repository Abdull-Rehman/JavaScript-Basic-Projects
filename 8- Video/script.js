
// adding preloader if content inlcuding (video, imgs) are not loaded yet.
let preloader = document.querySelector(".preloader");

// we will use load event listener instead of DOMContentLoaded because:
// DOMContentLoaded fires when dom is loaded, it will not wait for any picture or video to be fetched or not
// load will wait untill all the content including videos and pictures are fetched

window.addEventListener("load", function () {
    preloader.classList.add("hide-preloader");
})

let switchBtn = document.querySelector(".switch-btn");
let video = document.querySelector(".video-container");

switchBtn.addEventListener("click", function () {
    if (!switchBtn.classList.contains("active")) {
        switchBtn.classList.add("active");
        video.pause();
    }
    else {
        switchBtn.classList.remove("active");
        video.play();
    }
})