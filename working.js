let Gamename = document.getElementById('Gamename')
let restart = document.getElementById('restart')
let boxes = Array.from(documents.getElementByClassname('box'))

const O_Text ="O"
const X_Text ="X"

let currentplayer = X_Text
let spaces = Array(9).fill(null)

const begingame = () =>{
    boxes.forEach(box => box.addEventListener('click',boxClicked))
}

function boxClicked(a){
    const id = a.target.id

    if(!spaces[id]){
        spaces[id] = currentplayer
        a.target.innerText = currentplayer
        if(Gam)
        currentplayer = currentplayer == X_Text ? O_Text : X_Text
    }
}

begingame()