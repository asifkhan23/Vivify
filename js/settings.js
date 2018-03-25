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
var setWthLocation = document.getElementById('wthLocInput');
chrome.storage.sync.get('toggleWeatherValue', function(data) {
  var showWeather = data.toggleWeatherValue ? data.toggleWeatherValue : false;
  if (showWeather) {
    //toggleWeather.checked = true;
    toggleWeather.style.color = "#1181D1";
    weatherContainer.classList.remove("customHide");
    setWthLocation.style.display = "block";
  } else {
    //toggleWeather.checked = false;
    toggleWeather.style.color = "#CCCCCC";    
    weatherContainer.classList.add("customHide");
    setWthLocation.style.display = "none";
  }
});

toggleWeather.addEventListener('click', function() {
  //if (toggleWeather.checked === true) {
    if(toggleWeather.style.color == "rgb(204, 204, 204)"){
    chrome.storage.sync.set({
      'toggleWeatherValue': true
    }, function() {
      weatherContainer.classList.remove("customHide");
      toggleWeather.style.color = "#1181D1"
      setWthLocation.style.display = "block";
    });
  } 
  else {
    chrome.storage.sync.set({
      'toggleWeatherValue': false
    }, function() {
      weatherContainer.classList.add("customHide");
      toggleWeather.style.color = "#CCCCCC";          
      setWthLocation.style.display = "none";
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
    //toggleNotes.checked = true;
    toggleNotes.style.color = "#1181D1";    
    noteTab.classList.remove("customHide");
    divNoteToggle.classList.remove("customHide");
  } else {
    //toggleNotes.checked = false;
    toggleNotes.style.color = "#CCCCCC";    
    noteTab.classList.add("customHide");
    divNoteToggle.classList.add("customHide");
  }
});

toggleNotes.addEventListener('click', function() {
  if (toggleNotes.style.color == "rgb(204, 204, 204)") {
    chrome.storage.sync.set({
      'toggleNotesValue': true
    }, function() {
      toggleNotes.style.color = "#1181D1";                
      noteTab.classList.remove("customHide");
      divNoteToggle.classList.remove("customHide");
    });
  } else {
    chrome.storage.sync.set({
      'toggleNotesValue': false
    }, function() {
      toggleNotes.style.color = "#CCCCCC";          
      noteTab.classList.add("customHide");
      divNoteToggle.classList.add("customHide");
    });
  }
});

// Settings Quote Toggle
var quoteContainer = document.getElementById('quoteContainer');
var toggleQuote = document.getElementById('toggleQuote');
var setQuoteType = document.getElementById('qotCatSelect');
chrome.storage.sync.get('toggleQuoteValue', function(data) {
  var showQuote = data.toggleQuoteValue ? data.toggleQuoteValue : false;
  if (showQuote) {
    toggleQuote.style.color = "#1181D1";
    quoteContainer.classList.remove("customHide");
    setQuoteType.style.display = "block";
  } else {
    toggleQuote.style.color = "#CCCCCC";
    quoteContainer.classList.add("customHide");
    setQuoteType.style.display = "none";
  }
});

toggleQuote.addEventListener('click', function() {
  if (toggleQuote.style.color == "rgb(204, 204, 204)") {
    chrome.storage.sync.set({
      'toggleQuoteValue': true
    }, function() {
      toggleQuote.style.color = "#1181D1";
      quoteContainer.classList.remove("customHide");
      setQuoteType.style.display = "block";      
    });
  } else {
    chrome.storage.sync.set({
      'toggleQuoteValue': false
    }, function() {
      toggleQuote.style.color = "#CCCCCC";      
      quoteContainer.classList.add("customHide");
      setQuoteType.style.display = "none";
    });
  }
});

// Settings Social Icons Toggle
var socialContainer = document.getElementById('socialContainer');
var toggleSocial = document.getElementById('toggleSocial');
chrome.storage.sync.get('toggleSocialValue', function(data) {
  var showSocialIcons = data.toggleSocialValue ? data.toggleSocialValue : false;
  if (showSocialIcons) {
    toggleSocial.style.color = "#1181D1";
    socialContainer.classList.remove("customHide");
    setQuoteType.style.display = "block";    
  } else {
    toggleSocial.style.color = "#CCCCCC";
    socialContainer.classList.add("customHide");
    setQuoteType.style.display = "none";    
  }
});

toggleSocial.addEventListener('click', function() {
  if (toggleSocial.style.color == "rgb(204, 204, 204)") {
    chrome.storage.sync.set({
      'toggleSocialValue': true
    }, function() {
      socialContainer.classList.remove("customHide");
      toggleSocial.style.color = "#1181D1";      
    });
  } else {
    chrome.storage.sync.set({
      'toggleSocialValue': false
    }, function() {
      socialContainer.classList.add("customHide");
      toggleSocial.style.color = "#CCCCCC";
    });
  }
});