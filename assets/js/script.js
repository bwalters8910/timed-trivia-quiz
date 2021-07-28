
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
     answer: "Blue Whale",
   },
   {
     text: "How many championships has Michael Jordan won?",
     choices: ["5", "6", "7", "8"],
     answer: "6",
   },
   {
     text: "How many bones are in the adult human body?",
     choices: ["312", "206", "162", "415"],
     answer: "206",
   },
   {
     text: "What is the national animal of Scotland?",
     choices: ["Jack Rabbit", "Highland Cow", "Red Deer", "Unicorn"],
     answer: "Unicorn",
   },
   {
     text: "How many feet are in a mile?",
     choices: ["4790", "5280", "6200", "5950"],
     answer: "5280",
   },
   {
     text: "Who was the 3rd president of the United States?",
     choices: [
       "George Washington",
       "Thomas Jefferson",
       "James Madison",
       "John Adams",
     ],
     answer: "Thomas Jefferson",
   },
   {
     text: "What time is 5:00 PM in military time?",
     choices: ["1500", "1600", "1700", "1800"],
     answer: "1700",
   },
   {
     text: "What team won the first ever Super Bowl?",
     choices: ["Bears", "Packers", "Chiefs", "Browns"],
     answer: "Packers",
   },
   {
     text: "What is a baby puffin called?",
     choices: ["Puffling", "Pouf", "Lil Puff", "Puffle"],
     answer: "Puffling",
   },
   {
     text:
       "Approximately how many grapes does it take to make a single bottle of wine?",
     choices: ["700", "300", "1100", "3000"],
     answer: "700",
   },
 ];

function init() {
  getHighScores();
  resetTimer();
};

function getHighScores() {
  questionPage.setAttribute("style", "display: none");
  finalPage.setAttribute("style", "display: none");

  let highScores = JSON.parse(localStorage.getItem("highScore"));
  //sort here by score key
  highScores.sort((a, b) => b.score - a.score);
  //loop through highscores array & display on title screen
  for (i = 0; i < highScores.length; i++) {
     let scoreLi = document.createElement("li");
    scoreLi.textContent = `${highScores[i].name}..................` + `${highScores[i].score}`;
    oldHighScoresTitle.appendChild(scoreLi);

  };
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
  questionPage.setAttribute("style", "display: flex");
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
    btn.textContent = `${firstQuestion.choices[i]}`;
    btn.classList.add("btn-success");
    btn.classList.add("btn");
    btn.addEventListener("click", handleAnswerClick);
    answerArea.appendChild(btn);
  }

};

function removeAnswerButtons() {
 // Removes the buttons/answers from previous question
document.querySelector(".answerDisplay").innerHTML = "";
};

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
    }
      else {
        timerCount = timerCount - 10;
        answerMessage.textContent = "WRONG!";
    }
    }
};


function renderFinalPage() {
  let totalPoints = timerCount + ansPoints;
  let initials = window.prompt("Enter initials for high score.");

  //create score object
  let highScoreObj = {
    name: initials,
    score: totalPoints,
  };


  //check local storage for existing scores, grab those
  if (localStorage.getItem('highScore') === null) {
    localStorage.setItem('highScore', '[]');
  }

  let oldHighScores = JSON.parse(localStorage.getItem('highScore'));
  oldHighScores.push(highScoreObj);

  localStorage.setItem('highScore', JSON.stringify(oldHighScores));

  questionPage.setAttribute("style", "display: none");
  finalPage.setAttribute("style", "display: flex");
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



