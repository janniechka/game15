// i - row index; j - column index
// arr - initial array
// return true or false
const checkLeft = (i, j, arr) => arr[i][j-1] === 0;
const checkTop = (i, j, arr) => arr[i-1][j] === 0;
const checkBottom = (i, j, arr) => arr[i+1][j] === 0;
const checkRight = (i, j, arr) => arr[i][j+1] === 0;

// arr - initial array
// return true or false
const isGameOver = arr => {
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
    return gameOverStr === '1234567891011121314150';
}

// Функция для вывода игрового поля в консоль
// const _gameFieldConsole = arr => {
//     let gameFieldLine = '';
//     let result = '';
//     for(let i = 0; i <= arr.length - 1; i++) {
//         for(let j = 0; j <= arr.length - 1; j++) {
//             if(arr[i][j] < 10 && arr[i][j] >= 0) {
//                 gameFieldLine = gameFieldLine + ' ' + arr[i][j] + '  ';
//             } else {
//                 gameFieldLine = gameFieldLine + arr[i][j] + '  ';
//             }
//         }
//         // console.log(gameFieldLine);
//         result += gameFieldLine;
//         gameFieldLine = '';
//     }
//     return result;
// }

// const _gameFieldPageVisualization = (arr) => {
//     // Visualization of the game field
//     for(let i = 1; i <= arr.length - 2; i++) {
//         for(let j = 1; j <= arr.length - 2; j++) {
//             if(arr[i][j] < 10) {
//                 gameFieldVisualization.innerHTML = gameFieldVisualization.innerHTML + '&nbsp' + '&nbsp' + '&nbsp' + arr[i][j];
//             } else {
//                 gameFieldVisualization.innerHTML = gameFieldVisualization.innerHTML + '&nbsp' + '&nbsp' + arr[i][j];
//             }
//         }
//         gameFieldVisualization.innerHTML = gameFieldVisualization.innerHTML + '<br>';
//     }
// }

// arr - initial array
// a - row index of current element; b - column index of current element
// c - row index of the element with which the exchange takes place; d - its column index
const changeGameFieldArray = (arr, {a, b, c, d}) => {
    arr[c][d] = arr[a][b];
    arr[a][b] = 0;
}

// Функция для смены индексов dataset.i если элементы переставляются в столбце и dataset.j если в строке.
// [indexStr] принимает 'i' или 'j' соответственно
// elem - current element
// zero - element with which the exchange takes place
// indexStr - can be 'i' if exchange takes place in a column or 'j' if in a row
// a accept j + 1 / j - 1 if exchange takes place in a row or i - 1 / i + 1 if in a column
// b can be 1 or -1 depending on exchange direction
const changeDatasetIndex = (elem, zero, {indexStr, a, b}) => {
    elem.dataset[indexStr] = String(a);
    zero.dataset[indexStr] = String(+elem.dataset[indexStr] + b);
}

// Функция которая производит фактический обмен местами в отображении, меняются параметры left если элемент передвигается в стоке и top если в столбце
// [direction] принимает 'top' или 'left' соответственно
// elem - current element
// zero - element with which the exchange takes place
// direction - can be 'top' if exchange takes place in a column or 'left' if in a row
// step1 and step2 both accept MOVE_ITEM or -MOVE_ITEM depending on what exchange takes place
const changeItemPosition = (elem, zero, direction, step1, step2) => {
    elem.style[direction] = `${+elem.style[direction].slice(0,-2) + step1}px`;
    zero.style[direction] = `${+zero.style[direction].slice(0,-2) + step2}px`;
}
