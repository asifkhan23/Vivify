var beautifulNewTab = (function beautifulNewTab() {

  var categoryArray = [
    'movies',
    'famous'
  ];

  var randomCategory = Math.floor(Math.random()*categoryArray.length);
  //var QUOTES_API = "https://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en";
  // var QUOTES_API = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous";
  var QUOTES_API = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=" + categoryArray[randomCategory];
  //var IMAGE_API = "https://api.nasa.gov/planetary/apod?api_key=U1FBlDl0BCK0NL5MGNQANPy8PJJL5Z5p509k7vV1&count=1";
  var IMAGE_API = "https://source.unsplash.com/random";

  var NEWS_API = "https://newsapi.org/v2/top-headlines?country=us&apiKey=38f90da811ac4deb8486698e997fe0c6"

  var WEATHER_API = "http://api.openweathermap.org/data/2.5/weather?q=london&units=metric&APPID=924d98f4507d35a3eafb93d90bec4657"

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
  dateElement.innerHTML = date;

  var timeElement = document.querySelector('.time');

  timeElement.innerHTML = getCurrentTime();

  setInterval(function() {
    timeElement.innerHTML = getCurrentTime();
  }, 1000);


  function getCurrentTime() {
    var dateObj = new Date();
    var h, m, s
    h = (dateObj.getHours() < 10 ? '0' : '') + dateObj.getHours(),
      m = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();
    s = (dateObj.getSeconds() < 10 ? '0' : '') + dateObj.getSeconds();
    var time = h + ":" + m + ":" + s;

    return time;
  }


  //fetch image
  fetch(IMAGE_API)
    .then(function(response) {
      return response;
    })
    .then(function(resp) {
      var imageElem = document.querySelector('.contentContainer');
      imageElem.style.backgroundImage = "url(" + resp.url + ")";
      // var imgTitle = document.querySelector('.img-title');
      // imgTitle.innerHTML = "<p>" + resp[0].title + "</p>";
    })

  // fetch News
  var req = new Request(NEWS_API);
  fetch(req)
    .then(data => data.json())
    .then(data => {
      var newsElem = document.querySelector('.news');
      for (var i = 0; i < 10; i++) {
        newsElem.innerHTML = newsElem.innerHTML +
          "<div class=\"card\">" +
          "<img src=" + data.articles[i].urlToImage + "><br/><hr/>" +
          "<div class=\"title\"><a href=" + data.articles[i].url + "><span style=\"font-size:14px\">" + data.articles[i].title + "</span></a></div>" +
          //"<p>"+ data.articles[i].description.substr(0,120) +".. </p>"+
          "</div>";
      }
    })

  //fetch Weather
  fetch(WEATHER_API)
    .then(function(response) {
      return response.json();
    })
    .then(function(resp) {
      console.log("resp",resp);
      var cityElem = document.querySelector('.city');
      var tempElem = document.querySelector('.temp');
      var iconDescElem = document.querySelector('.iconDesc');
      var iconElem = document.querySelector('.icon');
      var weatherCode = resp.weather[0];
      var iconUrl = "http://openweathermap.org/img/w/" + weatherCode.icon + ".png";
      iconElem.innerHTML = ("<img src='" + iconUrl  + "'>");
      cityElem.innerHTML= resp.name;
      iconDescElem.innerHTML = weatherCode.main;
      tempElem.innerHTML=  "<span>" + resp.main.temp_min + " &#8451 </span>  < <strong> " + resp.main.temp + " &#8451 </strong>  < <span>" + resp.main.temp_max + " &#8451 </span>";

    })

  //fetch Quote
  fetch(QUOTES_API, init)
    .then(function(response) {
      return response.json();
    })
    .then(function(resp) {
      var quoteElm = document.querySelector('.quote');
      quoteElm.innerHTML = "<span class='leftQuote'></span><p>" + resp.quote + "</p> <span class='rightQuote'></span><br> - " + resp.author;
    })
})();

document.getElementById("showNews").addEventListener("click", displayNews);

function displayNews() {
  document.getElementById('showNews').style.display = "none";
  document.getElementById('hideNews').style.display = "block";
  document.getElementById('newsContainer').style.display = "inline-block";
}

document.getElementById("hideNews").addEventListener("click", hideNews);

function hideNews() {
  document.getElementById('showNews').style.display = "block";
  document.getElementById('hideNews').style.display = "none";
  document.getElementById('newsContainer').style.display = "none";
}


//Text Area Fucntion

(function() {

  function _makeDelayed() {
    var timer = 0;
    return function(callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  }

  function bindNoteHandlers() {
    var elem = document.getElementById('note-text'),
      saveHandler = _makeDelayed();

    function save() {
      chrome.storage.sync.set({
        'noteText': elem.value
      });
    }
    // Throttle save so that it only occurs after 1 second without a keypress.
    elem.addEventListener('keypress', function() {
      saveHandler(save, 1000);
    });
    elem.addEventListener('blur', save);
    chrome.storage.sync.get('noteText', function(data) {
      elem.value = data.noteText ? data.noteText : '';
    });
  }

  bindNoteHandlers();
})();

chrome.topSites.get(function(urls) {
  urls.forEach(function({
    url,
    title
  }) {
    console.log(url, title);
  })
});