var toggleWeather = document.getElementById('toggleWeather');
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("settings");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
var weatherContainer = document.getElementById('weatherContainer');
chrome.storage.sync.get('toggleWeatherValue', function(data) {
  var showWeather = data.toggleWeatherValue ? data.toggleWeatherValue : false;
  console.log(showWeather);

  if (showWeather) {
    console.log("inside if");
    document.getElementById('toggleWeather').checked = true;
    document.getElementById('weatherContainer').classList.remove("customHide");
  } else {
    console.log("inside else");
    document.getElementById('toggleWeather').checked = false;
    document.getElementById('weatherContainer').classList.add("customHide");
  }
});

toggleWeather.addEventListener('click', function() {
  if (toggleWeather.checked === true) {
    chrome.storage.sync.set({
      'toggleWeatherValue': true
    }, function() {
      document.getElementById('weatherContainer').classList.remove("customHide");
    });
  } else {
    chrome.storage.sync.set({
      'toggleWeatherValue': false
    }, function() {
      document.getElementById('weatherContainer').classList.add("customHide");
    });
  }
});