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
    toggleWeather.checked = true;
    weatherContainer.classList.remove("customHide");
  } else {
    toggleWeather.checked = false;
    weatherContainer.classList.add("customHide");
  }
});

toggleWeather.addEventListener('click', function() {
  if (toggleWeather.checked === true) {
    chrome.storage.sync.set({
      'toggleWeatherValue': true
    }, function() {
      weatherContainer.classList.remove("customHide");
    });
  } else {
    chrome.storage.sync.set({
      'toggleWeatherValue': false
    }, function() {
      weatherContainer.classList.add("customHide");
    });
  }
});

// Settings Notes Toggle
var noteTab = document.getElementById('noteTab');
var toggleNotes = document.getElementById('toggleNotes');
var divNoteToggle = document.getElementById('divNoteToggle');
chrome.storage.sync.get('toggleNotesValue', function(data) {
  var showNotes = data.toggleNotesValue ? data.toggleNotesValue : false;
  if (showNotes) {
    toggleNotes.checked = true;
    noteTab.classList.remove("customHide");
    divNoteToggle.classList.remove("customHide");
  } else {
    toggleNotes.checked = false;
    noteTab.classList.add("customHide");
    divNoteToggle.classList.add("customHide");
  }
});

toggleNotes.addEventListener('click', function() {
  if (toggleNotes.checked === true) {
    chrome.storage.sync.set({
      'toggleNotesValue': true
    }, function() {
      noteTab.classList.remove("customHide");
      divNoteToggle.classList.remove("customHide");
    });
  } else {
    chrome.storage.sync.set({
      'toggleNotesValue': false
    }, function() {
      noteTab.classList.add("customHide");
      divNoteToggle.classList.add("customHide");
    });
  }
});

// Settings Quote Toggle
var quoteContainer = document.getElementById('quoteContainer');
var toggleQuote = document.getElementById('toggleQuote');
chrome.storage.sync.get('toggleQuoteValue', function(data) {
  var showQuote = data.toggleQuoteValue ? data.toggleQuoteValue : false;
  if (showQuote) {
    toggleQuote.checked = true;
    quoteContainer.classList.remove("customHide");
  } else {
    toggleQuote.checked = false;
    quoteContainer.classList.add("customHide");
  }
});

toggleQuote.addEventListener('click', function() {
  if (toggleQuote.checked === true) {
    chrome.storage.sync.set({
      'toggleQuoteValue': true
    }, function() {
      quoteContainer.classList.remove("customHide");
    });
  } else {
    chrome.storage.sync.set({
      'toggleQuoteValue': false
    }, function() {
      quoteContainer.classList.add("customHide");
    });
  }
});

// Settings Social Icons Toggle
var socialContainer = document.getElementById('socialContainer');
var toggleSocial = document.getElementById('toggleSocial');
chrome.storage.sync.get('toggleSocialValue', function(data) {
  var showSocialIcons = data.toggleSocialValue ? data.toggleSocialValue : false;
  if (showSocialIcons) {
    toggleSocial.checked = true;
    socialContainer.classList.remove("customHide");
  } else {
    toggleSocial.checked = false;
    socialContainer.classList.add("customHide");
  }
});

toggleSocial.addEventListener('click', function() {
  if (toggleSocial.checked === true) {
    chrome.storage.sync.set({
      'toggleSocialValue': true
    }, function() {
      socialContainer.classList.remove("customHide");
    });
  } else {
    chrome.storage.sync.set({
      'toggleSocialValue': false
    }, function() {
      socialContainer.classList.add("customHide");
    });
  }
});

//Settings For Quote Type Selection
var radioQuote = document.querySelector('input[name="radioQuote"]:checked');
console.log(radioQuote.value);