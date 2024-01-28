
// working of hamburger with navbar
// we will make the height of the navbar dynamic accordint the the links in it
const hamburger = document.querySelector(".nav-toggle");
const navbarContainer = document.querySelector(".navbarContainer");
const navbar = navbarContainer.querySelector(".navbar");

hamburger.addEventListener("click", function () {
    navbarConHeight = navbarContainer.getBoundingClientRect().height;
    navbarHeight = navbar.getBoundingClientRect().height;

    if (navbarConHeight == 0) {
        navbarContainer.style.height = `${navbarHeight}px`;
    }
    else {
        navbarContainer.style.height = 0;
    }
})

// making the navbar fixed
// handling the display of toplink
const nav = document.querySelector(".nav");
window.addEventListener("scroll", function () {
    const scrollHeight = window.scrollY;
    const navHeight = nav.getBoundingClientRect().height;

    if (scrollHeight > navHeight) {
        nav.classList.add("fixed-nav");
    }
    else {
        nav.classList.remove("fixed-nav");
    }


    // handling the top-link button
    const topLinkbtn = document.querySelector(".top-link");
    if (scrollHeight > 500) {
        topLinkbtn.classList.add("display");
    }
    else {
        topLinkbtn.classList.remove("display");
    }

})

// controling the scroling effect of buttons

const scrlBtns = document.querySelectorAll(".scrol-btns");
scrlBtns.forEach(function (btn) {
    btn.addEventListener("click", (e) => {
        e.preventDefault();

        // we will handel 3 situations
        // 1- if the navbar is fixed
        // 2- if the navbar is not fixed
        // 3- if the navbar opened/dropdown

        const id = e.currentTarget.getAttribute("href").slice(1);
        const sectionTopHeight = document.getElementById(id).offsetTop;
        const navHeight = document.querySelector(".nav").getBoundingClientRect().height;
        const navfixed = document.querySelector(".nav").classList.contains("fixed-nav");
        const navlinksHeight = document.querySelector(".navbarContainer").getBoundingClientRect().height;

        // 1- position of element from top if the navbar is fixed
        let position = sectionTopHeight - navHeight;

        // 2- position of element from top if the navbar is Not-fixed 
        if (!navfixed) {
            position = position - navHeight;
        }

        // 1- position of element from top if the navbar is epened/dropdowned
        // if don't understand the how scrolling is working the comment the last line in this scpe and then try to unsertsand
        // last line is: navbarContainer.style.height = 0;
        if (navHeight > 82) {
            position += navlinksHeight;
        }

        window.scrollTo({
            top: position,
            left: 0,
        })

        navbarContainer.style.height = 0;
    })
})