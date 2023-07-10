const MOVE_ITEM = 56;
let gameFieldArray = [
    [-1, -1, -1, -1, -1, -1],
    [-1, 1, 2, 3, 4, -1],
    [-1, 5, 6, 7, 8, -1],
    [-1, 9, 10, 11, 12, -1],
    [-1, 13, 0, 14, 15, -1],
    [-1, -1, -1, -1, -1, -1]
];

const renderGameField = (arr) => {
    let wrapper = document.querySelector('.wrapper');
    let myDiv = document.createElement('div');
    myDiv.id = 'myDiv';
    for(let i = 1; i <= arr.length - 2; i++) {
        for(let j = 1; j <= arr.length - 2; j++) {
            let myDivSpan = document.createElement('span');
            myDivSpan.dataset.i = `${i}`;
            myDivSpan.dataset.j = `${j}`;
            myDivSpan.dataset.value = `${arr[i][j]}`;
            myDivSpan.innerHTML = `${arr[i][j]}`;
            myDivSpan.className = arr[i][j] === 0 ? `item item-zero` : `item`;
            myDivSpan.style.top = `${(i - 1) * MOVE_ITEM}px`;
            myDivSpan.style.left = `${(j - 1) * MOVE_ITEM}px`;
            myDiv.append(myDivSpan);
        }
    }
    wrapper.prepend(myDiv);
}

// Первичный рендеринг игрового поля
renderGameField(gameFieldArray);
