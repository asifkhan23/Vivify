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

    var arrayImg = new Array();
    arrayImg[0] = "wallpaper1.jpg";
    arrayImg[1] = "wallpaper2.jpg";
    arrayImg[2] = "wallpaper3.jpg";
    arrayImg[3] = "wallpaper4.jpg";
    arrayImg[4] = "wallpaper5.jpg";
    arrayImg[5] = "wallpaper6.jpg";
    arrayImg[6] = "wallpaper7.jpg";
    arrayImg[7] = "wallpaper8.jpg";
    arrayImg[8] = "wallpaper9.jpg";
    arrayImg[9] = "wallpaper10.jpg";

    var famousQuotes = {
        "quotes": [
              { "author": "Carol Burnett", "quote": "Only I can change my life. No one can do it for me." },
              { "author": "Charles R. Swindoll", "quote": "Life is 10% what happens to you and 90% how you react to it." },
              { "author": "Nikos Kazantzakis", "quote": "In order to succeed, we must first believe that we can." },
              { "author": "Orison Swett Marden", "quote": "A will finds a way." },
              { "author": "Nelson Mandela", "quote": "It always seems impossible until it's done." },
              { "author": "Mark Twain", "quote": "The secret of getting ahead is getting started." },
              { "author": "Walt Disney", "quote": "If you can dream it, you can do it." },
              { "author": "Theodore Roosevelt", "quote": "Keep your eyes on the stars, and your feet on the ground." },
              { "author": "Eleanor Roosevelt", "quote": "With the new day comes new strength and new thoughts." },
              { "author": "Robert H. Schuller", "quote": "Problems are not stop signs, they are guidelines." },
              { "author": "Aristotle", "quote": "Quality is not an act, it is a habit." },
              { "author": "Arthur Ashe", "quote": "Start where you are. Use what you have. Do what you can." },
              { "author": "Ayn Rand", "quote": "A creative man is motivated by the desire to achieve, not by the desire to beat others." },
              { "author": "Sam Levenson", "quote": "Don't watch the clock; do what it does. Keep going." },
              { "author": "Winston Churchill", "quote": "If you're going through hell, keep going." },
              { "author": "Maya Angelou", "quote": "We may encounter many defeats but we must not be defeated." }
        ]
    };

    var moviesQuotes = {
        "quotes": [
              { "author": "Love Story", "quote": "Love means never having to say you're sorry." },
              { "author": "Casablanca", "quote": "Of all the gin joints in all the towns in all the world, she walks into mine." },
              { "author": "The Godfather", "quote": "I'm going to make him an offer he can't refuse." },
              { "author": "Star Warsn", "quote": "May the Force be with you." },
              { "author": "Jaws", "quote": "You're gonna need a bigger boat." },
              { "author": "Gone With the Wind", "quote": "The first rule of Fight Club is: You do not talk about Fight Club." },
              { "author": "Fight Club", "quote": "If you can dream it, you can do it." },
              { "author": "The Dark Knight", "quote": "Why so serious?" },
              { "author": "When Harry Met Sally", "quote": "I'll have what she's having." },
              { "author": "Dr. No", "quote": "Bond. James Bond." },
              { "author": "The Sixth Sense", "quote": "I see dead people." },
              { "author": "The Terminator", "quote": "I'll be back." },
              { "author": "A Few Good Men", "quote": "You can't handle the truth!" },
              { "author": "Toy Story", "quote": "To infinity and beyond!" },
              { "author": "Dead Poets Society", "quote": "Carpe diem. Seize the day, boys." },
              { "author": "The Usual Suspects", "quote": "The greatest trick the devil ever pulled was convincing the world he didn't exist." }
        ]
    };

    document.getElementById("divNoteToggle").addEventListener("click", displayNote);
    document.getElementById("resetDiv").addEventListener("click", resetLocation);
    document.getElementById("saveLocation").addEventListener("click", fetchWeather);
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


    // condition to check net connectivity
    if(!navigator.onLine){
        getRandomImage(arrayImg);
    }
    //fetch image
    else{
        fetch(IMAGE_API)
      .then(function (response) {
          return response;
      })
      .then(function (resp) {
          var imageElem = document.querySelector('.contentContainer');
          imageElem.style.backgroundImage = "url(" + resp.url + ")";
      })
    }



    chrome.storage.sync.get('location', function (data) {
        weatherLocation.value = data.location ? data.location : '';
        if (weatherLocation.value && navigator.onLine) {
            document.getElementById('loactor').style.display = "none";
            fetchWeather();
        } else if(!navigator.onLine){
            document.getElementById('loactor').style.display = "none";
            document.getElementById('weatherContainer').innerHTML = "<p class='noInternetWeather'>There is no Internet connection. Please try again later!</p>";
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

    function setLocation(city) {

        chrome.storage.sync.set({
            'location': city
        }, function () {
            chrome.storage.sync.get('location', function (data) {
                weatherLocation.value = data.location ? data.location : '';
            });
        });
    }

    function fetchWeather() {
        document.getElementById('loadingDiv').style.display = "block";
        var weatherLocation = document.getElementById("location");
        WEATHER_API = "http://api.openweathermap.org/data/2.5/weather?q=" + weatherLocation.value + "&units=metric&APPID=924d98f4507d35a3eafb93d90bec4657";
        fetch(WEATHER_API)
          .then(function (response) {
              return response.json();
          })
          .then(function (resp) {
              if (resp.cod != 404) {
                  putWeatherDetails(resp);
                  setLocation(weatherLocation.value);
              }
              else {
                  document.getElementById('locElements').style.border = "1px solid red";
                  weatherLocation.value = "";
                  // document.getElementById('loadingDiv').style.display = "none";
                  // document.getElementById('errMsg').innerHTML = "No such location found";
              }
          })
    }

    function putWeatherDetails(resp) {

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
        if(!navigator.onLine){
            if(radioQuote == 'famous'){
                generateRandomQuote(famousQuotes);
            }
            else{
                generateRandomQuote(moviesQuotes);
            }    
        }
        else{
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

    //getRandomImage(arrayImg);

    function getRandomImage(arrayImg) {
        var path = path || 'images/wallpapers/'; // default path here
        var num = Math.floor(Math.random() * arrayImg.length);
        var img = arrayImg[num];
        var imageElem = document.querySelector('.contentContainer');
        imageElem.style.backgroundImage = "url(" + path + img + ")";
    }

    //generateRandomQuote(quotesObj);

    function generateRandomQuote(randomQuotes) {
        var num = Math.floor(Math.random() * randomQuotes.quotes.length);
        var quoteElm = document.querySelector('.quote');
        quoteElm.innerHTML = "<span class='leftQuote'></span><p>" + randomQuotes.quotes[num].quote + "</p> <span class='rightQuote'></span><br> - " + randomQuotes.quotes[num].author;
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
