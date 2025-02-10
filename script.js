const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#inputBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetails = document.querySelector(".recipe-details");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");
const detailsRecipe = document.querySelector(".recipe-detailsRecipe");
const loader = document.querySelector(".loader");

// Fetching Data from the API
const FetchData = async (query) => {
  recipeContainer.innerHTML = "Fetching Data...";
  loader.style.display = "none";

  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const response = await data.json();

  const recipes = response.meals;

  //  Displaying the recipes............

  recipeContainer.innerHTML = "";
  recipes.forEach((res) => {
      // console.log(res.strMeal);
      const recipe = document.createElement("div");
      recipe.classList.add("recipe");
      recipe.innerHTML = `
    
      <div class="img"><img src="${res.strMealThumb}" alt="${res.strMeal}" /></div>
      <h3>Food Type:<span> ${res.strMeal}</span></h3>
      <p>Belongs To: <span> ${res.strArea}</span></p>
      <p>Category: <span> ${res.strCategory}</span></p>
      
      
 
    `;
      // Creating a button to view the recipe details
      const button = document.createElement("button");
      button.classList.add("view-recipe");
      button.innerText = "View Recipe";
      recipe.appendChild(button);
      // Adding Eventlistener to the button
      button.addEventListener("click", () => {
        recipeDetails.style.display = "block";
        showdata(res);
      });
      recipeContainer.appendChild(recipe);
    })
    
};

// Function to show the recipe details
function showdata(recipe) {
  recipeDetails.style.display = "block";
  // console.log(recipe.strInstructions);

  // Displaying the recipe details
  detailsRecipe.innerHTML = `
      <div class="recipe-details-content">
      <h2 id="heading">${recipe.strMeal}</h2>

      <h3>Instructions:</h3>
      <hr>
      <p>${recipe.strInstructions}</p>
      <h3>Ingredients:</h3>
      <hr>

      <ul>
      
      <li>${recipe.strIngredient1}</li>
      <li>${recipe.strIngredient2}</li>
      <li>${recipe.strIngredient3}</li>
      <li>${recipe.strIngredient4}</li>
      <li>${recipe.strIngredient5}</li>
      </ul>
      </div>
  `;
}

// Eventlistener to close the recipe details section

recipeCloseBtn.addEventListener("click", (el) => {
  el.preventDefault();
  recipeDetails.style.display = "none";
  console.log("clicked");
});

// Eventlistener for the search button
searchBtn.addEventListener("click", (el) => {
  el.preventDefault();
  let searchInp = searchInput.value;

  FetchData(searchInp);
});



// side Bar section script...
const sideBar = document.querySelector(".side-bar");
const navigation = document.querySelector(".navigation");
const closeSideBtn = document.querySelector(".side-close-btn");
navigation.addEventListener("click", () => {
  sideBar.style.transform = "translateX(-250px)";
  // console.log("clicked"); 
})
closeSideBtn.addEventListener("click", () => {
  sideBar.style.transform = "translateX(0)";
  // console.log("clicked");
})
