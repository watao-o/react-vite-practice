import Board from "./board";
import { useState } from "react";
import ToggleComponent from "../../hooks/toggle";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  // トグル関連
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 昇順:false,降順:true
  const toggleisOpen = () => {
    setIsOpen((prev) => (!prev));
    console.log(`isOpen : ${isOpen}`)
  }

  function handlePlay(nextSquares: any) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    const toggleMove = isOpen ? move : history.length - 1 - move;
    let description;
    if (toggleMove > 0) {
      if (toggleMove === currentMove) {
        description = `You are at move#${toggleMove}`;
      } else {
        description = `Go to move #${toggleMove}`;
      }
    } else {
      description = 'Go to game start';
    }
    return (
      <>
        <li key={toggleMove}>
          {toggleMove === currentMove &&
            <span>{description}</span>
          }
          {toggleMove !== currentMove &&
            <button onClick={() => jumpTo(toggleMove)}>{description}</button>
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
          <ToggleComponent
            onText="昇順"
            offText="降順"
            btnName="ソート順入れ替え"
            isOpen={isOpen}
            toggleIsOpen={toggleisOpen}
          />
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  )
}