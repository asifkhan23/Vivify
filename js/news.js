var NEWS_API = "https://newsapi.org/v2/top-headlines?country=us&apiKey=38f90da811ac4deb8486698e997fe0c6"

// fetch News
var req = new Request(NEWS_API);
fetch(req)
  .then(data => data.json())
  .then(data => {
      //console.log(data);
      var newsElem = document.querySelector('.news');
      var author, titleFull, author2, titleFull2, author3, titleFull3;
      for (var i = 0; i < 15; i += 3) {
          if (data.articles[i].urlToImage != null) {
              //==1
              titleFull = data.articles[i].title;
              if (titleFull.length > 60) {
                  titleFull = titleFull.substring(0, 59) + "...";
              }
              if (data.articles[i].author == null) {
                  author = data.articles[i].source.name;
              }
              else {
                  author = data.articles[i].author;
              }
              //===2
              titleFull2 = data.articles[i + 1].title;
              if (titleFull2.length > 60) {
                  titleFull2 = titleFull2.substring(0, 59) + "...";
              }
              if (data.articles[i + 1].author == null) {
                  author2 = data.articles[i + 1].source.name;
              }
              else {
                  author2 = data.articles[i + 1].author;
              }
              //===3
              titleFull3 = data.articles[i + 2].title;
              if (titleFull3.length > 60) {
                  titleFull3 = titleFull3.substring(0, 59) + "...";
              }
              if (data.articles[i + 2].author == null) {
                  author3 = data.articles[i + 2].source.name;
              }
              else {
                  author3 = data.articles[i + 2].author;
              }
              newsElem.innerHTML = newsElem.innerHTML +
              "<div class=\"flexcolumn\" >" +
                  "<div class=\"card\">" +
                      "<img src=" + data.articles[i].urlToImage + ">" +
                      "<div class=\"title\"><a href=" + data.articles[i].url + "><span style=\"font-size:2vh\">" + titleFull + "</span></a></div>" +
                      "<div class=\"newsDesc\"><p>" + data.articles[i].description.substr(0, 120) + ".. </p></div>" +
                      "<div class=\"author\"><p>" + author + "</p></div>" +
                  "</div>" +
                  "<div class=\"card\">" +
                      "<img src=" + data.articles[i + 1].urlToImage + ">" +
                      "<div class=\"title\"><a href=" + data.articles[i + 1].url + "><span style=\"font-size:2vh\">" + titleFull2 + "</span></a></div>" +
                      "<div class=\"newsDesc\"><p>" + data.articles[i + 1].description.substr(0, 120) + ".. </p></div>" +
                      "<div class=\"author\"><p>" + author2 + "</p></div>" +
                  "</div>" +
                  "<div class=\"card\">" +
                      "<img src=" + data.articles[i + 2].urlToImage + ">" +
                      "<div class=\"title\"><a href=" + data.articles[i + 2].url + "><span style=\"font-size:2vh\">" + titleFull3 + "</span></a></div>" +
                      "<div class=\"newsDesc\"><p>" + data.articles[i + 2].description.substr(0, 120) + ".. </p></div>" +
                      "<div class=\"author\"><p>" + author3 + "</p></div>" +
                  "</div>" +
              "</div>";
          }
      }
  })

// Show/Hide News
document.getElementById("toggleDiv").addEventListener("click", displayNews);
document.getElementById("collapseNews").addEventListener("click", hideNews);

function displayNews() {
    document.getElementById("newsContainer").style.transition = "width 0.5s";
    document.getElementById("down").style.transition = "width 0.5s";
    //document.getElementById("newsContainer").style.transitionTimingFunction = "ease-out"

    document.getElementById("newsContainerParent").style.width = "100vw";
    document.getElementById("newsContainer").style.width = "100vw";
    document.getElementById("down").style.width = "100%";

    document.getElementById("newsContainer").style.boxShadow = "box-shadow: 1px 1px 5px #555";
}

function hideNews() {
    document.getElementById("newsContainer").style.transition = "width 0.25s";
    document.getElementById("down").style.transition = "width 0.25s";
    //document.getElementById("newsContainer").style.transitionTimingFunction = "ease-in"

    document.getElementById("newsContainerParent").style.width = "0vw";
    document.getElementById("newsContainer").style.width = "0vw";
    document.getElementById("down").style.width = "0vw";

    document.getElementById("newsContainer").style.boxShadow = "box-shadow: 0px 0px 0px transparent";
}

// Scroll News Tab

document.getElementById("down").addEventListener("mousedown", scrollNews);

function scrollNews() {
    document.getElementsByClassName("newsContainer").scrollTop = +10;
}