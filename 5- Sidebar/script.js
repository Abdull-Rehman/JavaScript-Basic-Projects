let hamburger = document.querySelector(".hamburger");
let sidebar = document.querySelector(".sidebar");
let close_btn = document.querySelector(".close-btn");

hamburger.addEventListener("click", () => {
  sidebar.classList.toggle("sidebar-active");
});

close_btn.addEventListener("click", () => {
  sidebar.classList.remove("sidebar-active");
});
