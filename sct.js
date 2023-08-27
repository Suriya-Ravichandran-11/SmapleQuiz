const questions=[
    {
        question: "On earth, temperatures allow for water to exist in how many phases?",
        answers:[
            {text: "Six", correct: false},
            {text: "Four", correct: false},
            {text: "One", correct: false},
            {text: "Three", correct: true},
        ]
    },
    {
        question: "Which planet has seasons and an atomosphere and is a reddish color?",
        answers:[
            {text: "Earth", correct: false},
            {text: "Mars", correct: true},
            {text: "Jupiter", correct: false},
            {text: "Uranus", correct: false},
        ]
    },
    {
        question: "Which planet has rings of ice?",
        answers:[
            {text: "Neptune", correct: false},
            {text: "Jupiter", correct: false},
            {text: "Saturn", correct: true},
            {text: "Earth", correct: false},
        ]
    },
    {
        question: "The sun's energy is produced where?",
        answers:[
            {text: "Its surface", correct: false},
            {text: "In a small factory run by tiny sun people", correct: false},
            {text: "Across the whole body", correct: false},
            {text: "The core", correct: true},
        ]
    },
    {
        question: "Frozen dust and gases with bright burning tails?",
        answers:[
            {text: "Asteroid", correct: false},
            {text: "Meterorite", correct: false},
            {text: "Comet", correct: true},
            {text: "Meteor", correct: false},
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("ans-button");
const nextButton = document.getElementById("next-btn");
let currentIndex=0;
let score=0;
function startQuiz(){
    currentIndex =0;
    score=0;
    nextButton.innerHTML = "Next";
    loadQuiz();
}
function loadQuiz(){
    resetstate();
    let currentQuestion = questions[currentIndex];
    let questionNo = currentIndex +1;
    questionElement.innerHTML = questionNo +". "+currentQuestion.question;

    currentQuestion.answers.forEach(ans=>{
        const button =document.createElement("button");
        button.innerHTML = ans.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(ans.correct){
            button.dataset.correct = ans.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
function resetstate(){
    nextButton.style.display ="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectionBtn = e.target;
    const isCorrect = selectionBtn.dataset.correct === "true";
    if(isCorrect){
        selectionBtn.classList.add("correct");
        score++;
    }
    else{                                                                                                                           
        selectionBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=> {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetstate();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display = "block";
}
function handleNext(){
    currentIndex++;
    if(currentIndex < questions.length){
        loadQuiz();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentIndex < questions.length){
        handleNext();
    }
    else{
        startQuiz();
    }
})
startQuiz();