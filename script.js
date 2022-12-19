//search bar
const searchButton = $("#search-button");
const searchInput = $("#search-input");
const currentWeather = $(".card");
const cityName = $(".cityName");
const temp = $(".temp");
const windSpeed = $(".windSpeed");
const humidity = $(".humidity");
const date = $(".date");


//$(document).ready(function () {
$("#search-button").on("click", function(){
 fetch("https://api.openweathermap.org/data/2.5/weather?q="+searchInput.val()+"&appid=5bc72e6052362574738302df8272767f")
 .then(response => response.json())
  .then(data => {
    console.log(data);
    
    var cityNameValue = data.name;
    var tempValue = data.main.temp;
    var windSpeedValue = data.wind.speed;
    
    cityName.innerHTML = cityNameValue;
    temp.innerHTML = tempValue;
    windSpeed.innerHTML = windSpeedValue;
  })




// .catch(err => alert("Wrong city name!"))
// })

//})


// searchButton.addEventListener('click', () => {
//   const inputValue = searchInput.value;
//   alert(inputValue);
// });

// function weatherFunction(searchInput) {

//     $.ajax({
//       type: "GET",
//       url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=5bc72e6052362574738302df8272767f")
// }).then(response => response.json())
//  .then(data => console.log(data))

//  .catch(err => alert("Wrong city name!"))

// function fiveDayForecast(searchInput) {
//     $.ajax({
//         type: "GET",
//        url: "https://api.openweathermap.org/data/2.5/weather?q="+searchInput.val()+"&appid=5bc72e6052362574738302df8272767f"
//     })
//      .then (function (data) 
//      { console.log(data);
// $("#fiveday-header").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\row\">");
     

//     for (var i = 0; i < data.list.length; i++) {

// if(data.list[i].dt_txt.indexOf("15:00:00") !== -1) {

//     var titleFive = $("<h3>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());
//     var imgFive = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
//     var colFive = $("<div>").addClass("col-md-2");
//     var cardFive = $("<div>").addClass("card bg-primary text-white");
//     var cardBodyFive = $("<div>").addClass("card-body p-2");
//     var humidFive = $("<li>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");
//     var tempFive = $("<li>").addClass("card-text").text("Temperature: " + data.list[i].main.temp + " °F");

// colFive.append(cardFive.append(cardBodyFive.append(titleFive, imgFive, humidFive, tempFive)))

// $("#fiveday-header .row").append(colFive);
// }

// }
// }
})
