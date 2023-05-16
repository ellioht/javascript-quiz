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


let currentQuestionIndex = 0;
let score = 0;


// THIS FUNCTION STARTS THE QUIZ
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

// THIS FUNCTION CREATES A NEW QUESTION
function showQuestion() {
    // Clear off any old questions and answers
    clearQuestion();
    // Make a variable that is the current question
    let currentQuestion = questions[currentQuestionIndex];
    // Make a variable that will be a number before the question
    let questionNo = currentQuestionIndex + 1;
    // Set HTML text of the question to queston number and current question
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

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





startQuiz();