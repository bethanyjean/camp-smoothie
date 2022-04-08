var ninjaKey = "o+av+xqRbo9t4LzpYZYrTg==BIM0Nl0wB5X2Kmk1";

// fetch("https://cors-anywhere.herokuapp.com/" + "https://www.fruityvice.com/api/fruit/all")
//     .then(function(response){
//         response.json().then(function(data){
//             console.log(data);
//         })
//     })
// var fatStuff = fetch("https://platform.fatsecret.com/js?key=a897f4240bf2465d9b6050fc49d098f0")

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