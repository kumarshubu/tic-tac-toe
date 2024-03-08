import React, { useEffect, useState } from "react";

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
  const resetBoard = () => {
    let tempBoard = new Array();
    for (let i = 0; i < boardSize; i++) {
      tempBoard.push(new Array(boardSize).fill(0));
    }
    setBoard(tempBoard);
  };

  const move = (player, row, col) => {
    if (row < 0 || col < 0 || row > boardSize || col > boardSize) {
      console.log("Out of boundary");
      return;
    } else if (board[row][col] != 0) {
      console.log("Square is alreay occupied");
      return;
    } else if (player != 0 && player != 1) {
      console.log("invalid player");
      return;
    } else if (getWinner() != -1) {
      return getWinner();
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
        setWinner(player);
        setCurrentPlayer((prev) => !prev);
        alert(`Player ${currentMove == 1 ? "X" : "O"} won`);
        return player;
      }
      setCurrentPlayer((prev) => !prev);
      console.log(tempRemainingBoxes);
      if (tempRemainingBoxes == 0) {
        console.log("Draw");
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

  useEffect(() => {
    resetBoard();
  }, []);

  useEffect(() => {
    console.log(board);
  }, [board]);

  useEffect(() => {
    let token = sessionStorage.getItem('token')
    if(!token){
      window.location.href = "/"
    }
  }, []);
  return (
    <>
      <div
        style={{
          height: "100px",
          width: "300px",
          border: "1px solid #000",
          display: "flex",
        }}
      >
        <div
          onClick={() => move(currentPlayer, 0, 0)}
          style={{ height: "100%", width: "100%", border: "1px solid #000" }}
        >
          {board?.[0]?.[0] == 1 ? "X" : board?.[0]?.[0] == -1 ? "O" : ""}
        </div>
        <div
          onClick={() => move(currentPlayer, 0, 1)}
          style={{ height: "100%", width: "100%", border: "1px solid #000" }}
        >
          {board?.[0]?.[1] == 1 ? "X" : board?.[0]?.[1] == -1 ? "O" : ""}
        </div>
        <div
          onClick={() => move(currentPlayer, 0, 2)}
          style={{ height: "100%", width: "100%", border: "1px solid #000" }}
        >
          {board?.[0]?.[2] == 1 ? "X" : board?.[0]?.[2] == -1 ? "O" : ""}
        </div>
      </div>
      <div
        style={{
          height: "100px",
          width: "300px",
          border: "1px solid #000",
          display: "flex",
        }}
      >
        <div
          onClick={() => move(currentPlayer, 1, 0)}
          style={{ height: "100%", width: "100%", border: "1px solid #000" }}
        >
          {board?.[1]?.[0] == 1 ? "X" : board?.[1]?.[0] == -1 ? "O" : ""}
        </div>
        <div
          onClick={() => move(currentPlayer, 1, 1)}
          style={{ height: "100%", width: "100%", border: "1px solid #000" }}
        >
          {board?.[1]?.[1] == 1 ? "X" : board?.[1]?.[1] == -1 ? "O" : ""}
        </div>
        <div
          onClick={() => move(currentPlayer, 1, 2)}
          style={{ height: "100%", width: "100%", border: "1px solid #000" }}
        >
          {board?.[1]?.[2] == 1 ? "X" : board?.[1]?.[2] == -1 ? "O" : ""}
        </div>
      </div>
      <div
        style={{
          height: "100px",
          width: "300px",
          border: "1px solid #000",
          display: "flex",
        }}
      >
        <div
          onClick={() => move(currentPlayer, 2, 0)}
          style={{ height: "100%", width: "100%", border: "1px solid #000" }}
        >
          {board?.[2]?.[0] == 1 ? "X" : board?.[2]?.[0] == -1 ? "O" : ""}
        </div>
        <div
          onClick={() => move(currentPlayer, 2, 1)}
          style={{ height: "100%", width: "100%", border: "1px solid #000" }}
        >
          {board?.[2]?.[1] == 1 ? "X" : board?.[2]?.[1] == -1 ? "O" : ""}
        </div>
        <div
          onClick={() => move(currentPlayer, 2, 2)}
          style={{ height: "100%", width: "100%", border: "1px solid #000" }}
        >
          {board?.[2]?.[2] == 1 ? "X" : board?.[2]?.[2] == -1 ? "O" : ""}
        </div>
      </div>
    </>
  );
}

export default Board;
