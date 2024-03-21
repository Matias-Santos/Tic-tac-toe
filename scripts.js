let turn = "X";
let wins = 0;
let loses = 0;
let time = "00:00";
let isWinnable = true;
let initialTime = new Date()

function updateTime() {
    const timeElement = document.getElementById('timeValue');
    const now = new Date();
    const result = new Date(now - initialTime)
    const minutes = String(result.getMinutes()).padStart(2, '0');
    const seconds = String(result.getSeconds()).padStart(2, '0');
    const timeString = minutes + ':' + seconds;
    timeElement.textContent = timeString;
}

// Update the time immediately upon page load
updateTime();

// Update the time every second
setInterval(updateTime, 1000);

const swapTurn = () => {
    if (turn === "X") {
        turn = "O";
    } else {
        turn = "X";
    }
    let turnTag = document.getElementById("turnValue")
    turnTag.innerText = turn;
}

const markBoard = (id) => {
    let squareTapped = document.getElementById(id);
    if ((!!!squareTapped.childNodes[1].className) && (isWinnable)) {
        squareTapped.childNodes[1].className =  (turn === "X") ? "cross" : "circle" 
        swapTurn();
    }
}

let winStates = [["00", "01", "02"], ["10","11","12"], ["20","21","22"],
                ["00","10","20"], ["01","11","21"], ["02","12","22"],
                ["00","11","22"],["02","11","20"]];

const setPoints = (className) => {
    if (className === "cross") {
        wins++;
        document.getElementById("winsValue").innerText = wins;
    } else {
        loses++;
        document.getElementById("losesValue").innerText = loses;
    }
}

const setAnimations = (index) => {
    winStates[index].forEach((state) => {
        let square = document.getElementById("square" + state.charAt(0) + state.charAt(1));
        square.childNodes[1].classList.add("winner");
    })
}

const checkWin = (id) => {
    let xValue = id.charAt(7);
    let yValue = id.charAt(6);
    
    for (let i = 0; i < winStates.length; i++) {
        let winState = winStates[i];
        let hasWon = true;
        let tappedClassName = document.getElementById("square" + yValue + xValue).childNodes[1].className;
        for (let j = 0; j < winState.length; j++) {
            let secondContainerBox = document.getElementById("square" + winState[j].charAt(0) + winState[j].charAt(1));
            let secondClassName = secondContainerBox.childNodes[1].className;
            if (tappedClassName !== secondClassName) {
                hasWon = false;
                break;
            }
        }
        if (hasWon) {
            isWinnable = false;
            console.log(tappedClassName + " won the game!");
            setPoints(tappedClassName);
            setAnimations(i)
        }
    }
}

const restartTapped = () => {
    turn = "X"
    isWinnable = true;
    let boxes = document.getElementById('board').childNodes;
    boxes.forEach((box) => {if(box.tagName === 'DIV') {box.childNodes[1].className = ''}});
}

const boardTapped = (id) => {
    markBoard(id);
    checkWin(id)
}


