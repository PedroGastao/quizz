const question = document.querySelector('#question')
const answersbox = document.querySelector('#answers-box')
const quizzContainer = document.querySelector('#quizz-container')
const scorecontainer = document.querySelector('#score-container')
const letter = ["a","b","c","d"]
let points = 0
let actualQuestion = 0

//perguntas
const questions = [{
    "question":"- PHP foi desenvolvido para qual fim?",
    "answers":[
        {
            "answers":"back-end",
            "correct":true
        },
        {
            "answers":"front-end",
            "correct":false
        },
        {
            "answers":"sistema operacional",
            "correct":false
        },
        {
            "answers":"banco de dados",
            "correct":false
        }
    ]
},
{
    "question":" - Uma forma de declarar váriavel em JavaScript?",
    "answers":[
        {
            "answers":"int",
            "correct":false
        },
        {
            "answers":"lot",
            "correct":false
        },
        {
            "answers":"boolean",
            "correct":false
        },
        {
            "answers":"let",
            "correct":true
        }
    ]
},
{
    "question":" - Qual o seletor de id no css?",
    "answers":[
        {
            "answers":"@",
            "correct":false
        },
        {
            "answers":".",
            "correct":false
        },
        {
            "answers":"#",
            "correct":true
        },
        {
            "answers":"%",
            "correct":false
        }
    ]
},
{
    "question":" - PHP foi desenvolvido para qual fim?",
    "answers":[
        {
            "answers":"back-end",
            "correct":true
        },
        {
            "answers":"front-end",
            "correct":false
        },
        {
            "answers":"sistema operacional",
            "correct":false
        },
        {
            "answers":"banco de dados",
            "correct":false
        }
    ]
}]

//adicionando perguntas
function init(){
    CreateQuestion(0)
}

function CreateQuestion(i){
    const oldbuttons = answersbox.querySelectorAll('button')
    oldbuttons.forEach(function(btn){
        btn.remove()
    })

    const questionText = question.querySelector('#question-text')
    const questionNumber = question.querySelector('#question-number')

   questionText.textContent= questions[i].question
   questionNumber.textContent = i+1

   questions[i].answers.forEach(function(answers,i){
        const answerTemplate = document.querySelector('.answer-template').cloneNode(true)

        const letterBtn = answerTemplate.querySelector('.btn-letter')
        const answerText = answerTemplate.querySelector('.question-answers')

        letterBtn.textContent = letter[i]
        answerText.textContent = answers['answers']

        answerTemplate.setAttribute('correct-answer',answers['correct'])

        //remover hide e template
        answerTemplate.classList.remove('hide')
        answerTemplate.classList.remove('answer-template')

        //inserir alternativa na tabela
        answersbox.appendChild(answerTemplate)

        //evento de click
        answerTemplate.addEventListener('click',function(){
            CheckAnswer(this)
        })
        
   })
   actualQuestion++
}

function CheckAnswer(btn){
    //seleciona todos os botões
    const buttons = answersbox.querySelectorAll('button')
    //verifica se a resposta esta certa
    buttons.forEach(function(button){
        if(button.getAttribute('correct-answer')==="true" ){
            button.classList.add('correct-answer')
            //incremento de ponto
            if(btn===button){
                points++ 
            }
        }else{
            button.classList.add('wrong-answer')
        }
    })

    //ixibi a proxima pergunta
    
    NextQuestion()
}

function NextQuestion(){
    setTimeout(function(){
        if(actualQuestion>=questions.length){
            ShowSucessMensage()
        }
        CreateQuestion(actualQuestion)
    },1500)
}

function ShowSucessMensage(){
   

    const score = ((points/questions.length)*100).toFixed(2)
    
    const displayscore = document.querySelector('#display-score')
    displayscore.textContent= score.toString()

    const correctAnswers = document.querySelector('#correct-answers')
    correctAnswers.textContent= points

    const totalQuestions = document.querySelector('#questions-qty')
    totalQuestions.textContent= questions.length
}

function HiderShow(){
    quizzContainer.classList.toggle('hide')
    scorecontainer.classList.toggle('hide')
}
const restarBtn = document.querySelector('#restart')
restarBtn.addEventListener('click', ()=>{
    actualQuestion = 0
    points = 0
    HiderShow()
    init()
})

init()