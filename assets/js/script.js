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


