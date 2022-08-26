const featuredCocktails = document.getElementById("featured-cocktails-menu")
const form = document.getElementById("song-form")
const featuredCocktailsContainer = document.getElementById("featured-container")
const featuredCocktailNav = document.getElementById("featured-cocktail-nav")
const formDrinkContainer = document.querySelector(".form-drink")
const formInput = document.getElementById("form-input")
const formDrinkCard = document.querySelector("#form-drink-card")
const formDrinkName = document.getElementById("form-drink-name")
const formDrinkImage = document.getElementById("form-drink-image")
const formDrinkInstructions = document.getElementById("form-drink-instructions")
const toggle = document.getElementById("toggle")
const body = document.body
const moods = document.getElementById("dropdown")
let moodSelection = document.querySelectorAll("a")
let moodSelector = document.querySelector(".dropdown-content")
const fullMenu = document.querySelector(".full-drink-menu")
const allDrinks = document.getElementById("all-drink-items")

document.addEventListener("DOMContentLoaded", displayDrinks()) // calling displayDrinks function once DOM has loaded - will display five random drinks

// Blackout button
toggle.addEventListener("input", (e) => {
  const isChecked = e.target.checked

  if(isChecked) {
    body.classList.add("dark-theme")
  } else {
    body.classList.remove("dark-theme")
  }
})

// event listener attached to the form
form.addEventListener("submit", (e) => { // on submit...
  e.preventDefault()
  pourMyDrink("form")
  formDrinkName.innerText = `The ${formInput.value} Cocktail` // taking the user input and making that the cocktail name
  })

// event listener attached to the moods dropdown
moodSelector.addEventListener("click", (e) => {
  pourMyDrink()
})

// pick a mood dropdown
function moodFunction() {
  document.getElementById("dropdown").classList.toggle("show")
}

function displayDrinks() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail")
  .then(res => res.json())
  .then(data => {
    let drinksArray = data.drinks
    const shuffledArray = drinksArray.sort(()=>0.5 - Math.random())
    let randomElement0 = shuffledArray.slice(0,5)
    randomElement0.forEach(randomElement => { //grab 5 drinks

      let drinkName = document.createElement("h5") // creates an element for each drink's name
      featuredCocktails.append(featuredCocktailNav) //add individual cocktail elements to the cocktails menu

      let individualFeaturedCocktail = document.createElement("div") // creates a div for each featured cocktail
      individualFeaturedCocktail.setAttribute("id", "individual-featured-cocktail") // assigns an id for each featured cocktail
      featuredCocktailsContainer.append(individualFeaturedCocktail) // appends each featured cocktail to the full featured cocktails div
  
      drinkName.setAttribute("id", "drink-name") // assigns an id for the individual drink names
      drinkName.innerText = randomElement.strDrink  // sets the text for the individual drink names
      individualFeaturedCocktail.append(drinkName) // appends each drink name to the individual cocktails div
  
      let drinkImage = document.createElement("img") // creates an <img> for each individual drink
      drinkImage.setAttribute("id", "featured-drink-image") // sets the id
      drinkImage.src = randomElement.strDrinkThumb // grabs the source for each <img> from the API
      individualFeaturedCocktail.append(drinkImage) // apends each drink image to the individual cocktails div
      
      individualFeaturedCocktail.addEventListener("mouseover", () => { // when the mouse hovers over each featured cocktail...
        individualFeaturedCocktail.style.boxShadow = "6px 10px 14px 6px rgb(255,27,187)" // changes the card shadow
      })

      individualFeaturedCocktail.addEventListener("mouseout", () => { // when the mouse leaves each featured cocktail...
        individualFeaturedCocktail.style.boxShadow = "0px 4px 8px 0px rgba(0,0,0,0.2)" // goes back to normal
      })

      individualFeaturedCocktail.addEventListener("click", () => { // when a featured cocktail is clicked...
        displayDrinkDetails(randomElement.idDrink) // the displayDrinkDetails function is called which will show the drink ingredients + recipe
      })
    // } 
  })
})
}

function displayDrinkDetails(id) { // will display the featured drink's ingredients + recipe
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
  .then(res => res.json())
  .then(data => {
    let drinkRecipe = document.querySelector("#details")
    
    // if else based on how many ingredients are listed in the API
    if(data.drinks[0].strIngredient3 == null){
      drinkRecipe.innerText = `You will need ${data.drinks[0].strIngredient1} and ${data.drinks[0].strIngredient2}. ${data.drinks[0].strInstructions}` 
      // individualFeaturedCocktail.append(drinkRecipe)
    } else if(data.drinks[0].strIngredient4 == null){
      drinkRecipe.innerText = `You will need ${data.drinks[0].strIngredient1}, ${data.drinks[0].strIngredient2} and ${data.drinks[0].strIngredient3}. ${data.drinks[0].strInstructions}` 
      // individualFeaturedCocktail.append(drinkRecipe)
    } else {
      drinkRecipe.innerText = `You will need ${data.drinks[0].strIngredient1}, ${data.drinks[0].strIngredient2}, ${data.drinks[0].strIngredient3} and ${data.drinks[0].strIngredient4}. ${data.drinks[0].strInstructions}` 
      // individualFeaturedCocktail.append(drinkRecipe)
    }
  })
}

function pourMyDrink(form) {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php") // fetching API that provides one random drink
  .then(res => res.json())
  .then(data => {
    // function to populate the form with drink details and instructions
    let formDrink = data.drinks[0] // assigning a variable to the one drink
    if(!form) {
      formDrinkName.innerText = `Cheers! Have ${data.drinks[0].strDrink}:`
    }
    formDrinkImage.src = formDrink.strDrinkThumb // setting image source
    // if else based on how many ingredients are listed in the API
    if(data.drinks[0].strIngredient3 == null){
      formDrinkInstructions.innerText = `You will need ${data.drinks[0].strIngredient1} and ${data.drinks[0].strIngredient2}. ${data.drinks[0].strInstructions}` 
    } else if(data.drinks[0].strIngredient4 == null){
      formDrinkInstructions.innerText = `You will need ${data.drinks[0].strIngredient1}, ${data.drinks[0].strIngredient2} and ${data.drinks[0].strIngredient3}. ${data.drinks[0].strInstructions}` 
    } else {
      formDrinkInstructions.innerText = `You will need ${data.drinks[0].strIngredient1}, ${data.drinks[0].strIngredient2}, ${data.drinks[0].strIngredient3} and ${data.drinks[0].strIngredient4}. ${data.drinks[0].strInstructions}` 
    }
})
}

//Pick A Mood Dropdown 
function moodFunction() {
  document.getElementById("dropdown").classList.toggle("show");
}