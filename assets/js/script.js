//key needed for the API
var ninjaKey = "o+av+xqRbo9t4LzpYZYrTg==BIM0Nl0wB5X2Kmk1";
//variable to save local storage of favorite smoothie
var savedSmoothie = {};
var ingredients = {
    fruit: ["Strawberry", "Banana", "Peach", "Blueberry", "Mango"],
    base: ["Almond milk","Coconut milk", "Orange juice", "Pineapple juice", "Chocolate milk"],
    ptnsupp: ["Pea protein", "Peanut Butter", "Whey Protein", "Flax seed", "Honey"],
    smoothie: [],
};
//Variables for the addition of the nutrition facts
var calories = 0;
var protein = 0;
var carbs = 0;
var fat = 0;





//retrieve Ron Swanson quote for favorties page
var swanson = function() {
    var swansonUrl = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";

    fetch(swansonUrl).then(function(response) {
        response.json().then(function(data) {
          $("#swanson").append(data);
        });
    });
};




//take the nutritional information for the smoothie and display it.
var createNutrition = function(calories, protein, carbs, fat){
        $("#calories").text("Calories " + calories);
        $("#protein").text("Protein " + protein);
        $("#fat").text("Fat " + fat);
        $("#carbs").text("Carbs " + carbs);
};



//when the nutrition button is clicked, calculate the nutrition
$("#nutrition-button").click(function(){
    //set a temp array to store the ingredients
    var tempArr = ingredients.smoothie;
    //loop over the array and go to calorie ninja to retrieve the nutritional data
    $.each(tempArr, function(index, text){
        $.ajax({
            method: 'GET',
            url: 'https://api.calorieninjas.com/v1/nutrition?query=' + text.text,
            headers: { 'X-Api-Key': ninjaKey},
            contentType: 'application/json',
            //If the call is sucessful, add all of the nutritional data together and rounds to nearest whole number
            success: function(result) {
                console.log("Calories " + result.items[0].calories);
                calories += result.items[0].calories;
                calories=calories.toFixed(0);
                protein += result.items[0].protein_g;
                protein=protein.toFixed(0);
                carbs += result.items[0].carbohydrates_total_g;
                carbs=carbs.toFixed(0);
                fat += result.items[0].fat_total_g;
                fat=fat.toFixed(0);
                createNutrition(calories, protein, carbs, fat);
                
            },
            error: function ajaxError(jqXHR) {
                console.error('Error: ', jqXHR.responseText);
            }
        }); 
    });
     
});


// dynamically adds each of the ingredients to the proper card/ingredient list. allows for additiona
//     ingredients to be added in the varibale declaration
var createIngredient = function(ingredientText, ingredientList) {
    var ingredientLi = $("<li>").addClass("list-item");
    var ingredientP = $("<span>")
        .addClass("ingredient")
        .text(ingredientText);
    ingredientLi.append(ingredientP);
    $("#list-" + ingredientList).append(ingredientLi);
};

//loops through each array in the ingredints object to add to the proper list
var loadIngredients = function() {
    $.each(ingredients, function(list, arr){
        arr.forEach(function(ingredient){
            createIngredient(ingredient, list);
        });
    });
};

// makes the ingredient lists draggable to enable them to be added to the smoothie
$(".card .ingredient-list").sortable({
    //only allow the smoothie list to accept dropped items
    connectWith: $("#list-smoothie"),
    scroll: false,
    tolerance: "pointer",
    helper: "clone",
    //when an item is dragged, the target changes color
    activate: function(event, ui){
        $(this).addClass("dropover");
    },
    deactivate: function(event, ui){
        $(this).removeClass("dropover");
    },
    over: function(event) {
        $(event.target).addClass("dropover-active");
    },
    out: function(event) {
        $(event.target).removeClass("dropover-active");
    },
        //when the item is dropped, all of the lists will update with the smoothie list
        //containing the additional item and it being removed from its ingredient list
      update: function() {
        var tempArr = [];

            // loop over current set of children in sortable list
            $(this)
                .children()
                .each(function() {
                    // save values in temp array
                    tempArr.push({
                        text: $(this)
                        .find("span")
                        .text()
                        .trim(),
                    });
                });
                //the smoothie list now contains all the new ingredients
           ingredients.smoothie=tempArr;
        }
});


//saves all the ingredients of the favorite smoothie to local storage
$("#save-button").click(function() {
    localStorage.setItem("savedSmoothie", JSON.stringify(ingredients.smoothie));
    location.href = 'https://bethanyjean.github.io/camp-smoothie/favorites.html';
});


//loads the favorite ingredient from saved smoothie array and loads it on the favorites tab
var loadFavorite = function() {
    for (let i = 0; i < savedSmoothie.length; i++) {
        createIngredient(savedSmoothie[i].text, "favorite");
    }
}

//load saved smoothie from local storage
var loadSavedSmoothie = function() {
    savedSmoothie = JSON.parse(localStorage.getItem("savedSmoothie"));
    console.log(savedSmoothie);
    if (savedSmoothie==null) {
        console.log("There are no favorites here.");
    } else {
    loadFavorite();
    }   
}

//call the function to load all the ingredients into the proper containers
loadIngredients();
//call the function to display Ron Swanson quote
swanson();
//call the function to load the saved smoothie to the favorites page
loadSavedSmoothie();
