// Функция проверки слева (предикат)
const checkLeft = (i, j, arr) => arr[i][j-1] === 0;
// Функция проверки сверху (предикат)
const checkTop = (i, j, arr) => arr[i-1][j] === 0;
// Функция проверки снизу (предикат)
const checkBottom = (i, j, arr) => arr[i+1][j] === 0;
// Функция проверки справа (предикат)
const checkRight = (i, j, arr) => arr[i][j+1] === 0;


// Функция для проверки выигрыша
const gameOver = arr => {
    let gameOverStr = '';
    if(arr[1][1] !== 1) return false;
    if(arr[1][4] !== 4) return false;
    if(arr[4][1] !== 13) return false;
    if(arr[4][4] !== 0) return false;
    for(let i = 1; i <= arr.length - 2; i++) {
        for(let j = 1; j <= arr.length - 2; j++) {
            gameOverStr += arr[i][j];
        }
    }
    if (gameOverStr === '1234567891011121314150') {
        return true;
    }
}

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
    return result;
}

const _gameFieldPageVisualization = (arr) => {
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
}


const changeGameFieldArray = (arr, {a, b, c, d}) => {
    arr[c][d] = arr[a][b];
    arr[a][b] = 0;
}

function changeDatasetIndex(elem, zero, {indexStr, a, b}) {
    elem.dataset[indexStr] = String(a);
    zero.dataset[indexStr] = String(+elem.dataset[indexStr] + b);
}

function changeItemPosition(elem, zero, direction, step1, step2) {
    elem.style[direction] = `${+elem.style[direction].slice(0,-2) + step1}px`;
    zero.style[direction] = `${+zero.style[direction].slice(0,-2) + step2}px`;
}
