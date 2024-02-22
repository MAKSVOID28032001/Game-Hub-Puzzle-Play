//BOARD
let board;
let boardwidth = 500;
let boardheight = 600;
let context;

//PLAYER
let playerwidth = 80; //CHEAT CODE CHAGE THE NUMBER 80 TO 500
let playerheight = 10;
let playerVelocityx = 10;

let player = {
    x: boardwidth / 2 - playerwidth / 2,
    y: boardheight - playerheight - 5,
    width: playerwidth,
    height: playerheight,
    velocityx: playerVelocityx
}

//BALL
let ballwidth = 10;
let ballheight = 10;
let ballvelocityx = 3; //CHEAT CODE CHAGE THE NUMBER 3 TO 15
let ballvelocityy = 2; //CHEAT CODE CHAGE THE NUMBER 2 TO 10
let ball = {
    x: boardwidth / 2,
    y: boardheight / 2,
    width: ballwidth,
    height: ballheight,
    velocityx: ballvelocityx,
    velocityy: ballvelocityy
}

//BLOCKS
let blockarray = [];
let blockwidth = 50;
let blockheight = 10;
let blockColumns = 8;
let blockRows = 3; //ADD MORE GAME GOES ON
let blockMaxRows = 9; //LIMIT HOW MANY ROWS
let blockcount = 0;

let blockX = 15;
let blockY = 45;

let score = 0;
let gameover = false;

window.onload = function () {
    board = document.getElementById('board');
    board.height = boardheight;
    board.width = boardwidth;
    context = board.getContext("2d");

    context.fillStyle = "lightgreen";
    context.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(update);
    document.addEventListener("keydown", movePlayer);

    //CREATE BLOCKS
    createBlocks();
}
function update() {
    requestAnimationFrame(update);
    if (gameover) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);
    context.fillStyle = "lightgreen";
    context.fillRect(player.x, player.y, player.width, player.height);

    context.fillStyle = "orange";
    ball.x += ball.velocityx;
    ball.y += ball.velocityy;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    //BOUNCE BALL OFF WALLS
    if (ball.y <= 0) {
        //IF THE BALL TOUCHES TOP OF CANVAS
        ball.velocityy *= -1; //reverse direction
    } else if (ball.x <= 0 || (ball.x + ball.width) >= boardwidth) {
        //IF THE BALL TOUCHES LEFT OR RIGHT OF CANVAS
        ball.velocityx *= -1; //reverse direction
    } else if (ball.y + ball.height >= boardheight) {
        //GAME OVER
        context.font = "20px sans-serif";
        context.fillText("Game Over: Press 'Space' To Restart", 80, 400);
        gameover = true;
    }
    if (topcollision(ball, player) || bottomcollision(ball, player)) {
        ball.velocityy *= -1;
    } else if (leftcollision(ball, player) || rightcollision(ball, player)) {
        ball.velocityx *= -1;
    }

    //BLOCKS
    context.fillStyle = "skyblue";
    for (let i = 0; i < blockarray.length; i++) {
        let block = blockarray[i];
        if (!block.break) {
            if (topcollision(ball, block) || bottomcollision(ball, block)) {
                block.break = true;
                ball.velocityy *= -1; //FLIP Y DIRECTION UP OR DOWN
                blockcount -= 1;
                score += 100;
            } else if (leftcollision(ball, block) || rightcollision(ball, block)) {
                block.break = true;
                ball.velocityx *= -1; //FLIP X DIRECTION LEFT OR RIGHT
                blockcount -= -1;
                score += 100;
            }
            context.fillRect(block.x, block.y, block.width, block.height);
        }
    }

    //NEXT LEVEL
    if (blockcount == 0) {
        score += 100 * blockRows * blockColumns; //BONUS POINTS
        blockRows = Math.min(blockRows + 1, blockRows);
        createBlocks();
    }

    //SCORE BOARD
    context.font = "20px sans-serif";
    context.fillText(score, 10, 25);
}
function outofbounds(xPosition) {
    return (xPosition < 0 || xPosition + playerwidth > boardwidth);
}
function movePlayer(e) {
    if (gameover) {
        if (e.code == "Space") {
            resetgame();
        }
    }
    if (e.code == "ArrowLeft") {
        // player.x -= player.velocityx; 
        let nextplayerX = player.x - player.velocityx;
        if (!outofbounds(nextplayerX)) {
            player.x = nextplayerX;
        }
    } else if (e.code == "ArrowRight") {
        // player.x += player.velocityx;
        let nextplayerX = player.x + player.velocityx;
        if (!outofbounds(nextplayerX)) {
            player.x = nextplayerX;
        }
    }
}
function detectcollision(a, b) {
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}
function topcollision(ball, block) {
    return detectcollision(ball, block) && (ball.y + ball.height) > block.y;
}
function bottomcollision(ball, block) {
    return detectcollision(ball, block) && (block.y + block.height) >= ball.y;
}
function leftcollision(ball, block) {
    return detectcollision(ball, block) && (ball.x + ball.width) >= block.x;
}
function rightcollision(ball, block) {
    return detectcollision(ball, block) && (block.x + block.width) >= ball.x;
}

function createBlocks() {
    blockarray = [];
    for (let c = 0; c < blockColumns; c++) {
        for (let r = 0; r < blockRows; r++) {
            let block = {
                x: blockX + c * blockwidth + c * 10, //C * 10 SPACE 10 PIXELS APART COLUMNS
                y: blockY + r * blockheight + r * 10, //R *10 SPACE 10 PIXELS APART ROWS
                width: blockwidth,
                height: blockheight,
                break: false
            }
            blockarray.push(block);
        }
    }
    blockcount = blockarray.length;
}

function resetgame() {
    gameover = false;
    player = {
        x: boardwidth / 2 - playerwidth / 2,
        y: boardheight - playerheight - 5,
        width: playerwidth,
        height: playerheight,
        velocityx: playerVelocityx
    }
    ball = {
        x: boardwidth / 2,
        y: boardheight / 2,
        width: ballwidth,
        height: ballheight,
        velocityx: ballvelocityx,
        velocityy: ballvelocityy
    }
    blockarray = [];
    blockRows = 3;
    score = 0;
    createBlocks();
}

//BUTTONS FOR MOBILE AND TABLET USERS
const leftbutton = document.getElementById('Left').addEventListener("click", () => {
    movePaddleLeft();
});
const rightbutton = document.getElementById('Right').addEventListener("click", () => {
    movePaddleRight();
});
function movePaddleLeft() {
    let nextPlayerX = player.x - player.velocityx;
    if (!outofbounds(nextPlayerX)) {
        player.x = nextPlayerX;
    }
}
function movePaddleRight() {
    let nextPlayerX = player.x + player.velocityx;
    if (!outofbounds(nextPlayerX)) {
        player.x = nextPlayerX;
    }
}
let spcbtn = document.getElementById('space');
spcbtn.addEventListener('click', function(){
    location.reload();
})
let btngr = document.getElementById('BTNGR');
function updateButtonVisibility() {
    if (window.innerWidth <= 768) { // Adjust the width as needed for tablets and mobile
        btngr.style.display = "flex";
    } else {
        btngr.style.display = "none";
    }
}
window.addEventListener("resize", updateButtonVisibility);
updateButtonVisibility();