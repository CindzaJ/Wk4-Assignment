const question = document.querySelector('#question');
const choices = document.querySelectorAll('.choice-text');
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#score');

let currentQuestion ={}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Q1. Commonly used Data Types DO NOT INCLUDE:",
        choice1:"Strings",
        choice2:"Booleans",
        choice3:"Alerts",
        choice4:"Numbers",
        answer: 2,
    },
    {
        question: "Q2. The Condition in an if/else Statement is enclosed with ________.",
        choice1:"Quotes",
        choice2:"Curly Brackets",
        choice3:"Parenthesis",
        choice4:"Square Brackets",
        answer: 2,
    },
    {
        question:"Q3. Arrays in JavaScript can be used to Store:",
        choice1:"Number & Strings",
        choice2:"Other Arrays",
        choice3:"Booleans",
        choice4:"All of the Above.",
        answer: 4,
    },
    {
        question:"Q4. String Values must be be enclosed within ____ when being assignment to variables.",
        choice1:"Commas",
        choice2:"Curly Brackets",
        choice3:"Quotes",
        choice4:"Parenthesis",
        answer: 2,
    },
    {
        question: "Q5. A very useful tool used during Development & Debugging for printing content to the debugger is:",
        choice1:"JavaScript",
        choice2:"Terminal/Bash",
        choice3:"For Loops",
        choice4:"Console.log",
        answer: 4,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

var startGame = () => {
    questionCounter= 0 
    score = 0
    availableQuestions = [...questions]
    getNewQuestions()
}
console.log(choices)
function getNewQuestions  () {
    if (availableQuestions.length === 0||questionCounter> MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore',score)

        return window.location.assign('Endpage.html')
    }

    questionCounter++
    progressText.innerText=`Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)* 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion ['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}
console.log(choices)

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
        
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct': 'incorrect';

        if(classToApply ==='correct'){
            incrementScore(SCORE_POINTS)
        }
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestions()

        },1000)
    })    
})
incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()