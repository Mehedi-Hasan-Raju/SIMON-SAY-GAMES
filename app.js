let gameseq = [];
let userSeq = [];

let btns = ["yellow", "red", "green", "purple"];

let started = false;
let level = 0;
let highestScore = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if (started == false) {
        console.log("Game is started");
        started = true;

        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 550);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `level ${level}`;

    let randIdx = Math.floor(Math.random() * 4); // Corrected to 4
    let randomColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randomColor}`);
    gameseq.push(randomColor);
    console.log(gameseq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameseq[idx]) {
        if (userSeq.length == gameseq.length) {
            setTimeout(levelUp, 1000);
            if (level > highestScore) {
                highestScore = level;
                document.getElementById('highest-score').innerText = highestScore; // Update highest score display
            }
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;

        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

function btnpress() {
    let btn = this;
    userflash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnpress);
}

function reset() {
    started = false;
    gameseq = [];
    userSeq = [];
    level = 0;
}
