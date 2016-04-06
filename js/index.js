$(document).ready(function() {
  // Devine function to make API reqeuest and handle response
  function sendRequest() {
    var searchString = $("input").val();
    var requestUrl = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + searchString;
    
    $("#results-list").empty(); // clear previous results
    $("#page-container").animate({marginTop: "3px"}, "fast"); // move search box up
    $("#clear").show(); // reveal clear button
    
    $.ajax({
      url: requestUrl,
      // Request jsonp to prevent cross origin errors
      dataType: 'jsonp',
      success: function(data) {  
        // Check if there are results before displaying
        if(data.query) {
          var results = data.query.pages;
        
          for(var page in results) {
            $("#results-list").append("<li><a href='http://en.wikipedia.org/?curid=" + results[page].pageid + "' target='_blank'><div class='result-container container animated bounceInUp'><span>> " + results[page].title + "</span> - " + results[page].extract + "</div></a></li>");
          }
        } else {
          // Display "no results" if nothing was found
          $("#results-list").append("<li class='result-container container animated bounceInUp'><span>> No Results</span></li>");
        }
      },
      error: function(error) {
        console.log(error);
        alert("There was a problem with the request");
      }
    });
  }
           
  $("#search").on("click", sendRequest); // call sendRequest function on button click
  
  // call sendRequest on enter key press
  $("input").keypress(function (e) {
    if (e.which == 13) {
      sendRequest();
      return false;
    }
  });
  
  // on click of the clear button:
  $("#clear").on("click", function() {
    $("#results-list").empty(); // empty results list
    $("input").val(""); // clear out input box
    $("#page-container").animate({marginTop: "30vh"}, "fast"); // move search box back down
    $("#clear").hide(); // hide the clear button
  });
});