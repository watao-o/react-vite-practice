import Board from "./board"
import { useState } from "react";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares:any) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove:number) {
    setCurrentMove(nextMove);
  }
  
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      if (move === currentMove) {
        description = `You are at move#${move}`;
      } else {
        description = `Go to move #${move}`;
      }
    } else {
      description = 'Go to game start';
    }
    return (
      <>
        <li key={move}>
          { move === currentMove &&
            <span>{description}</span>
          }
          { move !== currentMove &&
            <button onClick={() => jumpTo(move)}>{description}</button>
          }
        </li>
      </>
    )
  })
  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  )
}