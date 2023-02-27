$(document).ready(function () {
    //event listener for search button
    $("#search-button").on("click", function () {
        var searchInput = $("#search-input").val();
        $("#search-input").val("");
        weatherFunction(searchInput);
        fiveDayForecast(searchInput);
    });
    //getting previous searches from local storage
    var previousSearch = JSON.parse(localStorage.getItem("previousSearch")) || [];
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
                localStorage.setItem("history", JSON.stringify(previousSearch));
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
            // API call for longitude and latitude
            $.ajax({
                type: "GET",
                url: "http://api.openweathermap.org/geo/1.https://api.openweathermap.org/data/2.5/uvi?appid=5bc72e6052362574738302df8272767f&lat=" + lat + "&lon=" + lon,

            }).then(function (res) {
                console.log(res)
                var uvColor;
                var uvResponse = res.value;
                var uvIndex = $("<p>").addClass("card-text").text("UV Index: ");
                var btn = $("<span>").addClass("btn btn-sm").text(uvResponse);
                //adding classes to the buttons depending on uv responses
                if (uvResponse < 3) {
                    btn.addClass("btn-success");
                } else if (uvResponse < 7) {
                    btn.addClass("btn-warning");
                } else {
                    btn.addClass("btn-danger");
                }

                cardBody.append(uvIndex);
                $("#today .card-body").append(uvIndex.append(btn));
            });
            //merge and add responses to the page
            title.append(img);
            cardBody.append(title, temp, humid, wind);
            card.append(cardBody);
            $("#today").append(card);
            console.log(data)
        });
    }

    function fiveDayForecast(searchInput) {
        $.ajax({
            type: "GET",
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&appid=5bc72e6052362574738302df8272767f&units=imperial"

        }).then(function (data) {
            console.log(data);
            $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");


            for (var i = 0; i < data.list.length; i++) {
                if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                    var titleFive = $("<h3>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());
                    var imgFive = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
                    var colFive = $("<div>").addClass("col-md-2.5");
                    var cardFive = $("<div>").addClass("card bg-dark text-white");
                    var cardBodyFive = $("<div>").addClass("card-body p-2");
                    var humidFive = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");
                    var tempFive = $("<p>").addClass("card-text").text("Temperature: " + data.list[i].main.temp + " °F");
                    //merge and display on page
                    colFive.append(cardFive.append(cardBodyFive.append(titleFive, imgFive, tempFive, humidFive)));
                    //append card to column, body to card, and other elements to body
                    $("#forecast .row").append(colFive);
                }
            }
        });
    }
});