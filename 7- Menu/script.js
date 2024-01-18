// fetching data using XMLHttpRequest
let xhhtp = new XMLHttpRequest();
let menu;
xhhtp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    menu = this.responseText;
    menu = JSON.parse(menu);
  }
}
xhhtp.open("GET", "./data.json", false);
xhhtp.send();

window.addEventListener("DOMContentLoaded", function () {
  displayItems(menu);
  displayFilterButtons();
})

// targeting items container
let itemsContainer = document.querySelector(".menu-items");

// writing functions that will display the items in the items container
// it will take the argument that contains the items to display
function displayItems(menuItems) {
  let displayMenu = menuItems.map(function (item) {
    return `<article class = "menu-item">
    <img src= ${item.img} class="photo" alt=${item.category} />
    <div class="info">
      <div class="header">
        <h4 class="name">${item.title}</h4>
        <h4 class="price">${item.price}</h4>
      </div>
      <p class="item-text">
        ${item.desc}
      </p>
    </div>
  </article>`
  });

  // join function will convert the multiple strings into one string by removing ,
  displayMenu = displayMenu.join("");
  itemsContainer.innerHTML = displayMenu;
}

// targeting filter button container
let filterBtnsContainer = document.querySelector(".filter-buttons");

// writing function that will do the following tasks:
// 1- filtering and making an array of unique categories
// 2- displaying the filtered category buttons in the filter button container
// 3- 
function displayFilterButtons() {
  // making array of unique categories
  let filterBTns = menu.reduce(function (values, item) {
    if (!values.includes(item.category)) {
      values.push(item.category)
    }
    return values;
  }, ["All"])

  // displaying buttons in buttons container
  filterBTns = filterBTns.map(function (btn) {
    let btnHtml = `<button class="filter-button" data-id=${btn}>${btn}</button>`
    return btnHtml;
  }).join("");

  filterBtnsContainer.innerHTML = filterBTns;

  // functionality of filter buttons
  // targeting all filter buttons (we are selecting buttons after creating them in dom)
  let filterBtns = document.querySelectorAll(".filter-button");

  // traversing each button
  filterBtns.forEach(function (btn) {

    // adding event listener to each button
    btn.addEventListener("click", (e) => {
      let category = e.currentTarget.dataset.id;
      let filteredItems = menu.filter(function (item) {
        if (category === item.category) {
          return item;
        }
      });

      if (category === "All") {
        displayItems(menu);
      }
      else {
        displayItems(filteredItems);
      }

    })
  })

}