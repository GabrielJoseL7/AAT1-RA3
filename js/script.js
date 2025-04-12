const questions = [
    {
      question: "¿Quién interpretó a Jack Dawson en la película 'Titanic'?",
      answers: [
        { text: "Leonardo DiCaprio", correct: true},
        { text: "Brad Pitt", correct: false},
        { text: "Tom Hanks", correct: false},
        { text: "Johnny Depp", correct: false}
      ]
    },
    {
      question: "¿Qué famosa serie de televisión tuvo lugar en el hospital ficticio 'Seattle Grace'?",
      answers: [
        { text: "ER", correct: false},
        { text: "House", correct: false},
        { text: "Grey's Anatomy", correct: true},
        { text: "Scrubs", correct: false}
      ]
    },
    {
      question: "¿Qué cantante es conocida como la 'Reina del Pop'?",
      answers: [
        { text: "Madonna", correct: true},
        { text: "Britney Spears", correct: false},
        { text: "Beyoncé", correct: false},
        { text: "Rihanna", correct: false}
      ]
    },
    {
      question: "¿Cuál es el nombre del mago protagonista de una famosa saga literaria y cinematográfica?",
      answers: [
        { text: "Frodo Bolsón", correct: false},
        { text: "Luke Skywalker", correct: false},
        { text: "Harry Potter", correct: true},
        { text: "Katniss Everdeen", correct: false}
      ]
    },
    {
      question: "¿Qué banda lanzó el álbum icónico 'Thriller'?",
      answers: [
        { text: "The Beatles", correct: false},
        { text: "Queen", correct: false},
        { text: "Michael Jackson", correct: true},
        { text: "Elvis Presley", correct: false}
      ]
    },
    {
      question: "¿En qué año se estrenó la primera película de 'Star Wars: Una nueva esperanza'?",
      answers: [
        { text: "1977", correct: true},
        { text: "1980", correct: false},
        { text: "1983", correct: false},
        { text: "1974", correct: false}
      ]
    },
    {
      question: "¿Cuál es el nombre de la famosa red social centrada en fotografías y videos?",
      answers: [
        { text: "Facebook", correct: false},
        { text: "Twitter", correct: false},
        { text: "Instagram", correct: true},
        { text: "TikTok", correct: false}
      ]
    },
    {
      question: "¿Qué personaje animado vive en una piña debajo del mar?",
      answers: [
        { text: "Patricio Estrella", correct: false},
        { text: "Calamardo Tentáculos", correct: false},
        { text: "Bob Esponja", correct: true},
        { text: "Arenita Mejillas", correct: false}
      ]
    },
    {
      question: "¿Qué serie de televisión de los 90 seguía las vidas de seis amigos en Nueva York?",
      answers: [
        { text: "Seinfeld", correct: false},
        { text: "Frasier", correct: false},
        { text: "Friends", correct: true},
        { text: "Will & Grace", correct: false}
      ]
    },
    {
      question: "¿Cuál es el nombre del superhéroe arácnido de Marvel Comics?",
      answers: [
        { text: "Superman", correct: false},
        { text: "Batman", correct: false},
        { text: "Spiderman", correct: true},
        { text: "Iron Man", correct: false}
      ]
    },
    {
      question: "¿Cuál es el animal más grande del mundo?",
      answers: [
        { text: "Tiburón", correct: false},
        { text: "Jirafa", correct: false},
        { text: "Manatí", correct: false},
        { text: "Ballena Azul", correct: true}
      ]
    }
  ];

const intro = document.getElementById("intro")
const btnYes = document.getElementById("btnYes");
const btnNo = document.getElementById("btnNo");
const quiz = document.getElementById("Quiz");
const questionElement = document.getElementById("question");
const botonesRespuestas = document.getElementById("answer-buttons");
const btnNext = document.getElementById("btn-Next");
const reTake = document.getElementById("reTake");
const scores = document.getElementById("score");
const btnReYes = document.getElementById("btnReYes");
const btnReNo = document.getElementById("btnReNo");


btnYes.addEventListener("click", function(){
    quiz.classList.add("activeQuiz");
    iniciarExamen();
})
btnNo.addEventListener("click", function(){
    quiz.classList.remove("activeQuiz");
    alert("No se hara el quiz")
})

let currentQuestionIndex = 0; 
let score = 0;

function iniciarExamen(){
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
    btnNext.innerHTML = "Siguiente";
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1; 
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("reply1");
        botonesRespuestas.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    btnNext.style.display = "none";
    while(botonesRespuestas.firstChild){
        botonesRespuestas.removeChild(botonesRespuestas.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target; 
    const isCorrect = selectedBtn.dataset.correct == "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(botonesRespuestas.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        };
        button.disable = true;
    });

    btnNext.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

function showScore(){
    reTake.classList.add("activeQuiz");
    quiz.classList.remove("activeQuiz")
    scores.innerHTML = `Tu puntaje es: ${score} de ${questions.length}!`;
    btnReYes.addEventListener('click', function(){
        iniciarExamen();
        reTake.classList.remove("activeQuiz");
        quiz.classList.add("activeQuiz");
    });
    btnReNo.addEventListener('click', function(){
        alert("No se realizara el quiz nuevamente")
    })
    
}


btnNext.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
})
