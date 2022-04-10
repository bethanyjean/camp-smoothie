
var ninjaKey = "o+av+xqRbo9t4LzpYZYrTg==BIM0Nl0wB5X2Kmk1";
var newSmoothie = {};


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


var query = '3lb carrots and a chicken sandwich'
$.ajax({
    method: 'GET',
    url: 'https://api.calorieninjas.com/v1/nutrition?query=' + query,
    headers: { 'X-Api-Key': ninjaKey},
    contentType: 'application/json',
    success: function(result) {
        console.log(result);
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});

swanson();

var fruitButton= document.getElementById("Fruit-button");
fruitButton.addEventListener("click", function(event){
    event.preventDefault()
    var fruitList= document.getElementById("fruitList");
    fruitList.style.display="block"
}) 

$(".example-draggable").draggable()


$("#smoothie").droppable({
    accept: ".example-draggable",
    tolerance: "touch"

});



