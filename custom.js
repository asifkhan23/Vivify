var beautifulNewTab = (function beautifulNewTab() {

  //var QUOTES_API = "https://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en";
  var QUOTES_API = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous";
  //var IMAGE_API = "https://api.nasa.gov/planetary/apod?api_key=U1FBlDl0BCK0NL5MGNQANPy8PJJL5Z5p509k7vV1&count=1";
  var IMAGE_API = "https://source.unsplash.com/random";

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
    var time = dateObj.getHours() + ":" + dateObj.getMinutes() + ":" + dateObj.getSeconds();

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

  //fetch quote
  fetch(QUOTES_API, init)
    .then(function(response) {
      return response.json();
    })
    .then(function(resp) {
      var quoteElm = document.querySelector('.quote');
      quoteElm.innerHTML = "<span class='leftQuote'></span><p>" + resp.quote + "</p> <span class='rightQuote'></span><br> - " + resp.author;
    })
})();