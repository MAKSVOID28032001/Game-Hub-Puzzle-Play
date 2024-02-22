let turn = "X";
let gamewin = false;
let move = 0;
//function to change the turn
const changeTurn = () => {
    return turn === "X" ? "0" : "X";
}
//function to check win
const checkWin = () => {
    let boxtexts = document.getElementsByClassName('boxcontent');
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    wins.forEach(e => {
        if ((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) && (boxtexts[e[2]].innerText === boxtexts[e[1]].innerText) && (boxtexts[e[0]].innerText !== "")) {
            document.querySelector('.info').innerText = boxtexts[e[0]].innerText + " Won The Game!";
            move = 0;
            gamewin = true;
        }
    });
}
//main logic function
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtest = element.querySelector('.boxcontent');
    element.addEventListener("click", () => {
        if (gamewin) {
            move = 0;
            return;
        }
        if (boxtest.innerText === '') {
            boxtest.innerText = turn;
            if(turn === "X"){
                boxtest.style.color = 'rgb(255, 255, 0)';
            }else{
                boxtest.style.color = 'rgb(4,255,0)';
            }
            turn = changeTurn();
            move++;
            checkWin();
            if (!gamewin) {
                document.getElementsByClassName("info")[0].innerText = "Turn For " + turn;
            }
            if (!gamewin & move === 9) {
                document.querySelector('.info').innerText = 'It\'s a Draw Match!';
                move = 0;
            }
        }
    })
})
//Reset Button
// Add onclick listener to reset button
reset.addEventListener('click', () => {
    gamewin = false;
    let boxtexts = document.querySelectorAll('.boxcontent');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
    });
    turn = "X";
    isgameover = false;
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
})