let boxes = document.querySelectorAll(".box");
let reset = document.querySelectorAll(".reset");    //return nodeList
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg"); // returns node
let audioEffect = document.querySelector("#sound-effect");
let victory = document.querySelector("#victory");
let draw = document.querySelector("#draw");
// let error = document.querySelector("#error");

let count = 0;
let winFound = false;

let turnO = true;
const winPattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetgame = () => {
    turnO = true;
    enableBox();
    msgContainer.classList.add("hide");
    count = 0;
    winFound = false;
}

const disableBox = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBox = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.removeProperty("opacity");
    }
}

const showWinner = (Winner) => {
    if(count === 9) {
        draw.currentTime = 0;
        draw.play();
        setTimeout(() => draw.pause(), 1300);
        msg.innerText = `Oops its a draw`;
    }
    else {
        msg.innerText = `The Winner is ${Winner}!`;
        victory.play();
    }
    msgContainer.classList.remove("hide");
    disableBox();
};


boxes.forEach((box) => {
    box.addEventListener("click", ()=>{
        audioEffect.currentTime = 0;
        audioEffect.play();
        setTimeout(() => audioEffect.pause(), 500);
        count++;
        if(turnO) {
            box.innerText = "O";
            box.style.color = "#FF3B3B";
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "#3BA3FF";
            turnO = true;
        }
        box.style.opacity = 1;
        box.disabled = true;
        checkWinner();
    });
});

const checkWinner = () => {
    for(let pattern of winPattern) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != "") {
            if(pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                winFound = true;
                break;
            }
        } 
        
    }
    if(winFound === false && count === 9) {   //draw condn
        showWinner("Draw");
    }
    
};

reset.forEach((btn) => {                          //cause reset is of query select ALL means it has to be iterated for every node
    btn.addEventListener("click", resetgame);
});
