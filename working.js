const boxes = document.querySelectorAll('.box')
const restart = document.querySelector('.restart')
const gameover = document.querySelector('#gameover')
const easy = document.querySelector('#easy')
const hard = document.querySelector('#hard')
const close =document.querySelector(".close")
const next = document.querySelector("#round")
const count=document.querySelector(".count")
const newG = document.querySelector('#newG')


let available_moves = [0,1,2,3,4,5,6,7,8]
let X_moves=[]
let O_moves=[]
let winning_boxes = []
let difficulty = 0
let round = 1
let timer
let cpupoint=0
let playerpoint=0

const winning_Code = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

easy.addEventListener('click', modeselect)
hard.addEventListener('click', modeselect)
close.addEventListener('click', startGame)
next.addEventListener('click', startRound)
newG.addEventListener('click', newgame)

function startGame(){
    document.querySelector('#intro').style.display = 'none'
    count.style.display="flex"
    cpupoint=0
    playerpoint=0
    startRound()
}

function startRound(){
    restartit()
    boxes.forEach(box=>{box.addEventListener('click', boxclicked)})
    restart.addEventListener('click', restartit)
    count.innerHTML='Round '+round 
}
//console.log(boxes)

function boxclicked(e){
    let user_move = Number(e.target.id)
    if(available_moves.includes(user_move) && available_moves.length > 0){
        e.target.innerHTML="X"
        X_moves.push(user_move)
        available_moves.splice(available_moves.indexOf(user_move), 1)

        if(winnerexists(X_moves)){
            playerpoint++
            endAnimation("You won!")
            return
        }

        if(available_moves.length === 0){
            endAnimation("It's a draw!")
            return
        }

        let pc_moves=available_moves[Math.floor(Math.random()*available_moves.length)]
        boxes[pc_moves].innerHTML="O"
        O_moves.push(pc_moves)
        available_moves.splice(available_moves.indexOf(pc_moves),1)

        if(winnerexists(O_moves)){
            cpupoint++
            endAnimation("I won!")
            return
        }
    }

}

function winnerexists(moves){
        let counter=0
        for(let i=0;i<8;i++){
            for(let j =0;j<3;j++){
                if(moves.includes(winning_Code[i][j])){
                    winning_boxes.push(winning_Code[i][j])
                    counter++;
                }
            }
            if(counter === 3)
                return true
            counter = 0
            winning_boxes = []
        }
        return false
}

function endAnimation(text){
    boxes.forEach(box => {box.removeEventListener('click', boxclicked)})
    round++

    for(let i = 0; i < 9; i++){
        let box = boxes[i]
        if(winning_boxes.includes(i)){
            box.classList.add('popOut')
        }
    }

    timer = setTimeout(function(){
        gameover.style.display = 'grid'
        gameover.firstElementChild.textContent = text
    }, 3000)
    if(round > 5){
        //adding...part...
        
        newG.innerHTML='Play Again'
        next.style.display = 'none'
    }
//    setTimeout(restartit, 5000)
}

function restartit(){
    boxes.forEach(box =>{
        box.innerHTML = ""
        box.classList.remove('fadeOut')
        box.classList.remove('popOut')
        box.addEventListener('click', boxclicked)
    })
    clearTimeout(timer)
    gameover.style.display = 'none'
    available_moves = [0,1,2,3,4,5,6,7,8]
    X_moves = []
    O_moves = []
    winning_boxes = []
    newG.innerHTML='New Game'
}
function newgame(){
    restartit()
    next.style.display = 'flex'
    round = 1
    startGame()
}

function modeselect(){

}
