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

//Settings Weather Toggle
var weatherContainer = document.getElementById('weatherContainer');
var toggleWeather = document.getElementById('toggleWeather');
chrome.storage.sync.get('toggleWeatherValue', function(data) {
  var showWeather = data.toggleWeatherValue ? data.toggleWeatherValue : false;
  if (showWeather) {
    document.getElementById('toggleWeather').checked = true;
    document.getElementById('weatherContainer').classList.remove("customHide");
  } else {
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

// Settings Notes Toggle
var noteTab = document.getElementById('noteTab');
var toggleNotes = document.getElementById('toggleNotes');
chrome.storage.sync.get('toggleNotesValue', function(data) {
  var showNotes = data.toggleNotesValue ? data.toggleNotesValue : false;
  if (showNotes) {
    document.getElementById('toggleNotes').checked = true;
    document.getElementById('noteTab').classList.remove("customHide");
    document.getElementById('divNoteToggle').classList.remove("customHide");
  } else {
    document.getElementById('toggleNotes').checked = false;
    document.getElementById('noteTab').classList.add("customHide");
    document.getElementById('divNoteToggle').classList.add("customHide");
  }
});

toggleNotes.addEventListener('click', function() {
  if (toggleNotes.checked === true) {
    chrome.storage.sync.set({
      'toggleNotesValue': true
    }, function() {
      document.getElementById('noteTab').classList.remove("customHide");
      document.getElementById('divNoteToggle').classList.remove("customHide");
    });
  } else {
    chrome.storage.sync.set({
      'toggleNotesValue': false
    }, function() {
      document.getElementById('noteTab').classList.add("customHide");
      document.getElementById('divNoteToggle').classList.add("customHide");
    });
  }
});