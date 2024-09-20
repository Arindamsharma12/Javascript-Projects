// Game constants
let inputDir = {x:0,y:0}
const foodSound = new Audio('./music/food.mp3')
const gameOver = new Audio('./music/gameover.mp3')
const moveSound = new Audio('./music/move.mp3')
const musicSound = new Audio('./music/music.mp3') 
let speed = 19
let score = 0
let lastPaintTime = 0
let snakeArr = [
    {x:13, y: 15}
]

let food = {
    x:6,y:7
}
// Game Functions

function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime -lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime
    gameEngine()
}

function isCollide(sarr){
    // If you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y){
            return true
        }
    }
    // If you bump into the wall
    if(snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0){
        return true
    }
    return false;
}

function gameEngine(){
    // Part1: Updating the snake array
    if(isCollide(snakeArr)){
        gameOver.play()
        musicSound.pause()
        inputDir =  {x:0,y:0}
        alert("Game Over. Press any key to play again")
        snakeArr = [{x:13,y:15}]
        musicSound.play()
        score = 0;
        scoreBox.innerHTML = `Score: ${score}`
    }

    // If snake have eaten the food, increament the score and regenerate the food
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        foodSound.play()
        score += 1
        scoreBox.innerHTML = `Score: ${score}`
        if(score > highscoreval){
            highscoreval = score
            localStorage.setItem("highscore",JSON.stringify(score))
            highScoreBox.innerHTML = `High Score: ${highscoreval}`
        }
        let a = 2;
        let b = 16;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})
        food = {x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }


    // Moving the snake
    for(let i = snakeArr.length-2; i >=0 ; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x
    snakeArr[0].y += inputDir.y
    // Part2: Display the snake and Food
    
    // Display the snake
    board.innerHTML = ""
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement("div")
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add("head")
        }
        else{
            snakeElement.classList.add("snake")
        }
        board.appendChild(snakeElement)
    })

    // Display the food
    foodElement = document.createElement("div")  
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food")
    board.appendChild(foodElement)
}


// Main logic starts from here
let highscore = localStorage.getItem("highscore")
if(highscore === null){
    highscoreval = 0
    localStorage.setItem("highscore",JSON.stringify(highscoreval))
}
else{
    highscoreval = JSON.parse(highscore)
    highScoreBox.innerHTML = `High Score: ${highscore}`
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir = {x:0,y:1} //Start the game
    moveSound.play()
    switch(e.key){
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            console.log(e.key)
            break
            
        case "ArrowDown":
            console.log(e.key)
            inputDir.x = 0;
            inputDir.y = 1;
            break

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            console.log(e.key)
            break

        case "ArrowRight":
            inputDir.x =1;
            inputDir.y =0;
            console.log(e.key)
            break

        default:
            break;

    }
})

