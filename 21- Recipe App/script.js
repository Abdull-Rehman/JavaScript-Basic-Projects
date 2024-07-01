const inputValue = document.querySelector(".search-bar input");
const searchBtn = document.querySelector(".search-bar button");
const recipiesList = document.querySelector(".section-center");
const blurBox = document.querySelector(".blur-box");
const closePopUpBtn = document.querySelector(".close-btn");
const message = document.querySelector(".message");

searchBtn.addEventListener("click", displayRecipies);
closePopUpBtn.addEventListener("click", () => {
  blurBox.classList.remove("show-blur-box");
});

async function displayRecipies() {
  message.classList.remove("hide-message");
  recipiesList.innerHTML = "";
  if (inputValue.value) {
    message.innerHTML = "Searching Recipies...";
    let searchedRecipe = inputValue.value;
    let recipies = await fetchData(searchedRecipe);
    if (recipies.meals) {
      updatingDom(recipies);
    } else {
      message.innerHTML = "No recipes found. Please try a different search.";
      setTimeout(() => {
        message.innerHTML = "Search Your Favourite Recipe";
      }, 2000);
    }
  } else {
    message.innerHTML = "Please Enter A Recipe Name";
    setTimeout(() => {
      message.innerHTML = "Search Your Favourite Recipe";
    }, 2000);
  }
}

function fetchData(searchedRecipe) {
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedRecipe}`;
  let recipies = fetch(url).then((Response) => Response.json());
  return recipies;
}

function updatingDom(recipies) {
  message.classList.add("hide-message");
  let meals = recipies.meals;
  meals = meals
    .map((meal) => {
      return `<div class="recipe-card">
                    <div class="image">
                        <img src=${meal.strMealThumb} alt="">
                        </div>
                        <div class="info">
                        <h3 class="recipe-name">${meal.strMeal}</h3>
                        <span class="recipe-origin">${meal.strArea} Dish</span>
                        <span class="recipe-category">${meal.strCategory}</span>
                        <button class="see-recipe-btn" data-id=${meal.idMeal}>See Recipe</button>
                        </div>
                        </div>`;
    })
    .join("");
  recipiesList.innerHTML = meals;

  const cards = document.querySelectorAll(".see-recipe-btn");
  cards.forEach((card) => {
    card.addEventListener("click", function (e) {
      openRecipePopUp(e, recipies.meals);
    });
  });
}

let openRecipePopUp = (e, recipies) => {
  let id = e.currentTarget.dataset.id;
  let recipe = recipies.filter((item) => {
    if (item.idMeal == id) {
      return item;
    }
  })[0];

  let recipeName = document.querySelector(".recipe-box .recipe-name");
  let ingredients = document.querySelector(".recipe-box .ingredients ul");
  let instructions = document.querySelector(".recipe-box .instructions p");

  recipeName.innerHTML = recipe.strMeal + " Dish";
  ingredients.innerHTML = extractIngredients(recipe);
  instructions.innerHTML = recipe.strInstructions;
  blurBox.classList.add("show-blur-box");
};

function extractIngredients(recipies) {
  let ingredientsList = [];

  for (let i = 1; i <= 20; i++) {
    let isIngPresent = data[`strIngredient${i}`] != "" ? true : false;
    if (isIngPresent) {
      let ingredient =
        recipies[`strIngredient${i}`] + " " + recipies[`strMeasure${i}`];
      ingredientsList.push(ingredient);
    } else {
      break;
    }
  }

  ingredientsList = ingredientsList
    .map((item) => {
      return `<li>${item}</li>`;
    })
    .join("");

  return ingredientsList;
}
