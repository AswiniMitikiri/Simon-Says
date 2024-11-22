let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green","purple"];

let started = false;
let level = 0;
let highScore = 0;   //extra for high score

let h2 = document.querySelector("h2");
let h1 = document.querySelector("h1");

// Load high score from localStorage if available   -- extra function for highscore
// if (localStorage.getItem("highScore")) {
//     highScore = localStorage.getItem("highScore");
//     h1.innerText = `Simon Game - High Score: ${highScore}`;
// }

document.addEventListener("keypress",function(){
    //console.log("Key is pressed");
    if(started == false){
        console.log("Game Started");
        started = true;

        levelUp();
    } 
});

function gameFlash(btn){
    btn.classList.add("flash")
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
};

function userFlash(btn){
    btn.classList.add("userflash")
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
};

function levelUp(){
    userSeq = [];  //making userSeq empty to check the values with gameSeq from the beginning(user needs to press the sequence from the beginning)
    level++;
    h2.innerText = `level ${level}`;

    //choose random btn
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
};

function checkAns(idx){
    //console.log("curr level: ", level);
    //let idx = level - 1;

    if(userSeq[idx] == gameSeq[idx]){
        //console.log("Same value");
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);   //time is set to clearly visible the levelup
        }
    } else{
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br> Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);

        //extra for high score
        if (level > highScore) {
            highScore = level;
            localStorage.setItem("highScore", highScore); // Save new high score to localStorage
            h1.innerText = `Simon Game - High Score: ${highScore}`;
        }

        reset();
    }
}

function btnPress(){
    //console.log(this);
    let btn = this;   //pressed btn
    userFlash(btn);

    userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");

for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}