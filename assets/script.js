//init page and pull stored data (user initials & high scores) then display on title screen

//add event listener on the start button to pull question from array of objects and display on the screen (add timer after you get the game funtioning)

//allow user to select answers using event listeners (+10 points for correct answer and pull another question from the array, wrong answer display message "WRONG" and deduct time)

//when user answers all questions correctly (or time runs out), display "YOU HAVE FINISHED THE QUIZ" and show total score. Prompt user to enter initials. Save that info locally & display scores on final screen

//add try again/reset button to the final page


let startButton = document.querySelector(".startBtn");
let titlePage = document.getElementById("titleContainer");
let questionPage = document.getElementById("questionContainer");
let questionArea = document.querySelector(".questionDisplay");
let answerMessage = document.querySelector(".message");
let finalPage = document.getElementById("finalPageContainer");
let timerElement = document.querySelector(".timer-display");
let timer;
let timerCount;


 let questions = [
   {
     text: "What's the largest animal to have ever roamed the earth?",
     choices: ["Megalodon", "Brachiosaurus", "Blue Whale", "Woolly Mammoth"],
     answer: "3. Blue Whale",
   },
  //  {
  //    text: "How many bones are in the adult human body?",
  //    choices: ["312", "206", "162", "415"],
  //    answer: "206",
  //  },
  //  {
  //    text: "What period of time was T-Rex alive?",
  //    choices: ["Jurassic", "Triassic", "Permian", "Cretaceous"],
  //    answer: "Cretaceous",
  //  },
 ];


function init() {
  getHighScores();
  questionPage.setAttribute("style", "display: none");
  finalPage.setAttribute("style", "display: none")
};

function getHighScores() {
  //check local storage for high scores & render them to the page
  // let highScores = JSON.parse(localStorage.getItem("storedScores"));
  // if (highScores !== null) {
  //   document.querySelector(".scores").textContent = highScores.name + highScores.score
  // }

};

function startTimer() {
  // Sets timer
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      renderFinalPage();
    }
  }, 1000);
}



function startGame() {
  //hide title screen & show question screen
  timerCount = 60;
  titlePage.setAttribute("style", "display: none");
  questionPage.setAttribute("style", "display: block");
  renderQuestion();
  startTimer();
};

// function getQuestion() {
//   //stores first question object from questions array locallay as string
//   localStorage.setItem("questions", JSON.stringify(questions[0]));
//   renderQuestion();
//      };

//add comment for renderquestion functionality
function renderQuestion() {
  //pulls first question from array and displays on screen
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
 }

function handleAnswerClick() {
  //take the textContent of button and compare to correct answer
  //if correct proceed to next qeuestion or final screen
  //else deduct 5 seconds
  document.querySelector(".answerDisplay").onclick = function (event) {
    let clickedAnswer = event.target.innerHTML;
    console.log(clickedAnswer);

      if (clickedAnswer === questions[0].answer) { //try this.answer here
        renderFinalPage();
        //try removing question from array with .shift() here
        //break;

      } else {
        timerCount = timerCount - 7;
        answerMessage.textContent = "WRONG!";

      }
    }
  };


function renderFinalPage() {
  questionPage.setAttribute("style", "display: none");
  finalPage.setAttribute("style", "display: block");
}

startButton.addEventListener("click", function () {
  startGame();
});


init();



