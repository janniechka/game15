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
        if (checkLeft(i, j, gameFieldArray)) {
            changeGameFieldArray(gameFieldArray, {a: i, b: j, c: i, d: j - 1});
            changeDatasetIndex(this, zero, {indexStr: 'j', a: j - 1, b: 1});
            changeItemPosition(this, zero, 'left', -MOVE_ITEM, MOVE_ITEM);
            console.log('left');
        }
        if (checkRight(i, j, gameFieldArray)) {
            changeGameFieldArray(gameFieldArray, {a: i, b: j, c: i, d: j + 1});
            changeDatasetIndex(this, zero, {indexStr: 'j', a: j + 1, b: -1});
            changeItemPosition(this, zero, 'left', MOVE_ITEM, -MOVE_ITEM);
            console.log('right');
        }
        if (checkTop(i, j, gameFieldArray)) {
            changeGameFieldArray(gameFieldArray, {a: i, b: j, c: i - 1, d: j});
            changeDatasetIndex(this, zero, {indexStr: 'i', a: i - 1, b: 1});
            changeItemPosition(this, zero, 'top', -MOVE_ITEM, MOVE_ITEM);
            console.log('top');
        }
        if (checkBottom(i, j, gameFieldArray)) {
            changeGameFieldArray(gameFieldArray, {a: i, b: j, c: i + 1, d: j});
            changeDatasetIndex(this, zero, {indexStr: 'i', a: i + 1, b: -1});
            changeItemPosition(this, zero, 'top', MOVE_ITEM, -MOVE_ITEM);
            console.log('bottom');
        }
        gameFieldVisualization.innerHTML = '';
        // _gameFieldPageVisualization(gameFieldArray);
        counter.setCount();
        countNumber = counter.getCount();
        console.log(countNumber);
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

    const checkLeftValue = (i, j) => gameFieldArray[i][j-1] !== -1;
    const checkTopValue = (i, j) => gameFieldArray[i-1][j] !== -1;
    const checkRightValue = (i, j) => gameFieldArray[i][j+1] !== -1;
    const checkBottomValue = (i, j) => gameFieldArray[i+1][j] !== -1;
    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
    }

    // нельзя ли разбить на несколько функций?
    const mixGameFieldAction = () => {
        let zero = document.querySelector('.item-zero');
        let nullBtnI = +zero.dataset.i;
        let nullBtnJ = +zero.dataset.j;
        // console.log(nullBtnI, nullBtnJ)
        let neededBtnI = null;
        let neededBtnJ = null;
        let btnVariants = [];
        let previousStep = [4, 4];
        if(checkLeftValue(nullBtnI, nullBtnJ) && (String([nullBtnI, nullBtnJ-1]) !== String(previousStep))) {
            btnVariants.push([nullBtnI, nullBtnJ-1]);
        }
        if(checkTopValue(nullBtnI, nullBtnJ) && (String([nullBtnI-1, nullBtnJ]) !== String(previousStep))) {
            btnVariants.push([nullBtnI-1, nullBtnJ]);
        }
        if(checkRightValue(nullBtnI, nullBtnJ) && (String([nullBtnI, nullBtnJ+1]) !== String(previousStep))) {
            btnVariants.push([nullBtnI, nullBtnJ+1]);
        }
        if(checkBottomValue(nullBtnI, nullBtnJ) && (String([nullBtnI+1, nullBtnJ]) !== String(previousStep))) {
            btnVariants.push([nullBtnI+1, nullBtnJ]);
        }
        let randomNumber = getRandomInt(0, btnVariants.length);

        let randomBtn = btnVariants[randomNumber];
        console.log(randomBtn)
        previousStep = randomBtn;

        console.log(previousStep)

        // console.log(btnVariants);
        neededBtnI = randomBtn[0];
        neededBtnJ = randomBtn[1];
        let neededElem = document.querySelector(`#id-${gameFieldArray[neededBtnI][neededBtnJ]}`);
        if(checkRight(neededBtnI, neededBtnJ, gameFieldArray)) {
            changeGameFieldArray(gameFieldArray, {a: neededBtnI, b: neededBtnJ, c: nullBtnI, d: nullBtnJ});
            changeDatasetIndex(neededElem, zero, {indexStr: 'j', a: neededBtnJ + 1, b: -1});
            changeItemPosition(neededElem, zero, 'left', MOVE_ITEM, -MOVE_ITEM);
        }
        if(checkBottom(neededBtnI, neededBtnJ, gameFieldArray)) {
            changeGameFieldArray(gameFieldArray, {a: neededBtnI, b: neededBtnJ, c: nullBtnI, d: nullBtnJ});
            changeDatasetIndex(neededElem, zero, {indexStr: 'i', a: neededBtnI + 1, b: -1});
            changeItemPosition(neededElem, zero, 'top', MOVE_ITEM, -MOVE_ITEM);
        }
        if(checkLeft(neededBtnI, neededBtnJ, gameFieldArray)) {
            changeGameFieldArray(gameFieldArray, {a: neededBtnI, b: neededBtnJ, c: nullBtnI, d: nullBtnJ});
            changeDatasetIndex(neededElem, zero, {indexStr: 'j', a: neededBtnJ - 1, b: 1});
            changeItemPosition(neededElem, zero, 'left', -MOVE_ITEM, MOVE_ITEM);
        }
        if(checkTop(neededBtnI, neededBtnJ, gameFieldArray)) {
            changeGameFieldArray(gameFieldArray, {a: neededBtnI, b: neededBtnJ, c: nullBtnI, d: nullBtnJ});
            changeDatasetIndex(neededElem, zero, {indexStr: 'i', a: neededBtnI - 1, b: 1});
            changeItemPosition(neededElem, zero, 'top', -MOVE_ITEM, MOVE_ITEM);
        }
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
