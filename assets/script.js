//init page and pull stored data (user names & high scores)

//add event listener on the start button to show first question (add timer after you get the game funtioning)

//allow user to select answer via buttons (event listener for right answer)

//check user's answer and show some kind of (right/wrong) response, once they choose correctly allow them to proceed to the next question or show finish screen

//after all questions are answered, show the final score and prompt user to input their initials

//save the data locally to the page

let startButton = document.querySelector(".startBtn");
let titlePage = document.getElementById("titleContainer")
let questionPage = document.getElementById("questionContainer");
let finalPage = document.getElementById("finalPageContainer")
let rightAnswer = document.querySelector(".right");
let wrongAnswer = document.querySelector(".wrong");
let messageDisplay = document.querySelector(".message");
let pointsDisplay = document.querySelector(".total-points");
let points = 0;



function init() {
  getHighScores();
  questionPage.setAttribute("style", "display: none");
  finalPage.setAttribute("style", "display: none");
};

function getHighScores() {
  //check local storage for high scores & render them to the page

}

function startGame() {
  //window.alert("game starting");
  //hide title screen & show first question and answer choices as buttons
  titlePage.setAttribute("style", "display: none");
  questionPage.setAttribute("style", "display: block");

};

function displayFinish() {
  titlePage.setAttribute("style", "display: none");
  questionPage.setAttribute("style", "display: none");
  finalPage.setAttribute("style", "display: block");
  pointsDisplay.textContent = ` ${points}`;

};

function correctAnswer() {
  messageDisplay.textContent = "Correct!";
  points+=10;
  displayFinish();
};

function incorrectAnswer() {
  messageDisplay.textContent = "Wrong!";
  //subtract time
}

startButton.addEventListener("click", function () {
  startGame();
});


init();



