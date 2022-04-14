
var ninjaKey = "o+av+xqRbo9t4LzpYZYrTg==BIM0Nl0wB5X2Kmk1";
var savedSmoothie = {};
var ingredients = {
    fruit: ["strawberry", "banana", "apple", "blueberry", "mango"],
    base: ["almond milk","coconut milk", "orange juice"],
    ptnsupp: ["pea protein", "Peanut Butter", "Whey Protein"],
    smoothie: [],
};
var calories = 0;
var protein = 0;
var carbs = 0;
var fat = 0;





//retrieve Ron Swanson quote
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
            //If the call is sucessful, add all of the nutritional data together
            success: function(result) {
                console.log("Calories " + result.items[0].calories);
                calories += result.items[0].calories;
                protein += result.items[0].protein_g;
                carbs += result.items[0].carbohydrates_total_g;
                fat += result.items[0].fat_total_g;
                createNutrition(calories, protein, carbs, fat);
            },
            error: function ajaxError(jqXHR) {
                console.error('Error: ', jqXHR.responseText);
            }
        }); 
    });
     
});



var createIngredient = function(ingredientText, ingredientList) {
    var ingredientLi = $("<li>").addClass("list-item");
    var ingredientP = $("<span>")
        .addClass("ingredient")
        .text(ingredientText);
    ingredientLi.append(ingredientP);
    $("#list-" + ingredientList).append(ingredientLi);
};

var loadIngredients = function() {
    $.each(ingredients, function(list, arr){
        arr.forEach(function(ingredient){
            createIngredient(ingredient, list);
        });
    });
};

// $(".ingredient-list").draggable();

$(".card .ingredient-list").sortable({
    //enable across ingredient-lists
    connectWith: $("#list-smoothie"),
    scroll: false,
    tolerance: "pointer",
    helper: "clone",
    
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
           ingredients.smoothie=tempArr;
        }
});

$("#save-button").click(function() {
    localStorage.setItem("savedSmoothie", JSON.stringify(ingredients.smoothie));
});

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
loadSavedSmoothie();
loadIngredients();
swanson();
