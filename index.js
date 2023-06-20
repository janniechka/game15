const sum = require('./sum.js');

console.log('Game15');
let gameField = [
    [-1, -1, -1, -1, -1, -1],
    [-1, 0, 1, 2, 3, -1],
    [-1, 4, 5, 6, 7, -1],
    [-1, 8, 9, 10, 11, -1],
    [-1, 12, 13, 14, 15, -1],
    [-1, -1, -1, -1, -1, -1]
];

console.log(sum(3,4));

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

_gameFieldConsole(gameField);

module.exports = _gameFieldConsole;

let item_11 = document.getElementsByClassName('item-11');

item_11.addEventListener('click', () => {

});
