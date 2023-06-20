let gameFieldArray = [
    [-1, -1, -1, -1, -1, -1],
    [-1, 1, 5, 2, 3, -1],
    [-1, 4, 0, 6, 7, -1],
    [-1, 8, 9, 10, 11, -1],
    [-1, 12, 13, 14, 15, -1],
    [-1, -1, -1, -1, -1, -1]
];

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
        console.log(gameFieldLine);
        result += gameFieldLine;
        gameFieldLine = '';
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


// Функция действия на клик по item
function clickAction() {
    console.log(this.dataset.i, this.dataset.j);
    let i = +this.dataset.i;
    let j = +this.dataset.j;
    // this.dataset.i = '100';
    // console.log(this.dataset.i);
    // console.log(gameFieldArray[i][j]);
    if (checkLeft(i, j)) console.log('ноль слева');
    if (checkTop(i, j)) console.log('ноль сверху');
    if (checkBottom(i, j)) console.log('ноль снизу');
    if (checkRight(i, j)) console.log('ноль справа');
}

gameFieldStart(gameFieldCollection, clickAction);

// module.exports = _gameFieldConsole;
