import React, { useEffect, useState } from "react";
import './style.css'
function Board() {
  const [boardSize, setBoardSize] = useState(3);
  const [board, setBoard] = useState([]);
  const [winner, setWinner] = useState(-1);
  const [rowSum, setRowSum] = useState(new Array(boardSize).fill(0));
  const [colSum, setColSum] = useState(new Array(boardSize).fill(0));
  const [gridSum, setGridSum] = useState(0);
  const [revGridSum, setRevGridSum] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [remainingBoxes, setRemainingBoxes] = useState(boardSize * boardSize);
  const [colors, setColors] = useState({
    player1:"green",
    draw:"gray",
    player2:"blue"
  })
  const [gameData, setGameData] = useState({
    player1:0,
    player2:0,
    draw:0
  })
  const resetBoard = () => {
    let tempBoard = new Array();
    for (let i = 0; i < boardSize; i++) {
      tempBoard.push(new Array(boardSize).fill(0));
    }
    setBoard(tempBoard);
  };

  const move = (player, row, col) => {
    if (getWinner() != -1 || remainingBoxes==0) {
      reinitializeBoard()
      document.getElementById('overlay').style.display='none'
      return;
    } else if (row < 0 || col < 0 || row > boardSize || col > boardSize) {
      console.log("Out of boundary");
      return;
    } else if (board[row][col] != 0) {
      console.log("Square is alreay occupied");
      return;
    } else if (player != 0 && player != 1) {
      console.log("invalid player");
      return;
    } else {
      let currentMove = player == 0 ? 1 : -1;
      setBoard((prev) => {
        prev[row][col] = currentMove;
        return prev;
      });
      let tempRemainingBoxes = remainingBoxes - 1;
      setRemainingBoxes(tempRemainingBoxes);
      let tempRowSum = rowSum;
      tempRowSum[row] = tempRowSum[row] + currentMove;
      let tempColSum = colSum;
      tempColSum[col] = tempColSum[col] + currentMove;
      let tempGridSum = gridSum;
      let tempRevGridSum = revGridSum;
      setRowSum(tempRowSum);
      setColSum(tempColSum);
      if (row == col) {
        tempGridSum += currentMove;
        setGridSum(tempGridSum);
      }
      if (row + col == boardSize - 1) {
        tempRevGridSum += currentMove;
        setRevGridSum(tempRevGridSum);
      }

      if (
        Math.abs(tempRowSum[row]) == boardSize ||
        Math.abs(tempColSum[col]) == boardSize ||
        Math.abs(tempGridSum) == boardSize ||
        Math.abs(tempRevGridSum) == boardSize
      ) {
        //Player won
        setWinner(player);
        setCurrentPlayer((prev) => !prev);
        let data = gameData;
        data['player'+(Number(player)+1)] += 1;
        setGameData(data)
        sessionStorage.setItem('gameData', JSON.stringify(data))
        document.getElementById('overlay').style.display='block'
        return player;
      }
      setCurrentPlayer((prev) => !prev);
      if (tempRemainingBoxes == 0) {
        //DRAW
        let data = gameData
        data['draw'] += 1;
        setGameData(data)
        sessionStorage.setItem('gameData', JSON.stringify(data))
        document.getElementById('overlay').style.display='block'
        return;
      }
      return -1;
    }
  };

  const getWinner = () => {
    return winner;
  };

  const reinitializeBoard = () => {
    setBoardSize(3);
    setBoard([]);
    setWinner(-1);
    setRowSum(new Array(boardSize).fill(0));
    setColSum(new Array(boardSize).fill(0));
    setGridSum(0);
    setRevGridSum(0);
    setCurrentPlayer(0);
    setRemainingBoxes(boardSize * boardSize);
    resetBoard();
  };

  const loadLastSession = () => {
    let data = sessionStorage.getItem('gameData')
    if(data){
      setGameData(JSON.parse(data))
    } else {
      setGameData({
        player1:0,
        player2:0,
        draw:0
      })
    }
  }
  useEffect(() => {
    resetBoard();
  }, []);

  useEffect(()=>{
    loadLastSession()
  },[])
  return (
    <div className="centerContent container" style={{background:"linear-gradient(to top, rgb(255 236 236), rgb(0 159 255 / 90%))"}}>
      <div onClick={()=>{
            sessionStorage.removeItem("gameData")
            reinitializeBoard();
            loadLastSession()
          }
        } style={{position:"absolute", top:"5%", right:"0%", transform:"translate(-50%,-50%)"}}>
        <img style={{height:"2.2rem"}} src="/assets/reset.png" alt="reset"/>
      </div>
      <div>
        {[0,1,2].map((p)=>
                  <div
                  style={{
                    height: "100px",
                    width: "300px",
                    border: "1px solid #000",
                    borderTop: p==0 && "1px solid #000",
                    display: "flex",
                  }}
                >
                  {[{row:p,col:0}, {row:p,col:1}, {row:p,col:2}].map(t=>
                    <div
                    onClick={() => move(currentPlayer, t.row, t.col)}
                    style={{position:"relative" ,height: "100%", width: "100%", border: "1px solid #000" }}
                  >
                    <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)", color:board?.[t.row]?.[t.col] == 1 ? colors['player1']:colors['player2'], fontWeight:700}}>
                      {board?.[t.row]?.[t.col] == 1 ? "X" : board?.[t.row]?.[t.col] == -1 ? "O" : ""}
                    </div>
                  </div>
                  )}
                </div>
          )}
      </div>
      <div style={{display:"flex", justifyContent:"space-evenly", width:"100%", margin:"1rem"}}>
        <div style={{color:colors['player1'], fontWeight:700}}>Player 1 : {gameData['player1']}</div>
        <div style={{color:colors['draw'], fontWeight:700}}>Draw : {gameData['draw']}</div>
        <div style={{color:colors['player2'], fontWeight:700}}>Player 2 : {gameData['player2']}</div>
      </div>
      <div id="overlay" onClick={()=>{
        reinitializeBoard()
        document.getElementById('overlay').style.display='none'
      }
      } style={{display:'none'}} class="overlay">
        <div className="centerContent" style={{background:"unset"}}>
          {getWinner() == -1 ? <div style={{color:"#fff", fontSize:"3rem", fontWeight:700}}>Draw</div>:<div style={{color:"#fff", fontSize:"3rem", fontWeight:700}}>Player {getWinner()+1} Won!</div>}
          <div style={{color:"#fff", marginTop:"1rem", fontWeight:500, color:'#eee'}}>touch to continue</div>
        </div>
      </div>
    </div>
  );
}

export default Board;
