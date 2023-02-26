$(document).ready(function () {
    //event listener for search button
    $("#search-button").on("click", function () {
        var searchInput = $("#search-input").val();
        $("#search-input").val("");
        weatherFunction(searchInput);
        fiveDayForecast(searchInput);
    });
    //getting previous searches from local storage
    var previousSearch = JSON.parse(localStorage.getItem("history")) || [];
    if (previousSearch.length > 0) {
        weatherFunction(previousSearch[previousSearch.length - 1]);
    }
    for (var i = 0; i < previousSearch.length; i++) {
        createRow(previousSearch[i]);
    }
    //adds searched city to previously searched table
    function createRow(text) {
        var listItem = $("<li>").addClass("list-group-item").text(text);
        $(".previous-search").append(listItem);
    }
    $(".previous-search").on("click", "li", function () {
        weatherFunction($(this).text());
        fiveDayForecast($(this).text());
    })

    function weatherFunction(searchInput) {
        $.ajax({
            type: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=5bc72e6052362574738302df8272767f"

        }).then(function (data) {
            if (previousSearch.indexOf(searchInput) === -1) {
                previousSearch.push(searchInput);
                localStorage.setItem("history", JOSN.stringify(previousSearch));
                createRow(searchInput);
            }
            $("#today").empty()
            var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
            var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
            var card = $("<div>").addClass("card");
            var cardBody = $("<div>").addClass("card-body");
            var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
            var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + " %");
            var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " K");
            console.log(data)
            var lon = data.coord.lon;
            var lat = data.coord.lat;
            
            $.ajax({
                type: "GET",
                url: "http://api.openweathermap.org/geo/1.https://api.openweathermap.org/data/2.5/uvi?appid=5bc72e6052362574738302df8272767f&lat=" + lat + "&lon=" + lon,
                
            }).then(function (res){
                console.log(res)
                var uvColor;
        var uvResponse = res.value;
        var uvIndex = $("<p>").addClass("card-text").text("UV Index: ");
        var btn = $("<span>").addClass("btn btn-sm").text(uvResponse);

        if(uvResponse < 3) {
            btn.addClass("btn-success");
        } else if (uvResponse < 7) {
            btn.addClass("btn-warning")
        }




            }
        
                )
        }
        )
    }









})