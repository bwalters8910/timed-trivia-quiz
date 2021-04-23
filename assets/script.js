
let startButton = document.querySelector(".startBtn");
let restartButton = document.querySelector(".restartBtn")
let titlePage = document.getElementById("titleContainer");
let questionPage = document.getElementById("questionContainer");
let questionArea = document.querySelector(".questionDisplay");
let answerMessage = document.querySelector(".message");
let finalPage = document.getElementById("finalPageContainer");
let timerElement = document.querySelector(".timer-display");
let timer;
let timerCount;
let score = localStorage.getItem("score");
let highScoreDisplay = document.querySelector(".highScoreArea");
let ansPoints = 0;
let oldHighScoresTitle = document.querySelector(".high-score-title");



 let questions = [
   {
     text: "What's the largest animal to have ever roamed the earth?",
     choices: ["Megalodon", "Brachiosaurus", "Blue Whale", "Woolly Mammoth"],
     answer: "3. Blue Whale",
   },
    {
      text: "How many bones are in the adult human body?",
      choices: ["312", "206", "162", "415"],
      answer: "2. 206",
    },
    {
      text: "What period of time was T-Rex alive?",
      choices: ["Jurassic", "Triassic", "Permian", "Cretaceous"],
      answer: "4. Cretaceous",
    },
 ];


function init() {
  getHighScores();
  questionPage.setAttribute("style", "display: none");
  finalPage.setAttribute("style", "display: none")
  resetTimer();
};

//still working on getting values saved as object
function getHighScores() {
  let highScores = JSON.parse(localStorage.getItem("highScore"));
  document.querySelector(".high-score-title").textContent = `${highScores.name}..................` + `${highScores.score}`;

  //check local storage for high scores & render them to the page
  //get array from local storage as string & conver using parse, then loop in order to render

};

function startTimer() {
  // Sets timer
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount <= 0) {
      // Clears interval
      clearInterval(timer);
      window.alert("Time has expired!")
      renderFinalPage();
    }
  }, 1000);
}


function resetTimer() {
  timerCount = 60;
}


function startGame() {
  //hide title screen & show question screen
  timerCount = 60;
  titlePage.setAttribute("style", "display: none");
  questionPage.setAttribute("style", "display: block");
  checkArrayLength();
  startTimer();
};


function checkArrayLength() {
  if (questions != "") {
      renderQuestion();
  }
  else {
    renderFinalPage();
    }
}

function renderQuestion() {
  //pulls first question from array and displays on screen
  answerMessage.textContent = '';
  let answerArea = document.querySelector(".answerDisplay");
  let firstQuestion = questions[0];
  document.querySelector(".questionDisplay").textContent = firstQuestion.text

  //loop that generates answer buttons & dynamically fills them with answer text
  for (let i = 0; i < firstQuestion.choices.length; i++) {
    let btn = document.createElement("BUTTON");
    btn.textContent = `${i+1}. ${firstQuestion.choices[i]}`;
    btn.addEventListener("click", handleAnswerClick);
    answerArea.appendChild(btn);
  }

};

function removeAnswerButtons() {
 // Removes the buttons/answers from previous question
document.querySelector(".answerDisplay").innerHTML = "";
};

 //still need to add points for correct answer
function handleAnswerClick() {
  //take the textContent of button and compare to correct answer
  //if correct proceed to next qeuestion or final screen
  //else deduct 10 seconds
  document.querySelector(".answerDisplay").onclick = function (event) {
    let clickedAnswer = event.target.innerHTML;
    console.log(clickedAnswer);

    if (clickedAnswer === questions[0].answer) {
      answerMessage.textContent = "CORRECT!";
      ansPoints = ansPoints + 10;
      removeAnswerButtons();
      questions.shift();
      checkArrayLength();
      //add points for correct answer
    }

      else {
        timerCount = timerCount - 10;
        answerMessage.textContent = "WRONG!";

    }

    }
};

//need to store initals and score as object, then save locally
function renderFinalPage() {
  let totalPoints = timerCount + ansPoints
  let initials = window.prompt("Enter initials for high score.")
  //check local storage for existing scores, grab those


  //set variable to empty array
  let highScores = [];

  //create score object
  let highScoreObj = {
    name: initials,
    score: totalPoints,
  }
  highScores.push(highScoreObj)


  //save this new array back to local storage
  localStorage.setItem("highScore", JSON.stringify(highScoreObj));
  questionPage.setAttribute("style", "display: none");
  finalPage.setAttribute("style", "display: block");
  highScoreDisplay.textContent = totalPoints;
  clearInterval(timer);

};

startButton.addEventListener("click", function () {
  startGame();
});

restartButton.addEventListener("click", function () {
  location.reload();
});

init();



