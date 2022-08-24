const test = document.getElementById("test")
const featuredCocktails = document.getElementById("featured-cocktails-menu")
const form = document.getElementById("song-form")
const featuredCocktailsContainer = document.getElementById("featured-container")
const featuredCocktailNav = document.getElementById('featured-cocktail-nav')
const formDrinkContainer = document.querySelector(".form-drink")
const formInput = document.getElementById("form-input")
const formDrinkCard = document.querySelector("#form-drink-card")
const formDrinkName = document.getElementById("form-drink-name")
const formDrinkImage = document.getElementById("form-drink-image")
const formDrinkInstructions = document.getElementById("form-drink-instructions")

document.addEventListener("DOMContentLoaded", displayDrinks()) // calling displayDrinks function once DOM has loaded - will display five random drinks

form.addEventListener("submit", (e) => { // on submit...
  e.preventDefault()
  fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php") // fetching API that provides one random drink
  .then(res => res.json())
  .then(data => {
    let formDrink = data.drinks[0] // assigning a variable to the one drink

    formDrinkName.innerText = `The ${formInput.value} Cocktail` // taking the user input and making that the cocktail name

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
})

function displayDrinks() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail")
  .then(res => res.json())
  .then(data => {
    for(let i = 0; i < 5; i++){ //grab 5 drinks
      let drinksArray = data.drinks // assigns a value to the data
      let randomElement = drinksArray[Math.floor(Math.random() * drinksArray.length)] // grabs random drink
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
 
    } 
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

function dropdownToggle() {
  document.getElementById("dropdown-options").classList.toggle("show")
}

// TO-DO
  // put fetch in a function so it can be called in the "click" event and "submit" event
  // organize logic into individual functions
  // add logic for displaying cocktail after submitting song/artist 


// all route 
// https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail


// get by id route 
// https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15395


//for form 
// https://www.thecocktaildb.com/api/json/v1/1/search.php?s=mojito