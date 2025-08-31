let gameSeq=[];
let userSeq=[];

let started=false;
let level=0;
let highScore = localStorage.getItem("highScore") || 0;
let btns=["yellow","red","green","purple"]

let h2=document.querySelector("h2");


document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game is started");
        started=true;

        levelUp();
    }
})
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
    btn.classList.remove("flash");
},300);
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
    btn.classList.remove("userflash");
},300);
}

function levelUp(){
    level++;
    h2.innerText=`Level ${ level}`;

    let randIdx= Math.floor(Math.random()*4);
    let randColor= btns[randIdx];
    let randbtn=document.querySelector(`.${randColor}`)
    gameSeq.push(randColor);
     console.log(gameSeq);
    gameFlash(randbtn);
}
function checkAns(){
    let idx = userSeq.length - 1;  
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp, 1000);
            userSeq = []; 
        }
    }
    else{
        if(level > highScore){
            highScore = level;
            localStorage.setItem("highScore", highScore); // ✅ Save permanently
        }

        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Highest Score: <b>${highScore}</b> <br> Press any key to start`;

        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        }, 120);
        reset();
    }
}


function btnPress(){
   
    let btn = this;
    userFlash(btn);

    userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userSeq);
    console.log(userColor);

    checkAns()
}
let allbtn=document.querySelectorAll('.btn');
for(btn of allbtn){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}