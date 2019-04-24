// set array of city strings
var topics = ["Toronto", "New York", "Rome", "Sydney", "Shanghai", "Buenos Aires", "Paris", "London", "Los Angeles"];

// create a function to create buttons based on the topics array
function createButtons() {
    $("#buttons").empty();

    // loop through the array of cities, then create buttons for each city in the array
    for(var i = 0 ; i < topics.length ; i++) {
      var newButton = $("<button>" + topics[i] + "</button>");
      newButton.addClass("btn btn-outline-info");
      newButton.addClass("city");
      newButton.attr("data-name", topics[i]);
      newButton.attr("data-state = still");
      $("#buttons").append(newButton);
    }
};

// add the giphy data to each button
function cityInfo() {
    var city = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + city + "&api_key=SMLpvRBeczzZOGwsJ5gH7IzwVu0Mwp4M&limit=10";

    // create AJAX call for the specific city button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response);

        var results = response.data;

        for(var i = 0; i < results.length; i++) {
            // add new variable for the gif div in the HTML
            var gifDiv = $(".gifs");

            // add the rating
            var rating = results[i].rating;
            var ratingDisplay = $("<p>");

            ratingDisplay.text("Rating: " + rating);

            // add titles of gifs
            var title = results[i].title;
            var titleDisplay = $("<p>");

            titleDisplay.text(title);

            // add the gif images
            var gifImage = $("<img>");

            gifImage.addClass("images");
            gifImage.attr("src", results[i].images.fixed_height.url);
            gifImage.attr("data-state = still");
            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            gifImage.attr("data-animate", results[i].images.fixed_height.url)

            // add rating & title above images
            gifDiv.prepend(ratingDisplay);
            gifDiv.prepend(titleDisplay);
            gifDiv.prepend(gifImage);
        };
        });
};

// function to animate the gifs on click
$(document).on("click", ".images", function() {

    // grab the data state of the clicked image
        var state = $(this).attr("data-state");
    
        console.log(this);
    
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } 
        
        else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
});

// create function to add user input as a new button
$("#add-city").on("click", function(event) {
    event.preventDefault();

    var city = $("#city-input").val().trim();

    // add the user city to the array
    topics.push(city);

    // clear the value in the input box
    $("#city-input").val("");

    createButtons();
});

// add click event listeners to all elements with a class of "city"
$(document).on("click", ".city", cityInfo);

// display the intial buttons
createButtons();