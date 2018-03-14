/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
const parentElement = document.getElementById("parent-list");
// const movesElement = document.getElementsByClassName("moves");
const movesElement = document.getElementById("moves");
const starOne = document.getElementById("star1");
const starTwo = document.getElementById("star2");
const starThree = document.getElementById("star3");
let clockActive = false;
let listChildren = parentElement.childNodes;
let numClicks = 0;
let faIcon = "";
let matchingCards = [];
let compareArray = [];
let iconArray = new Array(
  "fa fa-binoculars",
  "fa fa-gem",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-anchor",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-binoculars",
  "fa fa-bomb",
  "fa fa-leaf",
  "fa fa-bomb",
  "fa fa-bolt",
  "fa fa-bicycle",
  "fa fa-gem",
  "fa fa-cube"
);

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function displayCard(e) {
  faIcon = e.target.childNodes[1].classList[1];
  // show your clicked cards
  e.target.classList.toggle("open");
  e.target.classList.toggle("show");

  // save font awesome icon for comparison and current clicked card id
  compareArray.push(faIcon);
  matchingCards.push(e.target.id);
  if (compareArray.length == 2) {
    for (let i = 0; i < matchingCards.length; i++) {
      let cardx = document.getElementById(matchingCards[i]);
      if (compareArray[0] === compareArray[1]) {
        cardx.classList.toggle("match");
        changeState();
      } else {
        // hide the cards
        cardx.classList.toggle("open");
        cardx.classList.toggle("show");
      }
    }
    cleanArray();
  }
  updateCount(numClicks);
}

function updateCount(numClicks) {
  movesElement.innerHTML = numClicks;
}

function updateStar(star, forceShow) {
  if (forceShow === "block") {
    star.style.display = "block";
  } else {
    star.style.display = "none";
  }
}

function cleanArray() {
  while (compareArray.length > 0) {
    compareArray.pop();
  }
  while (matchingCards.length > 0) {
    matchingCards.pop();
  }
}

function startTimer() {
  if (clockActive) {
    let timer = document.getElementById("game-timer").innerHTML;
    let timeArray = timer.split(":");
    let hour = timeArray[0];
    let min = timeArray[1];
    let sec = timeArray[2];
    if (sec == 59) {
      if (min == 59) {
        hour++;
        min = 0;
        if (hour < 10) hour = "0" + hour;
      } else {
        min++;
      }
      if (min < 10) min = "0" + min;
      sec = 0;
    } else {
      sec++;
      if (sec < 10) sec = "0" + sec;
    }
    // update our html timer
    document.getElementById("game-timer").innerHTML =
      hour + ":" + min + ":" + sec;
    setTimeout(startTimer, 1000); // keep repeating with speed of 1 second
  }
}

function changeState() {
  if (clockActive == false) {
    clockActive = true;
    startTimer();
  } else {
    //check if all cards are flagged as matched
    let matchList = document.getElementsByClassName("match");
    if (matchList.length == 16) {
      clockActive = false;
      //simple alert
      // alert("CONGRATULATIONS! Game Completed!");
      swal("CONGRATULATIONS!", "Game Completed, you're AWESOME!", "success");
    }
  }
}

// Get the element, add a click listener...
parentElement.addEventListener("click", function(e) {
  // e.target is the clicked element!
  // If it was a list item
  if (e.target && e.target.nodeName == "LI") {
    // start timer
    changeState();
    // Display card symbol and increment click count.
    numClicks++;
    if (numClicks > 16) {
      if (numClicks >= 17 && numClicks < 33) {
        updateStar(star3, "none");
      } else {
        updateStar(star2, "none");
      }
    }

    displayCard(e);
  }
});

document.getElementById("restart").addEventListener("click", function() {
  document.getElementById("game-timer").innerHTML = "00:00:00";
  clockActive = false;
  numClicks = 0;
  updateCount(numClicks);
  updateStar(star1, "block");
  updateStar(star2, "block");
  updateStar(star3, "block");
  cleanArray();
  shuffle(iconArray);

  let j = 0;
  for (let i = 0; i < listChildren.length; i++) {
    if (listChildren[i].nodeName === "LI") {
      var iconElement = document.createElement("i");
      iconElement.setAttribute("class", iconArray[j]);
      //hide the front of the card
      listChildren[i].classList = "clearfix card";
      //replace the previous Font Awesome icon with the reshuffled icon
      listChildren[i].replaceChild(iconElement, listChildren[i].childNodes[1]);
      j++;
    }
  }
});

//force a restart event to make sure cards are shuffled
document.getElementById("restart").click();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
