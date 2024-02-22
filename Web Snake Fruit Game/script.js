const playboard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highscoreElement = document.querySelector(".higgh-score");
const btncontrols = document.querySelectorAll(".controls i");
let gameOver = false;
let foodx, foody, snakex = 5, snakey = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;
//Getting high score from the local storage.
let highscore = localStorage.getItem("high-score") || 0;
highscoreElement.innerText = `High Score: ${highscore}`;
const changefoodPosition = () => {
    foodx = Math.floor(Math.random() * 30) + 1;
    foody = Math.floor(Math.random() * 30) + 1;
}
const handleGameOver = () => {
    //clearing the timer and reloading the page on game over
    clearInterval(setIntervalId);
    alert("Game Over! Press OK To Replay.");
    location.reload();
}
changeDirection = (e) => {
    if(e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }else if(e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}
btncontrols.forEach(key => {
    //calling changedirection function on each key click and passing key data set value as an object
    key.addEventListener("click", () => changeDirection({key: key.dataset.key}));
});
const initgame = () => {
    if(gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foody} / ${foodx};"></div>`;
    //check if the snake eat the food
    if(snakex === foodx && snakey === foody){
        changefoodPosition();
        snakeBody.push([foodx,foody]); //pushing food position to the snake body array
        score++; //increment score by 1
        highscore = score >= highscore ? score : highscore;
        localStorage.setItem("high-score", highscore);
        scoreElement.innerText = `Score: ${score}`;
        highscoreElement.innerText = `High Score: ${highscore}`;
    }
    //updating the snake's head position based on the currently velocity.
    snakex += velocityX;
    snakey += velocityY;
    for(let i = snakeBody.length - 1; i > 0; i--){
        //shifting forward the values of the elements in the snake body by one.
        snakeBody[i] = snakeBody[i - 1];    
    }
    snakeBody[0] = [snakex, snakey];//setting first element of snake body to current snake position
    //checking if the snake's head is out of wall if so setting gameOver to true
    if(snakex <= 0 || snakex > 30 || snakey <= 0 || snakey > 30){
        gameOver = true;
    }
    for(let i = 0; i < snakeBody.length; i++){
        //adding a div box for each part of the snake's body
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]};"></div>`;
        //checking if the snake head hit the body if so set gameover to true
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[1][0]){
            gameOver = true;
        }
    }
    playboard.innerHTML = htmlMarkup;
}
changefoodPosition();
setIntervalId = setInterval(initgame, 125);
document.addEventListener("keydown", changeDirection);