const keyboard = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const overlay = document.getElementById("overlay");
const startGame = overlay.querySelector(".btn__reset");
const scoreboard = document.getElementById("scoreboard");
const scoreboardOl = scoreboard.querySelector("ol");
var missed = 0;

const phrases = [
  "In the wind",
  "Busy as a bee",
  "Ran quickly",
  "Around the corder",
  "Blowing away"
];
overlay.addEventListener("click", e => {
  if (e.target === startGame) {
    overlay.style.display = "none";
  }
});
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

keyboard.addEventListener("click", e => {
  const target = e.target;
  if (target.tagName === "BUTTON") {
    const button = target;
    button.setAttribute("class", "chosen");
    button.setAttribute("disabled", "true");
    const letterFound = checkLetter(button);
    if (letterFound === null) {
      scoreboardOl.removeChild(scoreboardOl.firstElementChild);
      missed += 1;
    }
    checkWin();
  }
});

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

function getRandomPhraseAsArray(arr) {
  let newArray = [];
  let randomNumber = Math.floor(Math.random() * 5);
  let phrase = arr[randomNumber];
  for (let i = 0; i < phrase.length; i++) {
    newArray.push(phrase.charAt(i));
  }
  return newArray;
}

function addPhraseToDisplay(arr) {
  const ul = phrase.querySelector("ul");
  for (let i = 0; i < arr.length; i++) {
    let charactor = arr[i];
    const li = document.createElement("li");
    li.textContent = charactor;
    // If the character in the array is a letter and not a space the function should add the class “letter” to the list item.
    if (isLetter(charactor)) {
      li.className = "letter";
    }
    ul.appendChild(li);
  }
}

function checkLetter(button) {
  const btnText = button.textContent;
  const liwithLetter = phrase.querySelectorAll(".letter");
  var returnLetter = "";
  for (i = 0; i < liwithLetter.length; i++) {
    const li = liwithLetter[i];
    //If there’s a match, the function should add the “show” class to the list item containing that letter, store the matching letter inside of a variable, and return that letter.
    if (li.textContent.toLowerCase() === btnText) {
      li.className += " show";
      li.classList.add("animated", "tada");
      returnLetter = btnText;
    }
  }
  if (returnLetter.length != 0) {
    return returnLetter;
  } else {
    return null;
  }
}

function checkWin() {
  const numberOfLiwithLetter = phrase.querySelectorAll(".letter").length;
  const numberOfLiwithShow = phrase.querySelectorAll(".show").length;
  let messagewrapper = overlay.querySelector(".title");

  function createNewOverlay(classname, message) {
    overlay.className = classname;
    // create new start game button
    const newGame = document.createElement("a");
    newGame.textContent = "Let us start a new game";
    newGame.className = "btn__reset";
    newGame.setAttribute("href", "./index.html");
    // give new message to show up window win or lose this game
    messagewrapper.textContent = message;
    overlay.insertBefore(newGame, startGame);
    overlay.removeChild(startGame);
    overlay.style.display = "";
  }

  if (numberOfLiwithShow === numberOfLiwithLetter) {
    createNewOverlay("win", "Great! You Win This Game");
  } else if (missed >= 5) {
    createNewOverlay("lose", "Sorry! You Lose This Game");
  }
}
