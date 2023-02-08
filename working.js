const boxes = document.querySelectorAll('.box')
const restart = document.querySelector('.restart')
let available_moves = [0,1,2,3,4,5,6,7,8]

let X_moves=[]
let O_moves=[]

const winning_Code=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

boxes.forEach(box=>{box.addEventListener('click',boxclicked)})
restart.addEventListener('click',restartit)


function boxclicked(e){
    let user_move = Number(e.target.id)
    if(available_moves.includes(user_move) && available_moves.length>0){
        e.target.innerHTML="X"
        X_moves.push(user_move)
        available_moves.splice(available_moves.indexOf(user_move),1)
        if(available_moves.length === 0){
            console.log("Draw Match!")
            return
        }
        if(winnerexists(X_moves)){
            console.log("User Won!")
            setTimeout(restartit,2000)
            return
        }

        let pc_moves=available_moves[Math.floor(Math.random()*available_moves.length)]
        boxes[pc_moves].innerHTML="O"
        O_moves.push(pc_moves)
        available_moves.splice(available_moves.indexOf(pc_moves),1)

        if(winnerexists(O_moves)){
            console.log("PC Won!")
            setTimeout(restartit,2000)
            return
        }
    }

}

function winnerexists(moves){
        let counter=0
        for(let i=0;i<8;i++){
            for(let j =0;j<3;j++){
                if(moves.includes(winning_Code[i][j]))
                counter++;
            }
            if(counter === 3)
            return true
            counter = 0
        }
        return false
}

function restartit(){
    boxes.forEach(box =>{box.innerHTML=""})
    available_moves = [0,1,2,3,4,5,6,7,8]
    X_moves=[]
    O_moves=[]
}

