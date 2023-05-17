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
    }
];

// SETTING HTML ID TAGS AS VARIABLES
const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer");
const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const questionBox = document.getElementById("question-box");

let currentQuestionIndex = 0;
let score = 0;

//---------------------------



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
    nextButton.classList.remove("hidden");
    startButton.classList.add("hidden");
    showQuestion();
}

// THIS FUNCTION CREATES A NEW QUESTION
function showQuestion() {

    answerElement.setAttribute("style", "")


    // --- SHOW QUESTIONS ---
    // Clear off any old questions and answers
    clearQuestion();
    // Make a variable that is the current question
    let currentQuestion = questions[currentQuestionIndex];
    // Make a variable that will be a number before the question
    let questionNo = currentQuestionIndex + 1;
    // Set HTML text of the question to queston number and current question
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    // --- SHOW ANSWERS ---
    // Point to the answers in the questions and do a for each method, for each array value (4)
    currentQuestion.answers.forEach(answer => {
        // Create a variable that is a new button element
        const button = document.createElement("button");
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
    console.log("Check Answer");
    // "a" is current question answer from showQuestion function
    if (a.correct) {
        console.log("CORRECT");
        b.classList.add("correct");
        answerElement.setAttribute("style", "pointer-events: none;")
        score++;
    } else {
        console.log("FALSE");
        b.classList.add("false");
        answerElement.setAttribute("style", "pointer-events: none;")
    }

    if (currentQuestionIndex < 1) {
        currentQuestionIndex++;
    } else {
        currentQuestionIndex = 0;
    }
    
    nextButton.addEventListener("click", showQuestion);
}



startQuiz();