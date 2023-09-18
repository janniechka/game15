// i - row index; j - column index
// arr - initial array
// return true or false
const checkIfNullIsOnTheLeft = (i, j, arr) => arr[i][j-1] === 0;
const checkIfNullIsOnTheTop = (i, j, arr) => arr[i-1][j] === 0;
const checkIfNullIsOnTheBottom = (i, j, arr) => arr[i+1][j] === 0;
const checkIfNullIsOnTheRight = (i, j, arr) => arr[i][j+1] === 0;

// i - row index; j - column index
// arr - initial array
// return true or false
const checkIfLeftIsTheEdge = (i, j, arr) => arr[i][j-1] !== -1;
const checkIfTopIsTheEdge = (i, j, arr) => arr[i-1][j] !== -1;
const checkIfRightIsTheEdge = (i, j, arr) => arr[i][j+1] !== -1;
const checkIfBottomIsTheEdge = (i, j, arr) => arr[i+1][j] !== -1;

// function for creating btnVariants array - a two-dimensional array consisting of index i and j of possible moves
// i - row index; j - column index
// arr - initial array

const createBtnVariantsArr = (i, j, arr) => {
    let btnVariants = [];
    if(checkIfLeftIsTheEdge(i, j, arr)) {
        btnVariants.push([i, j-1]);
    }
    if(checkIfTopIsTheEdge(i, j, arr)) {
        btnVariants.push([i-1, j]);
    }
    if(checkIfRightIsTheEdge(i, j, arr)) {
        btnVariants.push([i, j+1]);
    }
    if(checkIfBottomIsTheEdge(i, j, arr)) {
        btnVariants.push([i+1, j]);
    }
    return btnVariants;
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

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

// arr - initial array
// neededElem - element we are currently working with; neededBtnI, neededBtnJ - its i and j index
// zeroElem - element with zero value; nullBtnI, nullBtnJ - its i and j index
function makeMove(arr, neededElem, zeroElem, neededBtnI, neededBtnJ, nullBtnI, nullBtnJ) {
    if(checkIfNullIsOnTheRight(neededBtnI, neededBtnJ, arr)) {
        changeGameFieldArray(arr, {a: neededBtnI, b: neededBtnJ, c: nullBtnI, d: nullBtnJ});
        changeDatasetIndex(neededElem, zeroElem, {indexStr: 'j', a: neededBtnJ + 1, b: -1});
        changeItemPosition(neededElem, zeroElem, 'left', MOVE_ITEM, -MOVE_ITEM);
    }
    if(checkIfNullIsOnTheBottom(neededBtnI, neededBtnJ, arr)) {
        changeGameFieldArray(arr, {a: neededBtnI, b: neededBtnJ, c: nullBtnI, d: nullBtnJ});
        changeDatasetIndex(neededElem, zeroElem, {indexStr: 'i', a: neededBtnI + 1, b: -1});
        changeItemPosition(neededElem, zeroElem, 'top', MOVE_ITEM, -MOVE_ITEM);
    }
    if(checkIfNullIsOnTheLeft(neededBtnI, neededBtnJ, arr)) {
        changeGameFieldArray(arr, {a: neededBtnI, b: neededBtnJ, c: nullBtnI, d: nullBtnJ});
        changeDatasetIndex(neededElem, zeroElem, {indexStr: 'j', a: neededBtnJ - 1, b: 1});
        changeItemPosition(neededElem, zeroElem, 'left', -MOVE_ITEM, MOVE_ITEM);
    }
    if(checkIfNullIsOnTheTop(neededBtnI, neededBtnJ, arr)) {
        changeGameFieldArray(arr, {a: neededBtnI, b: neededBtnJ, c: nullBtnI, d: nullBtnJ});
        changeDatasetIndex(neededElem, zeroElem, {indexStr: 'i', a: neededBtnI - 1, b: 1});
        changeItemPosition(neededElem, zeroElem, 'top', -MOVE_ITEM, MOVE_ITEM);
    }
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
