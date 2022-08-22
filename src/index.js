const test = document.getElementById("test")
const featuredCocktails = document.getElementById("featured-cocktails-menu")
const form = document.getElementById("song-form")
const featuredCocktailsContainer = document.getElementById("featured-container")
const featuredCocktailClick = document.getElementById('featured-cocktail')

fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail")
.then(res => res.json())
.then(data => {
  for(let i = 0; i < 5; i++){ //grab 5 drinks 
    let drinksArray = data.drinks // assigns a value to the data 
    let randomElement = drinksArray[Math.floor(Math.random() * drinksArray.length)] // grabs random drink
    let drinkName = document.createElement("h5") // creates an element for each drink's name
    featuredCocktails.append(featuredCocktailClick) //add individual cocktail elements to the cocktails menu
    
    //add and append an individual cocktail div to the overall cocktails container
    let featuredCocktailDiv = document.createElement("div") 
    featuredCocktailsContainer.append(featuredCocktailDiv) 

    //add and append drink ids and names to the individual cocktail elements
    drinkName.setAttribute("id", "drink-name")
    drinkName.innerText = randomElement.strDrink // adds the name of a random drink from the data 
    featuredCocktailDiv.append(drinkName)// adds the drink name to the 'featured cocktails list'

    //add and append drink images to the individual cocktail elements
    let drinkImage = document.createElement("img")
    drinkImage.setAttribute("id", "featured-drink-image")
    drinkImage.src = randomElement.strDrinkThumb
    featuredCocktailDiv.append(drinkImage)

    //add event listener to each featured cocktail
    featuredCocktailDiv.addEventListener("click", () => {
      let id = randomElement.idDrink //get the ID of the random drink
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => 
        console.log(data.drinks[0].strInstructions))
    })
  } 
})

form.addEventListener("submit", (e) => {
  e.preventDefault()
})


// all route 
// https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail


// get by id route 
// https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15395


//for form 
// https://www.thecocktaildb.com/api/json/v1/1/search.php?s=mojito