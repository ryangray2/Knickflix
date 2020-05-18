var currTags = [];

function start() {
  setTimeout(function() {
    document.getElementById("logoFlash").style.display = "none";
      document.getElementById("startPage").style.display = "block";
  }, 2100)
  console.log(gameArray);
  createTagButtons();
  getTags();

}

function reload() {
  location.reload();
}

function completelyRandom() {
  var gameNum = (Math.ceil(Math.random() * gameArray.length)) - 1;
  console.log(gameArray[gameNum].title);
  if (gameNum < 0) {
    gameNum = 0;
  }
  goToGame(gameArray[gameNum]);
}

function goToGame(game) {
  document.getElementById("startPage").classList.remove("fadeInTarget");
  document.getElementById("startPage").classList.add("fadeOutTarget");
  document.getElementById("searchButton").style.display = "none";
  setTimeout(
    function(){
      document.getElementById("startPage").style.display = "none";
      document.getElementById("gamePage").style.display = "block";
      document.getElementById("gameEmbed").src = "https://www.youtube.com/embed/" + game.link.slice(17, game.link.length);
    } ,1000);
    setTimeout(
      function(){
        document.getElementById("gameEmbed").style.display = "block";

        document.getElementById("gameTitle").innerHTML = game.title;
      } ,1500);

}

function getTags() {
  var tagArray = [];
  for (let i = 0; i < gameArray.length; i++) {
    for (let j = 0; j < gameArray[i].tags.length; j++) {
      if (!tagArray.includes(gameArray[i].tags[j])) {
        tagArray.push(gameArray[i].tags[j]);
      }
    }
  }
  return tagArray;
  console.log(tagArray);
}

function getTags2(arr) {
  var tagArray = [];
  for (let i = 0; i < gameArray.length; i++) {
    var has = true;
    for (let k = 0; k < arr.length; k++) {
      if (!gameArray[i].tags.includes(arr[k])) {
        has = false;
      }
    }
    if (has === true) {
      for (let j = 0; j < gameArray[i].tags.length; j++) {
        if (!tagArray.includes(gameArray[i].tags[j])) {
          tagArray.push(gameArray[i].tags[j]);
        }
      }
    }
  }

  return tagArray;
}


function createTagButtons() {
  var tags = getTags();
  console.log(tags);
  const tagsDiv = document.getElementById("tags");
  for (let i = 0; i < tags.length; i++) {
    const column = document.createElement("div");
    column.classList.add("col-xs-4");
    const but = document.createElement("a");
    but.classList.add( );
    but.style.backgroundImage = "url('" + tags[i].image + "')";
    but.addEventListener('click', function() {
           tagPressedFinal(tags[i]);
       });
       let  gifholder = tags[i].gif;
       if (tags[i].gif != "") {
         but.addEventListener('mouseover', function() {
           but.style.backgroundImage = "url('" + gifholder + "')";
             });
         but.addEventListener('mouseout', function() {

              but.style.backgroundImage = "url('" + tags[i].image + "')";
           });
       }
       document.getElementById(tags[i].category).appendChild(but);
  }
}

function createTagButtons2() {
  var tags = getTags2(currTags);
  const tagsDiv = document.getElementById("tags");
  for (let i = 0; i < tags.length; i++) {
    const column = document.createElement("div");
    column.classList.add("col-xs-4");
    const but = document.createElement("button");
    but.classList.add("center-block", "btn", "btn-primary", "btn-lg", "test");
    but.innerHTML = tags[i].title;
    but.setAttribute("id", tags[i] + "Button")
    but.addEventListener('click', function() {
           tagPressed(tags[i]);
       });
    column.appendChild(but);
    tagsDiv.appendChild(column);
  }
}

function aPressed(tag) {
  currTags.push(tag);
  tagsGo();
}

function searchTagPressed(thegame) {
  document.getElementById("startPage").style.display = "none";
  goToGame(thegame);
}

function tagPressedFinal(tag) {
  document.getElementById("startPage").style.display = "none";
  document.getElementById("specificsPage").style.display = "block";

  var myNode = document.getElementById("currentTags");
  while (myNode.lastElementChild) {
    myNode.removeChild(myNode.lastElementChild);
  }

  var myNode2 = document.getElementById("remainingTags");
  while (myNode2.lastElementChild) {
    myNode2.removeChild(myNode2.lastElementChild);
  }

  currTags.push(tag);
  if (currTags.includes(kristaps)) {
    specificsPlay();
    return;
  }
  for(let i = 0; i < currTags.length; i++) {
    const column = document.createElement("div");
    column.classList.add("col-xs-4");
    const but = document.createElement("a");
    but.classList.add( );
    but.style.backgroundImage = "url('" + currTags[i].image + "')";
    document.getElementById("currentTags").appendChild(but);
  }
    var tags = getTags2(currTags);
  for(let i = 0; i < tags.length; i++) {
    if (currTags.includes(tags[i])) {
      continue;
    }
    const column = document.createElement("div");
    column.classList.add("col-xs-4");
    const but = document.createElement("a");
    but.classList.add( );
    but.style.backgroundImage = "url('" + tags[i].image + "')";
    but.addEventListener('click', function() {
           tagPressedFinal(tags[i]);
       });
       let  gifholder = tags[i].gif;
       if (tags[i].gif != "") {
         but.addEventListener('mouseover', function() {
           but.style.backgroundImage = "url('" + gifholder + "')";
             });
         but.addEventListener('mouseout', function() {

              but.style.backgroundImage = "url('" + tags[i].image + "')";
           });
       }
       document.getElementById("remainingTags").appendChild(but);
  }

}

function specificsPlay() {
  tagsGo();
  document.getElementById("specificsPage").classList.add("fadeOutTarget");
  setTimeout(function() {
    document.getElementById("specificsPage").style.display = "none";
  }, 1000)
}

function tagPressed(tag) {
  currTags.push(tag);
  console.log(currTags);
  var myNode = document.getElementById("tags");
  while (myNode.lastElementChild) {
    myNode.removeChild(myNode.lastElementChild);
  }
  createTagButtons2()
  for (var i = 0; i < currTags.length; i++) {
    document.getElementById(currTags[i] + "Button").style.backgroundColor = "orange";
  }
}

function tagsGo() {
  var potentialGames = [];
  for (let i = 0; i < gameArray.length; i++) {
    var has = true;
    for (let k = 0; k < currTags.length; k++) {
      if (!gameArray[i].tags.includes(currTags[k])) {
        has = false;
      }
    }
    if (has === true) {
      potentialGames.push(gameArray[i]);
    }
  }
  var gameNum = (Math.floor(Math.random() * potentialGames.length));
  if (gameNum < 0) {
    gameNum = 0;
  }
  if (gameNum > (potentialGames.length - 1)) {
    gameNum = potentialGames.length - 1;
  }
  console.log(gameNum);
  console.log(potentialGames);
  console.log(potentialGames[gameNum].title);
  goToGame(potentialGames[gameNum]);
}

function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function populateSearch() {
  for (let i = 0; i < gameArray.length; i++) {
    if(gameArray[i] === kristapsGame) {
      continue;
    }
    var item = document.createElement("li");
    var anchor = document.createElement("a");
    anchor.innerHTML = gameArray[i].title;
    anchor.addEventListener('click', function() {
           searchTagPressed(gameArray[i]);
       });
    item.appendChild(anchor);
    document.getElementById("myUL").appendChild(item);

  }
}

function goToSearch() {
  if (document.getElementById("search").style.display === "block") {
    document.getElementById("search").style.display = "none";
    document.getElementById("search").classList.remove("slide-in-top");
  } else {
    document.getElementById("search").classList.add("slide-in-top");
    document.getElementById("search").style.display = "block";
    populateSearch();
  }
}
