// https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple


// https://opentdb.com/api_category.php
const categories = document.getElementById('category');
const questionCount = document.querySelector('[name="question-count"]');
const difficulty = document.querySelector('[name="difficulty"]');
// const type = document.querySelector('[name="type"]');
const category = document.querySelector('[name="category"]');

const startBtn = document.getElementById('start-btn');
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
    const url = `https://opentdb.com/api.php?amount=${questionCount.value}&category=${category.value}&difficulty=${difficulty.value}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayQuestion(data.results))
}

startBtn.addEventListener('click', fetchQuestion);


const displayQuestion = (data) => {
    let i = 0;
    data.forEach(item => {
        i++;
        testQuestions.innerHTML += `
        <div class="single-question">
            <div class="question">
                <span class='question-count'>Question ${i} of ${data.length}</span>
                <h3>${item.question}</h3>
            </div>
            <div class="options">
                <input type='radio' id="${item.correct_answer}" name='question${i}' value="${item.correct_answer}">                  
                <label for ="${item.correct_answer}">${item.correct_answer}</label>
                <input type='radio' id="${item.incorrect_answers[0]}" name='question${i}' value="${item.incorrect_answers[0]}">
                <label for ="${item.incorrect_answers[0]}">${item.incorrect_answers[0]}</label>
                <input type='radio' id="${item.incorrect_answers[1]}" name='question${i}' value="${item.incorrect_answers[1]}">
                <label for ="${item.incorrect_answers[1]}">${item.incorrect_answers[1]}</label>
                <input type='radio' id="${item.incorrect_answers[2]}" name='question${i}' value="${item.incorrect_answers[2]}">
                <label for ="${item.incorrect_answers[2]}">${item.incorrect_answers[2]}</label>
            </div>
        </div>
        `
    });
}