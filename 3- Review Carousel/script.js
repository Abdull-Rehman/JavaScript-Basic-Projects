let xhttp = new XMLHttpRequest();
let data = [];

xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    data = JSON.parse(this.responseText);
  }
};

xhttp.open("GET", "./links.json", false);
xhttp.send();

let pic = document.querySelector("#picture");
let person_name = document.querySelector(".name-box");
let title = document.querySelector(".title");
let info = document.querySelector(".info");
let left_btn = document.querySelector(".left-button");
let right_btn = document.querySelector(".right-button");
let surprise_btn = document.querySelector(".surprise-button");
let id = 0;

function updateData(id) {
  pic.src = data[id].pic;
  person_name.innerHTML = data[id].name;
  title.innerHTML = data[id].title;
  info.textContent = data[id].info;
}

right_btn.addEventListener("click", () => {
  id++;
  if (id > data.length - 1) {
    id = 0;
  }
  updateData(id);
});

left_btn.addEventListener("click", () => {
  id--;
  if (id < 0) {
    id = data.length - 1;
  }
  updateData(id);
});
