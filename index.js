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
        }
        if (checkRight(i, j, gameFieldArray)) {
            changeGameFieldArray(gameFieldArray, {a: i, b: j, c: i, d: j + 1});
            changeDatasetIndex(this, zero, {indexStr: 'j', a: j + 1, b: -1});
            changeItemPosition(this, zero, 'left', MOVE_ITEM, -MOVE_ITEM);
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

    function mixGameFieldAction(gameFieldArray) {
        console.log('hi')
        for(let i = 1; i < gameFieldArray.length - 2; i++) {
            for(let j = 1; j < gameFieldArray.length - 2; j++) {
                if(gameFieldArray[i][j] === 0) {
                    console.log(`i = ${i}, j = ${j}`);
                }
            }
        }
    }

    // module.exports = _gameFieldConsole;
});
