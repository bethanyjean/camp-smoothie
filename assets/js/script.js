
var ninjaKey = "o+av+xqRbo9t4LzpYZYrTg==BIM0Nl0wB5X2Kmk1";
var newSmoothie = {};
var fruitButton= document.getElementById("Fruit-button");
var baseButton= document.getElementById("Base-button");
var ptnsuppButton= document.getElementById("Protein-supplements-button");
var closeListButton= document.getElementById("Close-list");
var fruitList= document.getElementById("fruitList");
var baseList= document.getElementById("baseList");
var ptnsuppList= document.getElementById("ptnsuppList");


var swanson = function() {
    var swansonUrl = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";

    fetch(swansonUrl).then(function(response) {
        console.log(response);
        response.json().then(function(data) {
          console.log(data);
          $("#swanson").append(data);
        });
    });
};


// var query = '3lb carrots and a chicken sandwich'
// $.ajax({
//     method: 'GET',
//     url: 'https://api.calorieninjas.com/v1/nutrition?query=' + query,
//     headers: { 'X-Api-Key': ninjaKey},
//     contentType: 'application/json',
//     success: function(result) {
//         console.log(result);
//     },
//     error: function ajaxError(jqXHR) {
//         console.error('Error: ', jqXHR.responseText);
//     }
// });

// swanson();

// When an ingredient list is chosen, the other buttons are hidden
// The close list button becomes visible
// var hideButtons = function() {
//     fruitButton.style.display = "none";
//     baseButton.style.display = "none";
//     ptnsuppButton.style.display = "none";
//     closeListButton.style.display = "block";
// };


// adding event listeners to all the ingredient list buttons
// when clicked, the ingredient list is displayed
// fruitButton.addEventListener("click", function(event){
//     event.preventDefault()
//     hideButtons();
//     fruitList.style.display="block"
// }) 

// baseButton.addEventListener("click", function(event){
//     event.preventDefault()
//     hideButtons();
//     baseList.style.display="block"
// }) 

// ptnsuppButton.addEventListener("click", function(event){
//     event.preventDefault()
//     hideButtons();
//     ptnsuppList.style.display="block"
// }) 

// closeListButton.addEventListener("click", function(event){
//     event.preventDefault();
//     fruitButton.style.display = "block";
//     baseButton.style.display = "block";
//     ptnsuppButton.style.display = "block";
//     closeListButton.style.display = "none";
//     fruitList.style.display = "none";
//     ptnsuppList.style.display = "none";
//     baseList.style.display = "none"
// })

 $(".draggable").draggable();

$(".draggable").sortable( {
    connectWith: $(".ingredient-list"),
    scroll: false,
    tolerance: "pointer",
    helper: "clone",
    activate: function(event, ui) {
        $(this).addClass("dropover");
    },
    deactivate: function(event, ui) {
        $(this).removeClass("dropover");
    },
    over: function(event) {
        $(event.target).addClass("dropover-active");
    },
    out: function(event) {
        $(event.target).removeClass("dropover-active");
    },
    update: function() {
        var ingredient = $(this).textContent;
        console.log("Bloody hell" + ingredient); 
    },
});


$("#smoothie").droppable({
    accept: ".draggable",
    tolerance: "touch",
    drop: function(event, ui) {
        var ingredient = ui.draggable.textContent;
        console.log(ingredient);
    }
});





