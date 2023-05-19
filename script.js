//------>> VARIABLES <<------

// SETTING HTML ID TAGS AS VARIABLES
const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer");
const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const questionBox = document.getElementById("question-box");
const riddleBox = document.getElementById("riddle-box");
const guessBox = document.getElementById("guess-box");
const textBox = document.getElementById("text-box");
const form = document.getElementById("form");
const prog = document.getElementById("prog-bar");

let currentQuestionIndex = 0;
let score = 0;

// timeout will hold the timeoutID for each character in showQuestion() for type writer effect
// timeout = empty array, needs to be array because different timeouts for each char
let timeout = [];


//------>> FUNCTIONS <<------


// THIS FUNCTION STARTS THE QUIZ
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    startButton.addEventListener("click", clearHidden);
}

// THIS FUNCTION MOVES FROM START TO QUESTIONS
function clearHidden() {
    answerElement.classList.remove("hidden");
    questionBox.classList.remove("hidden");
    startButton.classList.add("hidden");
    showQuestion();
}

// THIS FUNCTION CREATES A NEW QUESTION
function showQuestion() {

    updateProgBar();
    // Clears the timeout for every character, then resets the array
    // Needed incase next question starts before typing entire question
    for (let i = 0; i < timeout.length; i++) {
        clearTimeout(timeout[i]);
    }
    timeout = [];

    riddleBox.classList.add("hidden");
    nextButton.classList.add("hidden");
    nextButton.classList.add("enterAnim");
    answerElement.setAttribute("style", "")

    // Clear off any old questions and answers
    clearQuestion();
 
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;


    // Set HTML text of the question to queston number + current question
    let txt = questionNo + ". " + currentQuestion.question;
    questionElement.innerHTML = "";

    // For every character of the question push a new character to a new spot of the timeout array
    for (let i = 0; i < txt.length; i++) {
                                           // question element += next character of the question. Wait 100ms * i for every character, so every character has a longer wait time than the last.
        timeout.push(setTimeout(function () { questionElement.innerHTML += txt.charAt(i); }, 50*i));
    };

    // If there is only 1 answer in the question variable it must be a riddle question so execute code
    if (currentQuestion.answers.length <= 1) {
            riddleRound(); 
    } else {
        // If not it is a normal 4 answer question
        // For each answer (4 answers)
        currentQuestion.answers.forEach(answer => {
            // Create a variable that is a new button element then set the text to the answer text and add the answer class style. Then append button to answer container
            const button = document.createElement("button");
            button.innerHTML = '<h3>' + answer.answerText + '</h3>'; 
            button.classList.add("answer");
            answerElement.appendChild(button); 
        
            // When button is clicked check is true or false
            button.addEventListener("click", function() { answerCheck(answer, button); });
        });
    };
}

// THIS FUNCTION CLEARS THE QUESTION AND ALL ANSWERS
function clearQuestion() {
    // execute code as long as answers <div> has children (4 times)
    while(answerElement.firstChild){
        // removes all children
        answerElement.removeChild(answerElement.firstChild);
    }
}

// THIS FUNCTION CHECKS IF THE ANSWER IS CORRECT
function answerCheck(a,b) {
    // "a" is current question "b" is button

    nextButton.classList.remove("hidden");
    nextButton.addEventListener("click", showQuestion);


    // If question is correct
    if (a.correct) {
        b.classList.add("correct");
        answerElement.setAttribute("style", "pointer-events: none;")
        score++;
    } else {
        b.classList.add("false");
        answerElement.setAttribute("style", "pointer-events: none;")
    }

    // If at end of questions
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
    } else {
        currentQuestionIndex = 0;
        nextButton.removeEventListener("click", showQuestion);
        nextButton.addEventListener("click", showScore);
    }
}

// THIS FUNCTION SHOWS THE SCORE AT THE END OF THE QUIZ
function showScore() {

    clearQuestion();
    for (let i = 0; i < timeout.length; i++) {
        clearTimeout(timeout[i]);
    }
    timeout = [];
    questionElement.innerHTML = "You scored " + score + " out of " + questions.length;

    document.getElementById("finish").innerHTML = "Go Again";
    nextButton.classList.remove("hidden");
    score = 0;
    console.log("SCORE CLEARED");
    nextButton.removeEventListener("click", showScore);
    nextButton.addEventListener("click", showQuestion);
}

// THIS FUNCTION SETS UP THE QUIZ AS A RIDDLE ROUND
function riddleRound() {
    textBox.classList.remove("hidden");
    guessBox.innerHTML = "Make a guess!";
    riddleBox.classList.remove("hidden");
    guessBox.classList.remove("correct");
    guessBox.classList.remove("false");
    riddleBox.setAttribute("style", "pointer-events: auto;")
}

// THIS CHECKS USER INPUT ON THE RIDDLE ROUND, CALLED IN HTML <DIV> ELEMENT
function checkInput() {

    let textBox = document.getElementById('text-box');
    let userInput = textBox.value;
    let currentQuestion = questions[currentQuestionIndex];

    riddleBox.setAttribute("style", "pointer-events: none;")
    console.log(userInput);
    // For each answer (only 1 in riddle round)
    currentQuestion.answers.forEach(ans => {
        
        // For every possible answer in the answer array
        for (let i = 0; i < ans.correct.length; i++) {
            if (ans.correct[i] == userInput) {
                score++;
                guessBox.classList.add("correct");
                guessBox.innerHTML = "Correct!";
                textBox.classList.add("hidden");
                break;
            } else {
                guessBox.classList.add("false");
                guessBox.innerHTML = "False!";
                textBox.classList.add("hidden");
            }
        }
        
        document.getElementById('text-box').value = "";

        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            nextButton.classList.remove("hidden");
            nextButton.removeEventListener("click", showScore);
            nextButton.addEventListener("click", showQuestion);
        } else {
            currentQuestionIndex = 0;
            nextButton.classList.remove("hidden");
            nextButton.addEventListener("click", showScore);
            nextButton.removeListener("click", showQuestion);
            showScore();
        }
    });
    
  }

// THIS FUNCTION ALLOWS THE ENTER KEY TO PRESS THE NEXT BUTTON
function enterPressed() {

    document.addEventListener("keypress", function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
        }
      });
    document.addEventListener("keyup", function(event) {
        if (event.keyCode == 13) {
          nextButton.click();
        }
      });
}

function updateProgBar() {
    let progress = currentQuestionIndex / questions.length * 100;
    prog.style.width = progress + '%';
    console.log(progress);
}

startQuiz();
enterPressed();


// QUESTIONS VARIABLE
const questions = [
    {
        question: "Name the song title: No ____ No Cry",
        answers: [
            {answerText: "Boy", correct: false},
            {answerText: "Woman", correct: true},
            {answerText: "Please", correct: false},
            {answerText: "Cry", correct: false},
        ]
    },
    {
        question: "What is the name of the drum break that has been widely sampled in popular music?",
        answers: [
            {answerText: "Funky Break", correct: false},
            {answerText: "Thunder Break", correct: false},
            {answerText: "Soulful Break", correct: false},
            {answerText: "Amen Break", correct: true},
        ]
    },
    {
        question: "The more you take, the more you leave behind. What am I?",
        answers: [
            {answerText: "0", correct: ["time", "Time"]}
        ]
    },
    {
        question: "What are the odds of getting a royal flush in poker?",
        answers: [
            {answerText: "4,165 : 1", correct: false},
            {answerText: "649,739 : 1", correct: true},
            {answerText: "72,192 : 1", correct: false},
            {answerText: "6,489,982 : 1", correct: false},
        ]
    },
    {
        question: "What can you hold in your right hand but never your left?",
        answers: [
            {answerText: "0", correct: ["left hand", "Left Hand", "Your left hand", "your left hand"]}
        ]
    },
    {
        question: "What element is number 1 on the periodic table?",
        answers: [
            {answerText: "Helium", correct: false},
            {answerText: "Sodium", correct: false},
            {answerText: "Hydrogen", correct: true},
            {answerText: "Oxygen", correct: false},
        ]
    },
];
