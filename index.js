document.addEventListener('DOMContentLoaded', () => {
    const gameOverVisualization = document.getElementById('gameOverVisualization');
    const gameFieldVisualization = document.getElementById('gameFieldVisualization');
    gameFieldVisualization.innerHTML = '';

// Функция для вывода игрового поля в консоль
    const _gameFieldConsole = (arr) => {
        let gameFieldLine = '';
        let result = '';
        for(let i = 0; i <= arr.length - 1; i++) {
            for(let j = 0; j <= arr.length - 1; j++) {
                if(arr[i][j] < 10 && arr[i][j] >= 0) {
                    gameFieldLine = gameFieldLine + ' ' + arr[i][j] + '  ';
                } else {
                    gameFieldLine = gameFieldLine + arr[i][j] + '  ';
                }
            }
            // console.log(gameFieldLine);
            result += gameFieldLine;
            gameFieldLine = '';
        }
        // Visualization of the game field
        for(let i = 1; i <= arr.length - 2; i++) {
            for(let j = 1; j <= arr.length - 2; j++) {
                if(arr[i][j] < 10) {
                    gameFieldVisualization.innerHTML = gameFieldVisualization.innerHTML + '&nbsp' + '&nbsp' + '&nbsp' + arr[i][j];
                } else {
                    gameFieldVisualization.innerHTML = gameFieldVisualization.innerHTML + '&nbsp' + '&nbsp' + arr[i][j];
                }
            }
            gameFieldVisualization.innerHTML = gameFieldVisualization.innerHTML + '<br>';
        }
        return result;
    }

    _gameFieldConsole(gameFieldArray);

    let gameFieldCollection = document.querySelectorAll('.item');

// Функция для подготовки игрового поля.
    const gameFieldStart = (arr, fn) => {
        for (let elem of arr) {
            elem.addEventListener('click', fn);
        }
    }

// Функция проверки слева (предикат)
    const checkLeft = (i, j) => gameFieldArray[i][j-1] === 0;
// Функция проверки сверху (предикат)
    const checkTop = (i, j) => gameFieldArray[i-1][j] === 0;
// Функция проверки снизу (предикат)
    const checkBottom = (i, j) => gameFieldArray[i+1][j] === 0;
// Функция проверки справа (предикат)
    const checkRight = (i, j) => gameFieldArray[i][j+1] === 0;


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

// Функция для проверки выигрыша
    function gameOver() {
        let gameOverStr = '';
        const myDiv = document.getElementById('myDiv');
        const gameFieldCollection = myDiv.querySelectorAll('.item');
        for (let elem of gameFieldCollection) {
            gameOverStr += +elem.dataset.value;
        }
        if(gameOverStr === '1234567891011121314150') {
            console.log('Game Over');
            gameOverVisualization.style.display = 'flex';
        } else {
            // gameOverVisualization.style.display = 'flex';
            console.log(`gameOverStr = ${gameOverStr}`);
            console.log('Try Again');
        }
    }

// Функция действия на клик по item
    function clickAction() {
        // console.log(this.dataset.i, this.dataset.j);
        let i = +this.dataset.i;
        let j = +this.dataset.j;
        // this.dataset.i = '100';
        // console.log(this.dataset.i);
        // console.log(gameFieldArray[i][j]);
        if (checkLeft(i, j)) {
            // console.log('ноль слева');
            gameFieldArray[i][j-1] = gameFieldArray[i][j];
            gameFieldArray[i][j] = 0;
        }
        if (checkTop(i, j)) {
            // console.log('ноль сверху');
            gameFieldArray[i-1][j] = gameFieldArray[i][j];
            gameFieldArray[i][j] = 0;
        }
        if (checkBottom(i, j)) {
            // console.log('ноль снизу');
            gameFieldArray[i+1][j] = gameFieldArray[i][j];
            gameFieldArray[i][j] = 0;
        }
        if (checkRight(i, j)) {
            // console.log('ноль справа');
            gameFieldArray[i][j+1] = gameFieldArray[i][j];
            gameFieldArray[i][j] = 0;
        }
        gameFieldVisualization.innerHTML = '';
        _gameFieldConsole(gameFieldArray);
        updateGameFieldVisualization();
        gameOver()
    }

    gameFieldStart(gameFieldCollection, clickAction);

// module.exports = _gameFieldConsole;
});
