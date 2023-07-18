document.addEventListener('DOMContentLoaded', () => {
    const gameOverVisualization = document.getElementById('gameOverVisualization');
    const gameFieldVisualization = document.getElementById('gameFieldVisualization');
    gameFieldVisualization.innerHTML = '';

    _gameFieldConsole(gameFieldArray);

    _gameFieldPageVisualization(gameFieldArray);

    let gameFieldCollection = document.querySelectorAll('.item');

    // Функция для подготовки игрового поля.
    const gameFieldStart = (arr, fn) => {
        for (let elem of arr) {
            elem.addEventListener('click', fn);
        }
    }

    // Функция действия на клик по item
    // function clickAction() {
    //     let i = +this.dataset.i;
    //     let j = +this.dataset.j;
    //     let zero = document.querySelector('.item-zero');
    //
    //     const updatePositions = (a, b, c, d, e, f) => {
    //         gameFieldArray[a][b] = gameFieldArray[i][j];
    //         gameFieldArray[i][j] = 0;
    //         if(f === true) {
    //             this.dataset.j = String(b);
    //             zero.dataset.j = String(+this.dataset.c);
    //             this.style.left = `${+this.style.left.slice(0,-2) + MOVE_ITEM * d}px`;
    //             zero.style.left = `${+zero.style.left.slice(0,-2) + MOVE_ITEM * e}px`;
    //         } else {
    //             this.dataset.i = String(a);
    //             zero.dataset.i = String(+this.dataset.c);
    //             this.style.top = `${+this.style.top.slice(0,-2) + MOVE_ITEM * d}px`;
    //             zero.style.top = `${+zero.style.top.slice(0,-2) + MOVE_ITEM * e}px`;
    //         }
    //     };
    //
    //     if (checkLeft(i, j, gameFieldArray)) {
    //         // console.log('ноль слева');
    //         updatePositions(i,j - 1, j + 1,-1,1, true);
    //     }
    //     if (checkRight(i, j, gameFieldArray)) {
    //         // console.log('ноль справа');
    //         updatePositions(i,j + 1,j - 1,1, -1, true);
    //     }
    //     if (checkTop(i, j, gameFieldArray)) {
    //         // console.log('ноль сверху');
    //         updatePositions(i - 1, j,i + 1,-1, 1, false);
    //     }
    //     if (checkBottom(i, j, gameFieldArray)) {
    //         // console.log('ноль снизу');
    //         updatePositions(i + 1, j,i - 1,1, -1, false);
    //     }
    //     gameFieldVisualization.innerHTML = '';
    //     _gameFieldPageVisualization(gameFieldArray);
    //     if(gameOver(gameFieldArray)) {
    //         gameOverVisualization.style.display = 'flex';
    //     }
    // }


    //****************************************************************************************


    function clickAction() {
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
        }
        if (checkBottom(i, j, gameFieldArray)) {
            changeGameFieldArray(gameFieldArray, {a: i, b: j, c: i + 1, d: j});
            changeDatasetIndex(this, zero, {indexStr: 'i', a: i + 1, b: -1});
            changeItemPosition(this, zero, 'top', MOVE_ITEM, -MOVE_ITEM);
        }
        gameFieldVisualization.innerHTML = '';
        _gameFieldPageVisualization(gameFieldArray);
        // updateGameFieldVisualization();
        if(gameOver(gameFieldArray)) {
            gameOverVisualization.style.display = 'flex';
        }
    }
    //****************************************************************************************

    gameFieldStart(gameFieldCollection, clickAction);


    // При нажатии на кнопку поле совершает заданное количество ходов

    const mixButton = document.querySelector('.mix-btn');
    mixButton.addEventListener('click', mixGameFieldAction);

    const checkLeftValue = (i, j) => gameFieldArray[i][j-1] !== -1;
    const checkTopValue = (i, j) => gameFieldArray[i-1][j] !== -1;
    const checkRightValue = (i, j) => gameFieldArray[i][j+1] !== -1;
    const checkBottomValue = (i, j) => gameFieldArray[i+1][j] !== -1;
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
    }

    function mixGameFieldAction() {
        let nullBtnI = 3;
        let nullBtnJ = 3;
        let neededBtnI = null;
        let neededBtnJ = null;
        let btnVariants = [];
        if(checkLeftValue(nullBtnI, nullBtnJ)) {
            btnVariants.push([nullBtnI, nullBtnJ-1]);
        }
        if(checkTopValue(nullBtnI, nullBtnJ)) {
            btnVariants.push([nullBtnI-1, nullBtnJ]);
        }
        if(checkRightValue(nullBtnI, nullBtnJ)) {
            btnVariants.push([nullBtnI, nullBtnJ+1]);
        }
        if(checkBottomValue(nullBtnI, nullBtnJ)) {
            btnVariants.push([nullBtnI+1, nullBtnJ]);
        }
        let randomNumber = getRandomInt(0, btnVariants.length);
        let randomBtn = btnVariants[randomNumber];
        // console.log(randomBtn);
        neededBtnI = randomBtn[0];
        neededBtnJ = randomBtn[1];
        // console.log(neededBtnI, neededBtnJ);

        let zero = document.querySelector('.item-zero');
        let neededElem = document.querySelector(`#id-${gameFieldArray[neededBtnI][neededBtnJ]}`);
        // console.log(neededElem);
        // console.log(zero);

        if(randomNumber === 0) {
            // changeGameFieldArray(gameFieldArray, {a: neededBtnI, b: neededBtnJ, c: neededBtnI, d: neededBtnJ + 1});
            // changeDatasetIndex(neededElem, zero, {indexStr: 'j', a: neededBtnJ + 1, b: -1});
            // changeItemPosition(neededElem, zero, 'left', MOVE_ITEM, -MOVE_ITEM);
            changeGameFieldArray(gameFieldArray, {a: neededBtnI, b: neededBtnJ, c: nullBtnI, d: nullBtnJ});
            changeDatasetIndex(neededElem, zero, {indexStr: 'j', a: neededBtnJ, b: -1});
            changeItemPosition(neededElem, zero, 'left', MOVE_ITEM, -MOVE_ITEM);
        }
        if(randomNumber === 2) {
            // changeGameFieldArray(gameFieldArray, {a: neededBtnI, b: neededBtnJ, c: neededBtnI, d: neededBtnJ + 1});
            // changeDatasetIndex(neededElem, zero, {indexStr: 'j', a: neededBtnJ + 1, b: -1});
            // changeItemPosition(neededElem, zero, 'left', MOVE_ITEM, -MOVE_ITEM);
            // changeGameFieldArray(gameFieldArray, {a: i, b: j, c: i, d: j - 1});
            // changeDatasetIndex(this, zero, {indexStr: 'j', a: j - 1, b: 1});
            // changeItemPosition(this, zero, 'left', -MOVE_ITEM, MOVE_ITEM);

            changeGameFieldArray(gameFieldArray, {a: neededBtnI, b: neededBtnJ, c: nullBtnI, d: nullBtnJ});
            changeDatasetIndex(neededElem, zero, {indexStr: 'j', a: neededBtnJ, b: 1});
            changeItemPosition(neededElem, zero, 'left', -MOVE_ITEM, MOVE_ITEM);
        }
        gameFieldVisualization.innerHTML = '';
        _gameFieldPageVisualization(gameFieldArray);
    }

    // module.exports = _gameFieldConsole;
});
