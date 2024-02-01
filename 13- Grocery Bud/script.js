// selecting elements
const alert = document.querySelector(".alert");
const input = document.querySelector(".grocery");
const submit = document.querySelector(".submit");
const listContainer = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// editing variables
let editElement;
let editFlag = false;
let editId = '';

// **** adding event listeners ****
submit.addEventListener("click", Additem);
clearBtn.addEventListener("click", clearItems);
window.addEventListener("DOMContentLoaded", loadcontent);

// **** functions ****
// add new item function
function Additem(e) {
    e.preventDefault();
    const value = input.value;
    // we are setting id so that we can use it to handle the element in local storage
    const id = new Date().getTime().toString();

    if (value && !editFlag) {

        // invoked function to create list item
        createListItem(id, value);

        // display alert
        displayAlert("Atem added to the list", "success");

        // show container
        listContainer.classList.add("show-container");

        // add to the local storage
        addToLocalStorage(id, value);

        // setting things back to default
        setBackToDefault();
    }
    else if (value && editFlag) {
        editElement.innerHTML = value;
        displayAlert("Value changed", "success");
        editLocalStorage(editId, value);
        setBackToDefault();
    }
    else {
        displayAlert("please enter a value", "danger");
    }
}

// edit item function
function editItem(item) {
    // target the article to get id(data-id)
    const element = item.currentTarget.parentElement.parentElement;
    // select edite item value
    editElement = item.currentTarget.parentElement.previousElementSibling;
    // display the value in input box
    input.value = editElement.innerHTML;
    submit.textContent = "Edit";

    // set the flag true so that the else if statement execute when we enter/submit
    editFlag = true;

    // set id
    editId = element.dataset.id;
}

// delete item function
function deleteItem(item) {
    const element = item.currentTarget.parentElement.parentElement;
    list.removeChild(element);

    // if the no. of items become 0 then hidding the grocery-container
    if (list.children.length === 0) {
        listContainer.classList.remove("show-container");
    }
    displayAlert("Item removed", "danger");

    const id = element.dataset.id;
    deleteItemFromLocalStorage(id);
    setBackToDefault();
}

// clear all items funciton
function clearItems() {
    list.innerHTML = "";
    listContainer.classList.remove("show-container");
    displayAlert("empty list", "danger");
    localStorage.removeItem("list");
    setBackToDefault();

    // we can also do the same by following
    // const items = document.querySelectorAll(".grocery-item");
    // if (items.length > 0) {
    //     items.forEach(function (item) {
    //         list.removeChild(item);
    //     });
    // }
    // container.classList.remove("show-container");
}

// display alert funciotn
function displayAlert(message, type) {
    alert.innerHTML = message;
    alert.classList.add(`alert-${type}`);

    // removing the alert
    setTimeout(() => {
        alert.classList.remove(`alert-${type}`);
    }, 1000);
}

// setting things back to default function
function setBackToDefault() {
    input.value = "";
    editFlag = false;
    editID = "";
    submit.innerHTML = "Submit";
}


// **** local storage ****
// adding grocery item to local storage
function addToLocalStorage(id, value) {
    const grocery = { id, value };
    const items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem("list", JSON.stringify(items));
}

// editing item value form local storage
function editLocalStorage(id, value) {
    let items = getLocalStorage();

    items = items.map(item => {
        if (item.id === id) {
            item.value = value;
        }
        return item;
    })

    localStorage.setItem("list", JSON.stringify(items));
}

// deleting item from local storage
function deleteItemFromLocalStorage(id) {
    let items = getLocalStorage();
    items = items.filter(item => {
        if (item.id !== id) {
            return item;
        }
    });
    localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
    return localStorage.getItem("list")
        ? JSON.parse(localStorage.getItem("list"))
        : [];
}

// setting up data when refreshed or loaded
function loadcontent() {
    let items = getLocalStorage();

    if (items.length > 0) {
        items.forEach(item => {
            createListItem(item.id, item.value);
        });
        listContainer.classList.add("show-container");
    }
}

function createListItem(id, value) {
    const element = document.createElement("Article");
    element.classList.add("grocery-item");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `<p class="item-title">${value}</p>
        <div class="btn-container">
          <button class="edit-btn">
            <i class="fa-solid fa-edit"></i>
          </button>
          <button class="delete-btn">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>`;

    // appeding the element into the container
    list.appendChild(element);
    // targeting editBtn and adding event listener
    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);
    // targeting deleteBtn and adding event listener
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
}