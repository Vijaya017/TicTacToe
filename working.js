const boxes = document.querySelectorAll('.box')
const modemsg =  document.querySelector('#mode')
//const restart = document.querySelector('.restart')
const gameover = document.querySelector('#gameover')
const close = document.querySelector(".close")
const next = document.querySelector("#round")
const count = document.querySelector(".count")
const newG = document.querySelector('#newG')
const ai_score = document.querySelector('.ai')
const user_score = document.querySelector('.user')
const container = document.querySelector('.container')
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
const modes = [document.querySelector('#easy'),
               document.querySelector('#medium'),
               document.querySelector('#hard')]

let available_moves = [0,1,2,3,4,5,6,7,8]
let X_moves=[]
let O_moves=[]
let winning_boxes = []
let currentmode = 0
let round = 1
let timer
let cpupoint
let playerpoint

close.addEventListener('click', startGame)
next.addEventListener('click', startRound)
newG.addEventListener('click', newgame)
modes[0].style.backgroundColor = 'black'

function startGame(){
    modes.forEach(mode => {mode.addEventListener('click', modeselect)})
    document.querySelector('#intro').style.display = 'none'
    count.style.display="flex"
    cpupoint=0
    playerpoint=0
    startRound()
}

function startRound(){
    restartit()
    boxes.forEach(box=>{box.addEventListener('click', boxclicked)})
//    restart.addEventListener('click', restartit)
    count.innerHTML='Round '+round
}

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

        let pc_moves = pcmoveselector()
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
    ai_score.innerHTML = '<br>O - '+ String(cpupoint)
    user_score.innerHTML = '<br>X - '+ String(playerpoint)
    timer = setTimeout(function(){

        gameover.style.display = 'grid'
        gameover.firstElementChild.textContent = text
    }, 2500)
    if(round > 3){
        newG.innerHTML='Play Again'
        next.style.display = 'none'
        if(cpupoint > playerpoint){
            console.log("I won the game!")
        } else if(playerpoint > cpupoint){
            console.log("You won the game!")
            confetti.start()
        } else {
            console.log("It's a tie")
        }
    }
}

function restartit(){
    boxes.forEach(box =>{
        box.innerHTML = ""
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
    ai_score.innerHTML = '<br>O - '
    user_score.innerHTML = '<br>X - '
    confetti.stop()
    startGame()
    
}

function modeselect(mode){
    newgame()
    mode = mode.target
    modemsg.style.display='flex'
    modemsg.innerText="Mode Changed to "+mode.innerText
    setTimeout(function(){modemsg.style.display='none'},1300)
    // reverting the previous mode button to old state
    modes[currentmode].style.backgroundColor = null
    if (mode.innerText === "Easy"){
        currentmode = 0
        container.style.backgroundImage = 'linear-gradient(rgb(2, 129, 180),grey)'
    } else if (mode.innerText === "Medium"){
        currentmode = 1
        container.style.backgroundImage = 'linear-gradient(rgb(110, 18, 196),gray)'
    } else if (mode.innerText === "Hard"){
        currentmode = 2
        container.style.backgroundImage = 'linear-gradient( rgb(196, 18, 18),gray)'
    }   
    // highlighting button of the now current mode
    modes[currentmode].style.backgroundColor = 'black'
}

function pcmoveselector(){
    if(currentmode === 0){
        return easymove()
    }
    if(currentmode === 1){
        return mediummove()
    }
    if(currentmode === 2){
        return hardmove()
    }
}

function easymove(){
    return available_moves[Math.floor(Math.random() * available_moves.length)]
}

function mediummove(){
    let bestScore = -Infinity
    let bestMove
    let n = available_moves.length
    for(let i = 0; i < n; i++){
       let move = available_moves[i]
       O_moves.push(move)
       available_moves.splice(available_moves.indexOf(move), 1)
       let score = minimax(0, false, true)
       O_moves.splice(O_moves.indexOf(move), 1)
       available_moves.splice(i, 0, move)
       if(score > bestScore){
           bestScore = score
           bestMove = move
       }
    }
    return bestMove
}

function hardmove(){
    let bestScore = -Infinity
    let bestMove
    let n = available_moves.length
    for(let i = 0; i < n; i++){
       let move = available_moves[i]
       O_moves.push(move)
       available_moves.splice(available_moves.indexOf(move), 1)
       let score = minimax(0, false, false)
       O_moves.splice(O_moves.indexOf(move), 1)
       available_moves.splice(i, 0, move)
       if(score > bestScore){
           bestScore = score
           bestMove = move
       }
    }
    return bestMove
}

function minimax(depth, isMaximizing, isMedium){
    if(isMedium && depth > 2){
        return 0
    }

    if(winnerexists(O_moves)){
        return 1
    } else if(winnerexists(X_moves)){
        return -1
    } else if(available_moves.length === 0){
        return 0
    }

    if(isMaximizing){
        let bestScore = -Infinity
        let n = available_moves.length
        for(let i = 0; i < n; i++){
            let move = available_moves[i]
            O_moves.push(move)
            available_moves.splice(available_moves.indexOf(move), 1)
            let score = minimax(depth + 1, false, isMedium)
            available_moves.splice(i, 0, move)
            O_moves.splice(O_moves.indexOf(move), 1)
            if(score > bestScore){
                bestScore = score
            }
        }
        return bestScore
    } else {
        let bestScore = Infinity
        let n = available_moves.length
        for(let i = 0; i < n; i++){
            let move = available_moves[i]
            X_moves.push(move)
            available_moves.splice(available_moves.indexOf(move), 1)
            let score = minimax(depth + 1, true, isMedium)
            available_moves.splice(i, 0, move)
            X_moves.splice(X_moves.indexOf(move), 1)
            if(score < bestScore){
                bestScore = score
            }
        }
        return bestScore
    }
}
