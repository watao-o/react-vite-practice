import Board from "./board";
import { useState } from "react";
import ToggleComponent from "../../hooks/toggle";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [historyOfIndex, setHistoryOfIndex] = useState([Array(2).fill(null)])
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  // トグル関連
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 昇順:false,降順:true
  const toggleisOpen = () => {
    setIsOpen((prev) => (!prev));
  }

  function handlePlay(nextSquares: any, index: number) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    const nextIndex = [...historyOfIndex.slice(0, currentMove), [Math.floor(index / 3), index % 3]]
    setHistoryOfIndex(nextIndex);
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
  const indexs = historyOfIndex.map((index, move) => {
    const toggleMove = isOpen ? move : historyOfIndex.length - 1 - move;
    return (
      <>
        <li key={toggleMove}>
          {historyOfIndex[toggleMove].join(',')}
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
        <div className="game-info">
          <span>着手履歴</span>
          <ol>{indexs}</ol>
        </div>
      </div>
    </>
  )
}