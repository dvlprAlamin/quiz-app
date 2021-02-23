// https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple


// https://opentdb.com/api_category.php
const categories = document.getElementById('category');
const questionCount = document.querySelector('[name="question-count"]');
const difficulty = document.querySelector('[name="difficulty"]');
// const type = document.querySelector('[name="type"]');
const category = document.querySelector('[name="category"]');

const startBtn = document.getElementById('start-btn');
const submitBtn = document.getElementById('submit-btn');
const testContainer = document.getElementById('test-container')
const testQuestions = document.getElementById('test-questions')
const updateCategory = () => {
    fetch('https://opentdb.com/api_category.php')
    .then(res => res.json())
    .then(data => setCategory(data.trivia_categories))
}
updateCategory();

const setCategory = (data) => data.forEach(category => categories.innerHTML += `<option value='${category.id}'>${category.name}</option>`);

const fetchQuestion = () => {
    const url = `https://opentdb.com/api.php?amount=${questionCount.value}&category=${category.value}&difficulty=${difficulty.value}&type=multiple`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        displayQuestion(data.results);
        localStorage.setItem('data',JSON.stringify(data.results));
    })
}

startBtn.addEventListener('click', fetchQuestion);


const displayQuestion = (data) => {

    data.forEach((item, i) => {
        i++;
        // const updateResult = () => {
            // const answer = document.querySelector('input[type="radio"]:checked');
            // console.log(answer.value,item.correct_answer);
        // }

        // const options = item.incorrect_answers;
        // const random = Math.floor(Math.random() * 4);
        // options.splice(random, 0, item.correct_answer);
        // console.log(options);
        testQuestions.innerHTML += `
        <div class="single-question">
            <div class="question">
                <span class='question-count'>Question ${i} of ${data.length}</span>
                <h3>${item.question}</h3>
            </div>
            <div class="options">
                <input type='radio' id="${i}01" name='question${i}' value="${item.correct_answer}">                  
                <label for ="${i}01">${item.correct_answer}</label>
                <input type='radio' id="${i}02" name='question${i}' value="${item.incorrect_answers[0]}">
                <label for ="${i}02">${item.incorrect_answers[0]}</label>
                <input type='radio' id="${i}03" name='question${i}' value="${item.incorrect_answers[1]}">
                <label for ="${i}03">${item.incorrect_answers[1]}</label>
                <input type='radio' id="${i}04" name='question${i}' value="${item.incorrect_answers[2]}">
                <label for ="${i}04">${item.incorrect_answers[2]}</label>
            </div>
        </div>
        `

    });
}


const displayResult = () => {
        const data = JSON.parse(localStorage.getItem('data'))
        // console.log(data);
       
            // const givenAnswer = givenAnswerList[i]
            // console.log(question.correct_answer,givenAnswer);
        let marks = 0;
        let notChecked = 0
        data.forEach((question, i) => {
            const givenAnswer = document.querySelector(`input[name="question${i+1}"]:checked`);
            if(givenAnswer === null){
                notChecked++;
            }
            else if(question.correct_answer === givenAnswer.value){
                marks++;
                givenAnswer.nextElementSibling.classList.add('right-answer')
            }
            else{
                givenAnswer.nextElementSibling.classList.add('wrong-answer');
                const rightAnswer = document.querySelector(`[value="${question.correct_answer}"]`)
                rightAnswer.nextElementSibling.classList.add('right-answer')
            }

            // console.log(question.correct_answer,givenAnswer.value);
        });
        console.log(marks);
        // const answer = document.querySelector('input[type="radio"]:checked');
        // answer.forEach(ans => {
        //     if(ans.value === item.correct_answer){
        //         // ans.nextElementSibling.classList.add('d-none');
        //         console.log('right');
        //     }
        //     else{
        //         console.log('wrong');
        //     }
        //     // console.log(ans.value,item.correct_answer);
        // });
}


submitBtn.addEventListener('click', displayResult);