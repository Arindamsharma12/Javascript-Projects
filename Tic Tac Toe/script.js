console.log("Welcome to Tic Tac Toe")
let music = new Audio("music.mp3")
let audioTurn = new Audio("ting.mp3")
let gameover = new Audio("gameover.mp3")
let turn = "X"
let isgameover = false
// Function to change the turn
const changeTurn = (turn)=>{
    return turn === "X" ? "0" : "X"
}

// Function to check for a win
const checkWin = ()=>{
    let boxes = document.getElementsByClassName("box")
    let win = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    win.forEach((e)=>{
        if((boxes[e[0]].innerText === boxes[e[1]].innerText) && (boxes[e[0]].innerText === boxes[e[2]].innerText) && (boxes[e[0]].innerText !== "")){
            document.querySelector('.info').innerText = boxes[e[0]].innerText + " Won!"
            gameover.play()
            isgameover = true
            document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "200px"
            document.querySelector(".line").style.transform = 'translate(10vw,20vw) rotate(90deg)'
        }
    })
}

// Game Logic
let boxes = document.getElementsByClassName("box")
Array.from(boxes).forEach(ele =>{
    let boxtext = ele.querySelector(".boxtext")
    ele.addEventListener("click",()=>{
        if(boxtext.innerText === ""){
            boxtext.innerText = turn
            turn = changeTurn(turn)
            audioTurn.play()
            checkWin()
            if(!isgameover){
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn
            }
        }
    })
})

// Add onclick listener to reset button 
let reset = document.getElementById("reset")
reset.addEventListener("click",()=>{
    let boxes = document.getElementsByClassName("box")
    
    Array.from(boxes).forEach((e)=>{
        let boxtext = e.getElementsByClassName("boxtext")[0]
        boxtext.innerText = ""
    })
    turn = "X"
    isgameover = false
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn
    document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "0px"
})