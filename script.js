//------>> VARIABLES <<------

// QUESTIONS VARIABLE
const questions = [
    {
        question: "What is 2 + 2?",
        answers: [
            {answerText: "3", correct: false},
            {answerText: "4", correct: true},
            {answerText: "2", correct: false},
            {answerText: "0", correct: false},
        ]
    },
    {
        question: "What is 4 + 4?",
        answers: [
            {answerText: "4", correct: false},
            {answerText: "12", correct: false},
            {answerText: "1", correct: false},
            {answerText: "8", correct: true},
        ]
    },
    {
        question: "The more you take, the more you leave behind. What am I?",
        answers: [
            {answerText: "0", correct: ["time", "Time"]}
        ]
    }
];

// SETTING HTML ID TAGS AS VARIABLES
const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer");
const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const questionBox = document.getElementById("question-box");
const riddleBox = document.getElementById("riddle-box");

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

    // Clears the timeout for every character, then resets the array
    // Needed incase next question starts before typing entire question
    for (let i = 0; i < timeout.length; i++) {
        clearTimeout(timeout[i]);
    }
    timeout = [];

    nextButton.classList.add("hidden");
    nextButton.classList.add("enterAnim");
    answerElement.setAttribute("style", "")


    // --- SHOW QUESTIONS ---
    // Clear off any old questions and answers
    clearQuestion();
    // Make a variable that is the current question
    let currentQuestion = questions[currentQuestionIndex];
    // Make a variable that will be a number before the question
    let questionNo = currentQuestionIndex + 1;


    // Set HTML text of the question to queston number and current question

    let txt = questionNo + ". " + currentQuestion.question;
    questionElement.innerHTML = "";
    // Writes out the question with a small delay after each character
    for (let i = 0; i < txt.length; i++) {
        timeout.push(setTimeout(function () { questionElement.innerHTML += txt.charAt(i); }, 100*i));
    }

        if (currentQuestion.answers.length <= 1) {
                riddleRound(); 
        } else {
            // --- SHOW ANSWERS ---
            // Point to the answers in the questions and do a for each method, for each array value (4)
            currentQuestion.answers.forEach(answer => {
                // Create a variable that is a new button element
                const button = document.createElement("button");
                // button.classList.add("enterAnim");
                // Set the button HTML to the answer text
                button.innerHTML = answer.answerText; 
                // Add the answer class to the button for styling etc.
                button.classList.add("answer");
                // Add buttons to the div
                answerElement.appendChild(button); 
        
        
                // When button is clicked check is true or false
                button.addEventListener("click", function() { answerCheck(answer, button); });
            });
        }
    
    // questionElement.innerHTML = questionNo + ". " + currentQuestion.question;


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
        
        // setTimeout(function(){ nextButton.classList.remove("hidden"); }, 2000);
    } else {
        b.classList.add("false");
        answerElement.setAttribute("style", "pointer-events: none;")
        
        // setTimeout(function(){ nextButton.classList.remove("hidden"); }, 2000);
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

function showScore() {
    clearQuestion();
    for (let i = 0; i < timeout.length; i++) {
        clearTimeout(timeout[i]);
    }
    timeout = [];
    questionElement.innerHTML = "You scored " + score + " out of " + questions.length;

    document.getElementById("finish").innerHTML = "Go Again";
    nextButton.classList.remove("hidden");
    nextButton.addEventListener("click", showQuestion);
}

function riddleRound() {
    console.log("Riddle Round");
    riddleBox.classList.remove("hidden");
    riddleBox.setAttribute("style", "pointer-events: auto;")
}

// This function is called in html <form> element when user enters into text box
function checkInput() {

    let textBox = document.getElementById('text-box');
    let userInput = textBox.value;
    let currentQuestion = questions[currentQuestionIndex];

    riddleBox.setAttribute("style", "pointer-events: none;")

    currentQuestion.answers.forEach(ans => {

        for (let i = 0; i < ans.correct.length; i++) {
            if (ans.correct[i] === userInput) {
                console.log("correct");
                score++;
            } else {
                console.log("incorrect");
            }
        }
        
        document.getElementById('text-box').value = "";

        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion();
            riddleBox.classList.add("hidden");
        } else {
            currentQuestionIndex = 0;
            showScore();
            riddleBox.classList.add("hidden");
            score = 0;
        }
    });
    
  }


startQuiz();


