var beautifulNewTab = (function beautifulNewTab() {
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
  fetch('https://api.nasa.gov/planetary/apod?api_key=U1FBlDl0BCK0NL5MGNQANPy8PJJL5Z5p509k7vV1&count=4')
    .then(function(response) {
      return response.json();
    })
    .then(function(resp) {
      var imageElem = document.querySelector('.contentContainer');
      imageElem.innerHTML = "<div style=background-image:url(" + resp[3].url + ")></div>";
      var imgTitle = document.querySelector('.img-title');
      imgTitle.innerHTML = "<p>" + resp[3].title + "</p>";
    })

  //fetch quote
  fetch('https://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en')
    .then(function(response) {
      return response.json();
    })
    .then(function(resp) {
      var quoteElm = document.querySelector('.quote');
      quoteElm.innerHTML = "<span class='leftQuote'></span><p>" + resp.quoteText + "<span class='rightQuote'></span></p>";
    })
})();