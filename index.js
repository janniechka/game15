document.addEventListener('DOMContentLoaded', () => {
    const gameOverVisualization = document.getElementById('gameOverVisualization');
    const gameFieldVisualization = document.getElementById('gameFieldVisualization');

    gameFieldVisualization.innerHTML = '';

    // _gameFieldConsole(gameFieldArray);
    //
    // _gameFieldPageVisualization(gameFieldArray);

    let gameFieldCollection = document.querySelectorAll('.item');

    // Функция для подготовки игрового поля.
    const gameFieldStart = (arr, fn) => {
        for (let elem of arr) {
            elem.addEventListener('click', fn);
            elem.classList.remove('btn-before-mix');
        }
    }

    //****************************************************************************************

    function clickAction() {
        let countNumber = 0;
        let i = +this.dataset.i;
        let j = +this.dataset.j;
        let zero = document.querySelector('.item-zero');
        if (checkIfNullIsOnTheLeft(i, j, gameFieldArray)) {
            changeGameFieldArray(gameFieldArray, {a: i, b: j, c: i, d: j - 1});
            changeDatasetIndex(this, zero, {indexStr: 'j', a: j - 1, b: 1});
            changeItemPosition(this, zero, 'left', -MOVE_ITEM, MOVE_ITEM);
            console.log('left');
        }
        if (checkIfNullIsOnTheRight(i, j, gameFieldArray)) {
            changeGameFieldArray(gameFieldArray, {a: i, b: j, c: i, d: j + 1});
            changeDatasetIndex(this, zero, {indexStr: 'j', a: j + 1, b: -1});
            changeItemPosition(this, zero, 'left', MOVE_ITEM, -MOVE_ITEM);
            console.log('right');
        }
        if (checkIfNullIsOnTheTop(i, j, gameFieldArray)) {
            changeGameFieldArray(gameFieldArray, {a: i, b: j, c: i - 1, d: j});
            changeDatasetIndex(this, zero, {indexStr: 'i', a: i - 1, b: 1});
            changeItemPosition(this, zero, 'top', -MOVE_ITEM, MOVE_ITEM);
            console.log('top');
        }
        if (checkIfNullIsOnTheBottom(i, j, gameFieldArray)) {
            changeGameFieldArray(gameFieldArray, {a: i, b: j, c: i + 1, d: j});
            changeDatasetIndex(this, zero, {indexStr: 'i', a: i + 1, b: -1});
            changeItemPosition(this, zero, 'top', MOVE_ITEM, -MOVE_ITEM);
            console.log('bottom');
        }
        gameFieldVisualization.innerHTML = '';
        // _gameFieldPageVisualization(gameFieldArray);
        counter.setCount();
        countNumber = counter.getCount();
        // console.log(countNumber);
        countElement.innerText = countNumber;
        // updateGameFieldVisualization();
        if(isGameOver(gameFieldArray)) {
            gameOverVisualization.style.display = 'flex';
        }
    }
    //****************************************************************************************

    // gameFieldStart(gameFieldCollection, clickAction);


    // При нажатии на кнопку поле совершает заданное количество ходов

    const movesCount = document.querySelector('#movesCount');

    const mixButton = document.querySelector('.mix-btn');
    // mixButton.addEventListener('click', mixGameFieldAction);
    mixButton.addEventListener('click', () => mixGameFieldOneByOne(+movesCount.value));

    const mixGameFieldOneByOne = numTimes => {
        gameFieldStart(gameFieldCollection, clickAction);
        let count = 0;
        const interval = setInterval(() => {
            if (count >= numTimes) {
                clearInterval(interval);
            } else {
                mixGameFieldAction();
                count++;
            }
        }, mixSpeed);
        movesCounter.style.display = 'block';
    };

    let previousStep = [];
    const mixGameFieldAction = () => {
        let zero = document.querySelector('.item-zero');
        let nullBtnI = +zero.dataset.i;
        let nullBtnJ = +zero.dataset.j;
        let neededBtnI = null;
        let neededBtnJ = null;
        let btnVariants = createBtnVariantsArr(+zero.dataset.i, +zero.dataset.j, gameFieldArray);
        console.log(btnVariants);
        console.log(previousStep);
        for(let i = 0; i < btnVariants.length; i++) {
            if(String(btnVariants[i]) === String(previousStep)) {
                btnVariants.splice(i, 1);
            }
        }
        console.log(btnVariants)
        let randomNumber = getRandomInt(0, btnVariants.length);
        let randomBtn = btnVariants[randomNumber];
        previousStep = [+zero.dataset.i, +zero.dataset.j];
        // console.log(previousStep);
        neededBtnI = randomBtn[0];
        neededBtnJ = randomBtn[1];
        let neededElem = document.querySelector(`#id-${gameFieldArray[neededBtnI][neededBtnJ]}`);
        makeMove(gameFieldArray, neededElem, zero, neededBtnI, neededBtnJ, nullBtnI, nullBtnJ);
        gameFieldVisualization.innerHTML = '';
        // _gameFieldPageVisualization(gameFieldArray);
    }

    let startAgain = document.getElementById('startAgain');
    startAgain.addEventListener('click', () => {
        gameOverVisualization.style.display = 'none';
        movesCounter.style.display = 'none';
        gameFieldVisualization.innerHTML = '';
        // _gameFieldConsole(gameFieldArray);
        // _gameFieldPageVisualization(gameFieldArray);
        countElement.innerText = '0';
        for (let elem of gameFieldCollection) {
            elem.removeEventListener('click', clickAction);
            elem.classList.add('btn-before-mix');
        }
    })

    // module.exports = _gameFieldConsole;
});
