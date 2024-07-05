// Function to get the value of selected bathroom count
function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for (var i = 0; i < uiBathrooms.length; i++) {
      if (uiBathrooms[i].checked) {
        return parseInt(uiBathrooms[i].value);
      }
    }
    return -1; // Default value if none is selected (though UI should enforce selection)
  }
  
  // Function to get the value of selected BHK (Bedrooms, Hall, Kitchen) count
  function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for (var i = 0; i < uiBHK.length; i++) {
      if (uiBHK[i].checked) {
        return parseInt(uiBHK[i].value);
      }
    }
    return -1; // Default value if none is selected (though UI should enforce selection)
  }
  
  // Function to handle click event on "Estimate Price" button
  function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    
    // Retrieve input elements
    var sqft = document.getElementById("uiSqft");
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");
  
    // Construct URL for API endpoint
    var url = "/api/predict_home_price";
  
    // Make a POST request to the API
    $.post(url, {
      total_sqft: parseFloat(sqft.value),
      bhk: bhk,
      bath: bathrooms,
      location: location.value
    }, function(data, status) {
      console.log(data.estimated_price);
      // Update UI with estimated price
      estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
      console.log(status);
    });
  }
  
  // Function to handle actions when the page loads
  function onPageLoad() {
    console.log("Document loaded");
  
    // URL to retrieve location names from the API
    var url = "/api/get_location_name";
  
    // Make a GET request to fetch location names
    $.get(url, function(data, status) {
      console.log("Got response for get_location_names request");
      if (data && data.locations) {
        var locations = data.locations;
        var uiLocations = document.getElementById("uiLocations");
        
        // Clear existing options in the select element
        $('#uiLocations').empty();
  
        // Populate select element with fetched location names
        locations.forEach(function(location) {
          var opt = new Option(location);
          $('#uiLocations').append(opt);
        });
      }
    });
  }
  
  // Register onPageLoad function to execute when the page loads completely
  window.onload = onPageLoad;
  