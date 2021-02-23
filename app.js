

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
                <input type='radio' id="o${i}01" name='question${i}'>                  
                <label for ="o${i}01">${options[0]}</label>
                <input type='radio' id="o${i}02" name='question${i}'>
                <label for ="o${i}02">${options[1]}</label>
                <input type='radio' id="o${i}03" name='question${i}'>
                <label for ="o${i}03">${options[2]}</label>
                <input type='radio' id="o${i}04" name='question${i}'>
                <label for ="o${i}04">${options[3]}</label>
            </div>
        </div>
        `
        options.forEach((op, optNum) => document.querySelector(`#o${i}0${optNum + 1}`).value = options[optNum])
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
                rightAnswer.nextElementSibling.classList.add('right-answer')
            }
        });
        const skipMsg = document.getElementById('skip-message');
        notChecked === 0 ? skipMsg.style.display = 'none' : skipMsg.style.display = 'block';
        document.getElementById('marks-gain').innerText = marks;
        document.getElementById('total-marks').innerText = data.length;
        document.getElementById('skip-question').innerText = notChecked;
        document.getElementById('marks').classList.remove('d-none');
        
        
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
    document.getElementById('marks').classList.add('d-none');
    watch.classList.add('d-none');
}

backBtn.addEventListener('click', backBtnToggler)

// watch part script
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const centiSeconds = document.getElementById('centi-seconds');
const watch = document.getElementById('watch');
const timeUp = document.querySelector('[timeUp]')
const watchTime = document.querySelector('[watch-time]')

// set time 
const setTimer = () => {
    const totalSeconds = questionCount.value * 30;
    minutes.innerText = Math.floor(totalSeconds / 60);
    seconds.innerText = totalSeconds % 60;
    centiSeconds.innerText = '00';
    timeUp.classList.add('d-none');
    watchTime.classList.remove('d-none');
}

// unit resetter
const resetUnit = (unit, limit, after) => unit.innerText === limit && ((unit.innerText = after) && unit.previousElementSibling.innerText--);
// two digit updater
const isTwoDigit = unit => unit.innerText.length === 1 && (unit.innerText = '0' + unit.innerText);

// start button event handler
startBtn.addEventListener('click', () => {
    setTimer();
    watch.classList.remove('d-none');
    const interval = setInterval(() => {
        if(seconds.innerText === '30' && minutes.innerText === '00'){
            watchTime.classList.add('end-soon');
        }
        if(seconds.innerText === '00' && minutes.innerText === '00'){
            timeUp.classList.remove('d-none');
            watchTime.classList.add('d-none');
            clearInterval(interval);
            submitBtn.click();
        }
        // submitBtn.click() && clearInterval(interval);
        centiSeconds.innerText++;
        resetUnit(centiSeconds,'100', '00')
        resetUnit(seconds,'-1', '59')
        resetUnit(minutes,'-1', '59')
        isTwoDigit(centiSeconds);
        isTwoDigit(seconds);
        isTwoDigit(minutes);
    }, 10);
    
});
// submitBtn.addEventListener('click', clearInterval(interval));
