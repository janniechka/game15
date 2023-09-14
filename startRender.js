let MOVE_ITEM = 104;
let mixSpeed = 300;
let gameFieldArray = [
    [-1, -1, -1, -1, -1, -1],
    [-1,  1,  2,  3,  4, -1],
    [-1,  5,  6,  7,  8, -1],
    [-1,  9, 10, 11, 12, -1],
    [-1, 13, 14, 15,  0, -1],
    [-1, -1, -1, -1, -1, -1]
];
let countElement = document.getElementById('count');
let movesCounter = document.querySelector('.moves-counter');
let pageWidth = document.documentElement.scrollWidth;

if(pageWidth <= 420) {
    MOVE_ITEM = 68;
}

// i - row index; j - column index
// arr - initial array
// elemsWrapper - wrapper where each generated element will be appended to
const generateElement = (i, j, arr, elemsWrapper) => {
    let elem = document.createElement('span');
    elem.dataset.i = `${i}`;
    elem.dataset.j = `${j}`;
    elem.id = `id-${arr[i][j]}`;
    elem.innerHTML = `${arr[i][j]}`;
    elem.className = arr[i][j] === 0 ? `item item-zero btn-before-mix` : `item btn-before-mix`;
    elem.style.top = `${(i - 1) * MOVE_ITEM}px`;
    elem.style.left = `${(j - 1) * MOVE_ITEM}px`;
    elem.style.transition = `left ${mixSpeed}ms linear, top ${mixSpeed}ms linear 0s`;
    elemsWrapper.append(elem);
}

const renderGameField = arr => {
    let mainWrapper = document.getElementById('mainWrapper');
    let fieldWrapper = document.createElement('div');
    fieldWrapper.id = 'fieldWrapper';
    for(let i = 1; i <= arr.length - 2; i++) {
        for(let j = 1; j <= arr.length - 2; j++) {
            generateElement(i, j, arr, fieldWrapper);
        }
    }
    mainWrapper.prepend(fieldWrapper);
}

renderGameField(gameFieldArray);

const createCount = () => {
    let count = 0;
    return () => {
        return {
            getCount: () => count,
            setCount: () => {
                count += 1;
            }
        }
    }
}

const counter = createCount()();
