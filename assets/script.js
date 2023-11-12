const startButton = document.getElementById('start-button');
const quizContainer = document.getElementById('quiz-container');
const gameOverContainer = document.getElementById('game-over-container');
const questionElement = document.getElementById('question');
const answerButtons = document.querySelectorAll('.answer-button');
const timerElement = document.getElementById('time-remaining');
const scoreElement = document.getElementById('score');
const initialsInput = document.getElementById('initials');
const saveScoreButton = document.getElementById('save-score');
const showHighScoresButton = document.getElementById('show-high-scores');
const highScoresContainer = document.getElementById('high-scores-container');
const highScoresList = document.getElementById('high-scores-list');

let timer;
let timeRemaining = 50; 
let score = 0;
let questions = [
    {
        question: 'What is JavaScript?',
        answers: ['A programming language', 'A type of coffee', 'A new car model', 'A famous novel'],
        correctAnswer: 'A programming language',
    },
    {
        question: 'How do you declare a variable in JavaScript?',
        answers: ['Using the `var`, `let`, or `const` keyword', 'By shouting loudly', 'With a magic wand', 'By flipping a coin'],
        correctAnswer: 'Using the `var`, `let`, or `const` keyword',
    },
    {
        question: 'What is a function in JavaScript?',
        answers: ['A type of fruit', 'A special event', 'A reusable block of code that performs a specific task', 'A mathematical equation'],
        correctAnswer: 'A reusable block of code that performs a specific task',
    },
    {
        question: 'What is the DOM in the context of JavaScript?',
        answers: ['A movie genre', 'The Document Object Model, representing the structure of an HTML document', 'A popular rock band', 'A type of tree'],
        correctAnswer: 'The Document Object Model, representing the structure of an HTML document',
    }
];

let currentQuestionIndex = 0;
let highScores = [];

startButton.addEventListener('click', startQuiz);
answerButtons.forEach((button) => {
    button.addEventListener('click', () => {
        checkAnswer(button.textContent);
    });
});
saveScoreButton.addEventListener('click', saveScore);
showHighScoresButton.addEventListener('click', showHighScores);

function startQuiz() {
    startButton.style.display = 'none';
    quizContainer.style.display = 'block';
    loadQuestion();
    startTimer();
}

function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        for (let i = 0; i < answerButtons.length; i++) {
            answerButtons[i].textContent = currentQuestion.answers[i];
        }
    } else {
        endQuiz();
    }
}

function startTimer() {
    timer = setInterval(function () {
        if (timeRemaining > 0) {
            timeRemaining--;
            timerElement.textContent = timeRemaining;
        } else {
            endQuiz();
        }
    }, 1000);
}

function checkAnswer(selectedAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
        score += 10;
    } else {
        timeRemaining -= 10;
        if (timeRemaining < 0) {
            timeRemaining = 0;
        }
    }

    currentQuestionIndex++;
    loadQuestion();
}

function endQuiz() {
    clearInterval(timer);
    quizContainer.style.display = 'none';
    gameOverContainer.style.display = 'block';
    scoreElement.textContent = score;
}

function saveScore() {
    const initials = initialsInput.value;
    const playerScore = { initials, score };
    highScores.push(playerScore);
    highScores.sort((a, b) => b.score - a.score);
    localStorage.setItem('highScores', JSON.stringify(highScores)); 
}

function showHighScores() {
    highScoresContainer.style.display = 'block';
    displayHighScores();
}

function displayHighScores() {
    highScoresList.innerHTML = ''; 
    highScores.forEach((player, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${player.initials} - ${player.score}`;
        highScoresList.appendChild(listItem);
    });
}


const storedHighScores = JSON.parse(localStorage.getItem('highScores'));
if (storedHighScores) {
    highScores = storedHighScores;
}