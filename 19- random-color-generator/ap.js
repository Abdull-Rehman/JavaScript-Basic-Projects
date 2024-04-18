window.onload = function () {
  displayClr();
};

const refreshBtn = document.querySelector(".refreshBtn");
const containerBx = document.querySelector(".boxes-container");

for (let i = 0; i < 9; i++) {
  let newBox = document.createElement("div");
  newBox.classList.add("box");
  containerBx.appendChild(newBox);

  newBox.addEventListener("click", () => {
    navigator.clipboard.writeText(newBox.innerHTML);
    toastr.success("Now you can use it!", "Copied to clipboard", {
      timeOut: 3000,
    });
  });
}
const colorBxs = document.querySelectorAll(".box");

function genRandomClr() {
  let source = "0123456789abcdef";
  let clrLength = 6;
  let color = "";

  for (let i = 0; i < clrLength; i++) {
    let rnum = Math.floor(Math.random() * source.length);
    color += source[rnum];
  }
  return `#${color}`;
}

function displayClr() {
  colorBxs.forEach((e) => {
    let newclr = genRandomClr();
    e.innerHTML = newclr;
    e.style.backgroundColor = newclr;
  });
}

refreshBtn.addEventListener("click", displayClr);
