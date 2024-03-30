// let body = document.querySelector("body");
let game_container = document.querySelector(".Game-Container");
let boxes = document.querySelectorAll(".box");
let resetGameBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");

let turnO = true;       // track to turn of either playerO or playerX
let count = 0;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  game_container.classList.remove("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO === true){
            box.innerText = "O";
            turnO = false;
        }
        else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;
        let isWinner = checkWinner();
        if(count === 9 && !isWinner){
            gameDraw();
        }
    });
});

const checkWinner = () => {
    for(pattern of winPatterns){
        let val1 = boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;
        
        if(val1 !== "" && val2 !== "" && val3 !== ""){
            if(val1 === val2 && val2 === val3){
                console.log("Winner", val1);
                showWinner(val1);
            }
        }
    }
};

const gameDraw = () => {
    msg.innerText = `OOPS, Game Draw!`;
    msgContainer.classList.remove("hide");
    game_container.classList.add("hide");
    disableBoxes();    
}

const showWinner = (val1) => {
    msg.innerText = `Congratulations, Winner is ${val1}`;
    msgContainer.classList.remove("hide");
    game_container.classList.add("hide");
    disableBoxes();
}

const disableBoxes = () => {
    for(box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

newGameBtn.addEventListener("click", resetGame);
resetGameBtn.addEventListener("click", resetGame);