class player{
    constructor(diskColor){
        this.diskColor = diskColor
        this.positions = Array(4).fill(0);
    }

    movePiece(nextMove, diskNumber){
        this.positions[diskNumber-1]=this.positions[diskNumber-1]+nextMove;
    }

    display() {
        console.log(this.diskColor + " : " + this.positions);
    }

}
async function updateBlock(LastMove, nextMove, diskColor, diskNumber) {
    return new Promise(resolve => {
        diskColor == 'r' ? LastMove += 0 : diskColor == 'g' ? LastMove += 13 : diskColor == 'y' ? LastMove += 26 : LastMove += 39;
        nextMove += LastMove;

        let completedIterations = 0;

        for (let j = 0; j <= nextMove - LastMove; j++) {
            setTimeout(() => {
                const currentElement = document.getElementById(String((LastMove + j) % 52));
                if (currentElement) {
                    document.getElementById(`${diskColor}${diskNumber}`).remove();
                    const discElement = document.createElement('div');
                    discElement.id = `${diskColor}${diskNumber}`;
                    discElement.className = `disc ${diskColor}`;
                    currentElement.appendChild(discElement);
                    completedIterations++;

                    if (completedIterations === nextMove - LastMove + 1) {
                        resolve({ nextMove: nextMove - LastMove, diskNumber});
                    }
                }
            }, 300 * j);
        }
    });
}   

async function start(a,b,c,d) {
    const result = await updateBlock(a,b,c,d);
    currentPlayer.movePiece(result.nextMove,result.diskNumber)
    console.log(result);
    console.log(currentPlayer)
    if(roll != 6)SwitchTurn();
}

// need to fix
function DiceRoll(){
    if(DiceFree){
        roll = Math.floor(Math.random() * 6) + 1;
        document.getElementById("dice").innerText=roll;
        cdisk = document.getElementsByClassName(currentPlayer.diskColor[0].toLowerCase())
        if(currentPlayer.positions.every(element => element === 0) && roll != 6){ 
            SwitchTurn()
        }else{
            for (let i = 0; i < cdisk.length; i++) {
                if (currentPlayer.positions[i+1]!=0 || roll==6) {
                    cdisk[i].classList.add("active"); 
                    call = "DiscSelect("+cdisk[i].getAttribute('id')[1]+")"
                    cdisk[i].setAttribute("onclick",call)
                }                
            }
            DiceFree = false
        }
    }
}

function SwitchTurn(){
    playerlist.shift()
    playerlist.push(currentPlayer)
    currentPlayer = playerlist[0]
    return currentPlayer
}
function DiscSelect(n){
    DiceFree = true
    cdisk = document.getElementsByClassName(currentPlayer.diskColor[0].toLowerCase())
    for (let i = 0; i < cdisk.length; i++) {
        cdisk[i].classList.remove("active");
        cdisk[i].removeAttribute("onclick");
      }
    start(currentPlayer.positions[n-1], roll, currentPlayer.diskColor[0].toLowerCase(), n);
}

const player1 = new player("r");
const player2 = new player("g");
const player3 = new player("y");
const player4 = new player("b");
let playerlist=[player1,player2,player3,player4];
let currentPlayer = playerlist[0];
let DiceFree = true;
