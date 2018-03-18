var beautifulNewTab = (function beautifulNewTab() {

    var QUOTES_API_OLD = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous";
    var IMAGE_API = "https://source.unsplash.com/random";
    var WEATHER_API_OLD = "http://api.openweathermap.org/data/2.5/weather?q=dubai&units=metric&APPID=924d98f4507d35a3eafb93d90bec4657"

    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json",
        "X-Mashape-Key": "NNVo5yZIATmshv1o0uqFsTVTSsObp1s54gKjsnIfXvjJrwxWxe"
    });
    var init = {
        method: 'GET',
        headers: myHeaders
    }
    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    var today = new Date();
    var month = monthNames[today.getMonth()];
    var date = today.getDate() + ' ' + month + ' ' + today.getFullYear();
    var dateElement = document.querySelector('.date');
    var timeElement = document.querySelector('.time');
    var weatherLocation = document.getElementById("location");
    var radioQuote = document.querySelector('input[name="radioQuote"]:checked');


    document.getElementById("divNoteToggle").addEventListener("click", displayNote);
    document.getElementById("resetDiv").addEventListener("click", resetLocation);
    document.getElementById("saveLocation").addEventListener("click", setLocation);
    document.getElementsByName("radioQuote")[0].addEventListener("click", setQuoteTypeFamous);
    document.getElementsByName("radioQuote")[1].addEventListener("click", setQuoteTypeMovies);

    //On install initialization
    //chrome.runtime.onInstalled.addListener(function () {
    //    chrome.storage.sync.set({
    //        'location': "Delhi",
    //        'quoteType': "movies",
    //        'noteText': "",
    //        'headText': "",
    //        'toggleWeatherValue': true,
    //        'toggleNotesValue': true,
    //        'toggleQuoteValue': true,
    //        'toggleSocialValue':true
    //    }, function () {
    //        console.log("Initialization complete, Ready to use.");
    //    });
    //});
    chrome.storage.sync.get('quoteType', function (data) {
        if (data.quoteType === undefined) {
            chrome.storage.sync.set({
                'location': "Delhi",
                'quoteType': "movies",
                'noteText': "",
                'headText': "",
                'toggleWeatherValue': true,
                'toggleNotesValue': true,
                'toggleQuoteValue': true,
                'toggleSocialValue': true
            }, function () {
                location.reload();
                console.log("Initialization complete, Ready to use.");
            });
        }
    });

    dateElement.innerHTML = date;
    timeElement.innerHTML = getCurrentTime();

    setInterval(function () {
        timeElement.innerHTML = getCurrentTime();
    }, 1000);

    //fetch image
    fetch(IMAGE_API)
      .then(function (response) {
          return response;
      })
      .then(function (resp) {
          var imageElem = document.querySelector('.contentContainer');
          imageElem.style.backgroundImage = "url(" + resp.url + ")";
      })


    chrome.storage.sync.get('location', function (data) {
        weatherLocation.value = data.location ? data.location : '';
        if (weatherLocation.value) {
            document.getElementById('loactor').style.display = "none";
            fetchWeather();
        } else {
            document.getElementById('weatherContainer').style.display = "none";
            document.getElementById('loactor').style.display = "block";
        }
    });
    chrome.storage.sync.get('quoteType', function (data) {
        radioQuote = data.quoteType ? data.quoteType : 'famous';
        if (radioQuote == "famous") {
            document.getElementsByName("radioQuote")[0].checked = true;
        } else {
            document.getElementsByName("radioQuote")[1].checked = true;
        }
        fetchQuotes();
    });


    function resetLocation() {
        chrome.storage.sync.get('location', function (data) {
            weatherLocation.value = '';
        });
        document.getElementById('weatherContainer').style.display = "none";
        document.getElementById('loactor').style.display = "block";
    }

    function setLocation() {
        document.getElementById('loadingDiv').style.display = "block";
        var weatherLocation = document.getElementById("location");
        chrome.storage.sync.set({
            'location': weatherLocation.value
        }, function () {
            chrome.storage.sync.get('location', function (data) {
                weatherLocation.value = data.location ? data.location : '';
                fetchWeather();
            });
        });
    }

    function fetchWeather() {
        WEATHER_API = "http://api.openweathermap.org/data/2.5/weather?q=" + weatherLocation.value + "&units=metric&APPID=924d98f4507d35a3eafb93d90bec4657";
        fetch(WEATHER_API)
          .then(function (response) {
              return response.json();
          })
          .then(function (resp) {
              if (resp.cod != 404) {
                  document.getElementById('loactor').style.display = "none";
                  document.getElementById('loadingDiv').style.display = "none";
                  document.getElementById('errMsg').innerHTML = "";
                  document.getElementById('weatherContainer').style.display = "block";

                  var cityElem = document.querySelector('.city');
                  var tempElem = document.querySelector('.temp');
                  var iconDescElem = document.querySelector('.iconDesc');
                  var iconElem = document.querySelector('.icon');
                  var weatherDetails = document.querySelector('.weatherDetails ul');
                  var weatherCode = resp.weather[0];
                  var iconUrl = "http://openweathermap.org/img/w/" + weatherCode.icon + ".png";
                  iconElem.innerHTML = ("<img src='" + iconUrl + "'>");
                  cityElem.innerHTML = resp.name;
                  iconDescElem.innerHTML = weatherCode.main;
                  tempElem.innerHTML = "<span>" + resp.main.temp_min + " &#8451 </span>  <strong> " + resp.main.temp + " &#8451 </strong> <span>" + resp.main.temp_max + " &#8451 </span>";
                  weatherDetails.innerHTML = "<li><img src='images/humidity-icon.png'><span>" + resp.main.humidity + "</span>% humidity </li>" + "<li><img src='images/wind-icon.png'><span>" + resp.wind.speed + "</span> m/s NW </li>";
                  document.getElementById('myModal').style.display = "none";
                  document.getElementById('locElements').style.border = "1px solid #eee";
              } else {
                  document.getElementById('locElements').style.border = "1px solid red";
                  // document.getElementById('loadingDiv').style.display = "none";
                  // document.getElementById('errMsg').innerHTML = "No such location found";
              }
          })
    }

    function setQuoteTypeFamous() {
        chrome.storage.sync.set({
            'quoteType': "famous"
        }, function () {
            radioQuote = "famous";
            fetchQuotes();
        });
    }

    function getCurrentTime() {
        var dateObj = new Date();
        var h, m, s
        h = (dateObj.getHours() < 10 ? '0' : '') + dateObj.getHours(),
          m = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();
        s = (dateObj.getSeconds() < 10 ? '0' : '') + dateObj.getSeconds();
        var time = h + ":" + m + ":" + s;

        return time;
    }

    function setQuoteTypeMovies() {
        chrome.storage.sync.set({
            'quoteType': "movies"
        }, function () {
            radioQuote = "movies";
            fetchQuotes();
        });
    }

    function fetchQuotes() {
        QUOTES_API = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=" + radioQuote;
        fetch(QUOTES_API, init)
          .then(function (response) {
              return response.json();
          })
          .then(function (resp) {
              var quoteElm = document.querySelector('.quote');
              quoteElm.innerHTML = "<span class='leftQuote'></span><p>" + resp.quote + "</p> <span class='rightQuote'></span><br> - " + resp.author;
          })
    }

    function displayNote() {
        if (document.getElementById("toggleNote").innerText == "<") {
            document.getElementById("noteTab").style.transition = "width 0.25s";
            document.getElementById("noteTab").style.width = "0vw";
            document.getElementById("divNoteToggle").style.transition = "right 0.25s";
            document.getElementById("divNoteToggle").style.right = "0vw";
            document.getElementById("toggleNote").innerText = ">";
        } else {
            document.getElementById("noteTab").style.transition = "width 0.5s";
            document.getElementById("noteTab").style.width = "18vw";
            document.getElementById("divNoteToggle").style.transition = "right 0.5s";
            document.getElementById("divNoteToggle").style.right = "18vw";
            document.getElementById("toggleNote").innerText = "<";
        }
    }

})();




//Text Area Fucntion

(function () {

    function _makeDelayed() {
        var timer = 0;
        return function (callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    }

    function bindNoteHandlers() {
        var elem = document.getElementById('note-text'),
          saveHandler = _makeDelayed();
        var head = document.getElementById('headdingText'),
          saveHandler = _makeDelayed();

        function save() {
            chrome.storage.sync.set({
                'noteText': elem.value,
                'headText': head.value
            });
        }
        // Throttle save so that it only occurs after 1 second without a keypress.
        elem.addEventListener('keypress', function () {
            saveHandler(save, 1000);
        });
        elem.addEventListener('blur', save);
        chrome.storage.sync.get('noteText', function (data) {
            elem.value = data.noteText ? data.noteText : '';
        });

        head.addEventListener('keypress', function () {
            saveHandler(save, 1000);
        });
        head.addEventListener('blur', save);
        chrome.storage.sync.get('headText', function (data) {
            head.value = data.headText ? data.headText : '';
        });
    }

    bindNoteHandlers();
})();

// chrome.topSites.get(function(urls) {
//   urls.forEach(function({
//     url,
//     title
//   }) {
//     console.log(url, title);
//   })
// });