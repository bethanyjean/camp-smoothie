var ninjaKey = "o+av+xqRbo9t4LzpYZYrTg==BIM0Nl0wB5X2Kmk1";
var consumerSecret = "3bb95ff8019f4e47b0bd89e4e30e18d7";
var oauth_signature_method = "HMAC-SHA1";
var oauth_timestamp = new Date();
// var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var oauth_nonce = "oauth_timestamp" + Math.random();
var oauth_version = "1.0";


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

// fatsecret.setContainer("my_container");
// fatsecret.setCanvas("home");

// fetch("https://platform.fatsecret.com/js?key=a897f4240bf2465d9b6050fc49d098f0")
//     .then(function (response) {
//       response.json().then(function (data) {
//         console.log(data)
//       })
//     });

//   fetch("https://platform.fatsecret.com/rest/server.api?food_id=33691&method=food.get.v2&oauth_consumer_key=eb5c07ec22794f91974170fd9846e255&oauth_nonce=1234&oauth_signature=eb5c07ec22794f91974170fd9846e255&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1245126631&oauth_version=1.0")
//   .then(function (response) {
//     response.json().then(function (data) {
//       console.log(data)
//     })
//   });

fetch("https://platform.fatsecret.com/rest/server.api" + consumerSecret + oauth_signature_method + oauth_timestamp + oauth_nonce + oauth_version)
.then(function (response) {
          response.json().then(function (data) {
            console.log(data)
          })
        });