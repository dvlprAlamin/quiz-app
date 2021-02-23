

const categories = document.getElementById('category');
const questionCount = document.querySelector('[name="question-count"]');
const difficulty = document.querySelector('[name="difficulty"]');
const category = document.querySelector('[name="category"]');

const startBtn = document.getElementById('start-btn');
const submitBtn = document.getElementById('submit-btn');
const backBtn = document.getElementById('back-btn');
const input = document.getElementById('input');
const testContainer = document.getElementById('test-container');
const testQuestions = document.getElementById('test-questions');

const marks = document.getElementById('marks');
const marksGain = document.getElementById('marks-gain');
const totalMarks = document.getElementById('total-marks');

const updateCategory = () => {
    fetch('https://opentdb.com/api_category.php')
    .then(res => res.json())
    .then(data => setCategory(data.trivia_categories))
}
updateCategory();

const setCategory = (data) => data.forEach(category => categories.innerHTML += `<option value='${category.id}'>${category.name}</option>`);

// fetch questions
const fetchQuestion = () => {
    const url = `https://opentdb.com/api.php?amount=${questionCount.value}&category=${category.value}&difficulty=${difficulty.value}&type=multiple`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        displayQuestion(data.results);
        displayResult(data.results);
    })
}

startBtn.addEventListener('click', () => {
    inputToggler();
    // displayToggler();
    fetchQuestion();
});


// display Questions
const displayQuestion = (data) => {
    questionToggler();
    data.forEach((item, i) => {
        i++;
        const options = item.incorrect_answers;
        const random = Math.floor(Math.random() * 4);
        options.splice(random, 0, item.correct_answer);
        testQuestions.innerHTML += `
        <div class="single-question">
            <div class="question">
                <span class='question-count'>Question ${i} of ${data.length}</span>
                <h3>${item.question}</h3>
            </div>
            <div class="options">
                <input type='radio' id="${i}01" name='question${i}' value="${options[0]}">                  
                <label for ="${i}01">${options[0]}</label>
                <input type='radio' id="${i}02" name='question${i}' value="${options[1]}">
                <label for ="${i}02">${options[1]}</label>
                <input type='radio' id="${i}03" name='question${i}' value="${options[2]}">
                <label for ="${i}03">${options[2]}</label>
                <input type='radio' id="${i}04" name='question${i}' value="${options[3]}">
                <label for ="${i}04">${options[3]}</label>
            </div>
        </div>
        `
        // options.forEach((option, optNum) => document.querySelector(`#${i}o${optNum + 1}`).value = options[optNum])
    });
    // testQuestions.innerHTML +=`
    // <button id="back-btn" onclick="clearData()" class="btn-design">Back</button>

    // `
};

// display result 
const displayResult = (data) =>{
    submitBtn.addEventListener('click', () => {
        submitBtnToggler();
        let marks = 0;
        let notChecked = 0;
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
                // this condition for ' sign issue
                rightAnswer === null || rightAnswer.nextElementSibling.classList.add('right-answer')
            }
        });
        marksGain.textContent = marks;
        totalMarks.textContent = data.length;
        console.log(marks,data.length);
    });
};

const questionToggler = () => testContainer.classList.toggle('d-none');

const inputToggler = () => input.classList.toggle('d-none');

const submitBtnToggler = () => {
    submitBtn.classList.add('d-none');
    backBtn.classList.remove('d-none');
}
const backBtnToggler = () => {
    submitBtn.classList.remove('d-none');
    backBtn.classList.add('d-none');
}

const clearData = () => {
    questionToggler();
    inputToggler();
    testQuestions.innerHTML = '';
}

backBtn.addEventListener('click', backBtnToggler)