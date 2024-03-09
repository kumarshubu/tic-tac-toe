import React, {useEffect, useState} from 'react'

function Board() {

  const [boardSize, setBoardSize] = useState(3);
  const [board, setBoard] = useState([]);
  const [winner, setWinner] = useState(-1);
  useEffect(()=>{
    let tempBoard = new Array()
    for(let i=0;i<boardSize;i++){
      tempBoard.push(new Array(boardSize).fill(0))
    }
    setBoard(tempBoard)
  },[])

  const move = (player, row, col) => {
    if(row<0 || col<0 || row>boardSize || col>boardSize){
      console.log("Out of boundary")
      return
    } else if(board[row][col]!=0){
      console.log("Square is alreay occupied")
      return
    } else if(player !=0 || player!=1){
      console.log("invalid player")
      return
    } else {
      let currentMove = player == 0 ? 1 : -1;
      board[row][col] = currentMove;
      let rowWin = true;
      let colWin = true;
      let diagWin = true;
      let revDiagWin = true;
      for (let i=0;i<boardSize;i++){
        if(board[row][i]!=currentMove){
          rowWin =false;
        }
        if(board[i][col]!=currentMove){
          colWin=false;
        }
        if(row==col && board[i][i]!=currentMove){
          diagWin = false;
        }
        if(row+col==boardSize-1 && board[row][col]!=currentMove){
          revDiagWin = false;
        }
      }
      if(rowWin || colWin || diagWin || revDiagWin){
        setWinner(player)
        return player;
      }
      return -1;
    }

  }
  return (
    <div>index</div>
  )
}

export default Board