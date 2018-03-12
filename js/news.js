var NEWS_API = "https://newsapi.org/v2/top-headlines?country=us&apiKey=38f90da811ac4deb8486698e997fe0c6"

// fetch News
var req = new Request(NEWS_API);
fetch(req)
  .then(data => data.json())
  .then(data => {
    var newsElem = document.querySelector('.news');
    for (var i = 0; i < 10; i++) {
      if (data.articles[i].urlToImage != null) {
        var titleFull = data.articles[i].title;
        if (titleFull.length > 60) {
          titleFull = titleFull.substring(0, 59) + "...";
        }
        newsElem.innerHTML = newsElem.innerHTML +
          "<div class=\"card\">" +
          "<img src=" + data.articles[i].urlToImage + ">" +
          "<div class=\"title\"><a href=" + data.articles[i].url + "><span style=\"font-size:2vh\">" + titleFull + "</span></a></div>" +
          //"<p>"+ data.articles[i].description.substr(0,120) +".. </p>"+
          "</div>";
      }
    }
  })

// Show/Hide News
document.getElementById("toggleDiv").addEventListener("click", displayNews);

function displayNews() {
  if (document.getElementById("NewsToggle").innerText == "<") {
    document.getElementById("newsContainer").style.transition = "width 0.25s";
    document.getElementById("down").style.transition = "width 0.25s";
    //document.getElementById("newsContainer").style.transitionTimingFunction = "ease-in"

    document.getElementById("newsContainer").style.width = "0vw";
    document.getElementById("down").style.width = "0vw";

    document.getElementById("newsContainer").style.boxShadow = "box-shadow: 0px 0px 0px transparent";
    document.getElementById("NewsToggle").innerText = ">";
  } else {
    document.getElementById("newsContainer").style.transition = "width 0.5s";
    document.getElementById("down").style.transition = "width 0.5s";
    //document.getElementById("newsContainer").style.transitionTimingFunction = "ease-out"

    document.getElementById("newsContainer").style.width = "18vw";
    document.getElementById("down").style.width = "100%";

    document.getElementById("newsContainer").style.boxShadow = "box-shadow: 1px 1px 5px #555";
    document.getElementById("NewsToggle").innerText = "<";
  }
}

// Scroll News Tab

document.getElementById("down").addEventListener("mousedown", scrollNews);

function scrollNews() {
  document.getElementsByClassName("newsContainer").scrollTop = +10;
}