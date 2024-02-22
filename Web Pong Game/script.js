//BOARD
let board;
let boardwidth = 800;
let boardheight = 500;
let context;

//PLAYERS
let playerwidth = 10;
let playerheight = 60;
let playervelocityy = 0;

let player1 = {
    x: 10,
    y: boardwidth / 4,
    width: playerwidth,
    height: playerheight,
    velocityy : playervelocityy
}

let player2 = {
    x: boardwidth - playerwidth - 10,
    y: boardwidth / 4,
    width: playerwidth,
    height: playerheight,
    velocityy : playervelocityy
}

//BALL FOR GAME
let ballwidth = 10;
let ballheight = 10;
let ball = { 
    x : boardwidth / 2,
    y : boardheight / 2,
    width : ballwidth,
    height : ballheight,
    velocityx : 2,
    velocityy : 3
}

let player1score = 0;
let player2score = 0;

window.onload = function(){
    board = document.getElementById('cnv');
    board.height = boardheight;
    board.width = boardwidth;
    context = board.getContext("2d"); //USED FOR DRAWING ON THE BOARD

    //DRAW INITIAL PLAYER1
    context.fillStyle = "#63d4b0";
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    requestAnimationFrame(update);
    // document.addEventListener("keydown",moveplayer);
    // Add event listeners for keydown and keyup events
    document.addEventListener("keydown", function (e) {
        // PLAYER1
        if (e.code == "KeyW") {
            player1.velocityy = -4;
        } else if (e.code == "KeyS") {
            player1.velocityy = 4;
        }
        // PLAYER2
        if (e.code == "KeyI") {
            player2.velocityy = -4;
        } else if (e.code == "KeyJ") {
            player2.velocityy = 4;
        }
    });

    document.addEventListener("keyup", function (e) {
        // PLAYER1
        if (e.code == "KeyW" || e.code == "KeyS") {
            player1.velocityy = 0;
        }
        // PLAYER2
        if (e.code == "KeyI" || e.code == "KeyJ") {
            player2.velocityy = 0;
        }
    });
}

function update(){
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    //PLAYER1
    context.fillStyle = "#63d4b0";
    // player1.y += player1.velocityy;
    let nextplayer1y = player1.y + player1.velocityy;
    if(!outOfBounds(nextplayer1y)){
        player1.y = nextplayer1y;
    }
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    //PLAYER2
    context.fillStyle = "#b055fa";
    // player2.y += player2.velocityy;
    let nextplayer2y = player2.y + player2.velocityy;
    if(!outOfBounds(nextplayer2y)){
        player2.y = nextplayer2y;
    }
    context.fillRect(player2.x, player2.y, player2.width, player2.height);

    //BALL FOR GAME
    context.fillStyle = "#fa8d34";
    ball.x += ball.velocityx;
    ball.y += ball.velocityy;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    //IF BALL TOUCHES TOP OR BOTTOM OF CANVAS
    if(ball.y <= 0 || (ball.y + ball.height >= boardheight)){
        ball.velocityy *= -1; //REVERSE DIRECTION
    }

    //BOUNCE THE BALL BACK
    if(detectcollision(ball, player1)){
        if(ball.x <= player1.x + player1.width){
            //LEFT SIDE OF BALL TOUCHES RIGHT SIDE OF PLAYER1
            ball.velocityx *= -1;//FLIP X DIRECTION
        }
    }else if(detectcollision(ball, player2)){
        if(ball.x + ballwidth >= player2.x){
            //RIGHT SIDE OF BALL TOUCHES LEFT SIDE OF PLAYER2
            ball.velocityx *= -1; //FLIP X DIRECTION
        }
    }

    //GAMEOVER
    if(ball.x < 0){
        player2score++;
        resetgame(2);
    }else if(ball.x + ballwidth > boardwidth){
        player1score++;
        resetgame(-2);
    }
    context.font = "20px sans-serif";
    context.fillText(player1score, boardwidth / 5, 50);
    context.fillText(player2score, boardwidth*4/5 -50, 50);

    //DRAW DOTTED LINE DOWN THE MIDDLE
    for(let i = 10; i < board.height; i += 25){
        //I = STARTING Y POSITION DRAW A SQUARE EVERY 25 PIXELS DOWN
        //(X POSITION = HALF OF BOARDWIDTH - 10), I = Y POSITION WIDTH = 5, HEIGHT = 5
        context.fillRect(boardwidth/2 - 10, i, 5, 5);
    }
}

function outOfBounds(yposition){
    return (yposition < 0 || yposition + playerheight > boardheight);
}

function detectcollision(a,b){
    return a.x < b.x + b.width && //a's top left corner doesn't reach b's top right corner
                a.x + a.width > b.x && //a's top right corner passes b's top left corner
                a.y < b.y + b.height && //a's top left corner doesn't reach reach b's bottom left corner
                a.y + a.height > b.y //a's bottom left corner passes b's top left corner
}
function resetgame(direction){
    ball = { 
        x : boardwidth / 2,
        y : boardheight / 2,
        width : ballwidth,
        height : ballheight,
        velocityx : direction,
        velocityy : 3
    }
}
let p1u = document.getElementById('p1u');
p1u.addEventListener('touchstart', () => {
    player1.velocityy = -4;
});
p1u.addEventListener('touchend',() =>{
    player1.velocityy = 0;
});
let p1d = document.getElementById('p1d');
p1d.addEventListener('touchstart', () => {
    player1.velocityy = 4;
});
p1d.addEventListener('touchend',() =>{
    player1.velocityy = 0;
});
let p2u = document.getElementById('p2u');
p2u.addEventListener('touchstart', () => {
    player2.velocityy = -4;
});
p2u.addEventListener('touchend',() =>{
    player2.velocityy = 0;
});
let p2d = document.getElementById('p2d');
p2d.addEventListener('touchstart', () => {
    player2.velocityy = 4;
});
p2d.addEventListener('touchend',() =>{
    player2.velocityy = 0;
});
let spacebtn = document.getElementById('space');
spacebtn.addEventListener('click', function(){
    location.reload();
})
let buttongroup = document.getElementById('buttongroup');
function updateButtonVisibility(){
    if(window.innerWidth <= 768){
        buttongroup.style.display = "flex";
    }else{
        buttongroup.style.display = "none";
    }
}
window.addEventListener('resize',updateButtonVisibility);
updateButtonVisibility();