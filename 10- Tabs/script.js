const tabs = document.querySelectorAll(".btn-tab");
const container = document.querySelector(".section-center");
const infoBoxes = document.querySelectorAll(".info");

container.addEventListener("click", e => {
    const target = e.target;
    const id = target.dataset.id;
    if (id) {

        tabs.forEach(tab => {
            tab.classList.remove("active");
        });
        target.classList.add("active");

        infoBoxes.forEach(infoBoxe => {
            infoBoxe.classList.remove("active");
        });
        const element = document.getElementById(id);
        element.classList.add("active");
    }
})