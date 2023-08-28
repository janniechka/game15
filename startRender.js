const MOVE_ITEM = 104;
// const MOVE_ITEM = 68;
let gameFieldArray = [
    [-1, -1, -1, -1, -1, -1],
    [-1, 1, 2, 3, 4, -1],
    [-1, 5, 6, 7, 8, -1],
    [-1, 9, 10, 11, 12, -1],
    [-1, 13, 14, 15, 0, -1],
    [-1, -1, -1, -1, -1, -1]
];
let countElement = document.getElementById('count');
let movesCounter = document.querySelector('.moves-counter');

const renderGameField = (arr) => {
    let wrapper = document.querySelector('.wrapper');
    let myDiv = document.createElement('div');
    myDiv.id = 'myDiv';
    for(let i = 1; i <= arr.length - 2; i++) {
        for(let j = 1; j <= arr.length - 2; j++) {
            let myDivSpan = document.createElement('span');
            myDivSpan.dataset.i = `${i}`;
            myDivSpan.dataset.j = `${j}`;
            // myDivSpan.dataset.value = `${arr[i][j]}`;
            myDivSpan.id = `id-${arr[i][j]}`;
            myDivSpan.innerHTML = `${arr[i][j]}`;
            myDivSpan.className = arr[i][j] === 0 ? `item item-zero btn-before-mix` : `item btn-before-mix`;
            myDivSpan.style.top = `${(i - 1) * MOVE_ITEM}px`;
            myDivSpan.style.left = `${(j - 1) * MOVE_ITEM}px`;
            myDiv.append(myDivSpan);
        }
    }
    wrapper.prepend(myDiv);
}

// Первичный рендеринг игрового поля
renderGameField(gameFieldArray);


// После каждого хода игрока счетчик увеличивается
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
let counter = createCount()();
