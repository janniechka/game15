document.addEventListener('DOMContentLoaded', () => {
    const gameOverVisualization = document.getElementById('gameOverVisualization');
    const gameFieldVisualization = document.getElementById('gameFieldVisualization');
    gameFieldVisualization.innerHTML = '';




    _gameFieldConsole(gameFieldArray);

    _gameFieldPageVisualization(gameFieldArray);

    let gameFieldCollection = document.querySelectorAll('.item');

    // console.log(gameFieldCollection)

    // Функция для подготовки игрового поля.
    const gameFieldStart = (arr, fn) => {
        for (let elem of arr) {
            elem.addEventListener('click', fn);
        }
    }

    // Функция для согласования визуализации поля и gameFieldArray
    function updateGameFieldVisualization() {
        const myDiv = document.getElementById('myDiv');
        const gameFieldCollection = myDiv.querySelectorAll('.item');
        for (let elem of gameFieldCollection) {
            let i = +elem.dataset.i;
            let j = +elem.dataset.j;
            let value = gameFieldArray[i][j];

            elem.textContent = value;
            elem.dataset.value = value;
            elem.classList.remove('item-zero');
            if (value === 0) {
                elem.classList.add('item-zero');
            }
        }
    }



    // Функция действия на клик по item
    function clickAction() {
        let i = +this.dataset.i;
        let j = +this.dataset.j;
        let zero = document.querySelector('.item-zero');
        if (checkLeft(i, j, gameFieldArray)) {
            // console.log('ноль слева');
            // console.log(zero);
            // console.log(this);
            // console.log(this.style.top);
            // console.log(this.style.left);
            gameFieldArray[i][j-1] = gameFieldArray[i][j];
            gameFieldArray[i][j] = 0;
            console.log(+this.style.left.slice(0,-2));
            this.dataset.j = String(j - 1);
            zero.dataset.j = String(+this.dataset.j + 1);
            this.style.left = `${+this.style.left.slice(0,-2) - MOVE_ITEM}px`;
            zero.style.left = `${+zero.style.left.slice(0,-2) + MOVE_ITEM}px`;
        }
        if (checkRight(i, j, gameFieldArray)) {
            // console.log('ноль справа');
            gameFieldArray[i][j+1] = gameFieldArray[i][j];
            gameFieldArray[i][j] = 0;
            this.dataset.j = String(j + 1);
            zero.dataset.j = String(+this.dataset.j - 1);
            this.style.left = `${+this.style.left.slice(0,-2) + MOVE_ITEM}px`;
            zero.style.left = `${+zero.style.left.slice(0,-2) - MOVE_ITEM}px`;
        }
        if (checkTop(i, j, gameFieldArray)) {
            // console.log('ноль сверху');
            gameFieldArray[i-1][j] = gameFieldArray[i][j];
            gameFieldArray[i][j] = 0;
            this.dataset.i = String(i - 1);
            zero.dataset.i = String(+this.dataset.i + 1);
            this.style.top = `${+this.style.top.slice(0,-2) - MOVE_ITEM}px`;
            zero.style.top = `${+zero.style.top.slice(0,-2) + MOVE_ITEM}px`;
        }
        if (checkBottom(i, j, gameFieldArray)) {
            // console.log('ноль снизу');
            gameFieldArray[i+1][j] = gameFieldArray[i][j];
            gameFieldArray[i][j] = 0;
            this.dataset.i = String(i + 1);
            zero.dataset.i = String(+this.dataset.i - 1);
            this.style.top = `${+this.style.top.slice(0,-2) + MOVE_ITEM}px`;
            zero.style.top = `${+zero.style.top.slice(0,-2) - MOVE_ITEM}px`;
        }
        gameFieldVisualization.innerHTML = '';
        _gameFieldPageVisualization(gameFieldArray);
        // updateGameFieldVisualization();
        if(gameOver(gameFieldArray)) {
            gameOverVisualization.style.display = 'flex';
        }
    }
    gameFieldStart(gameFieldCollection, clickAction);

    // module.exports = _gameFieldConsole;
});
