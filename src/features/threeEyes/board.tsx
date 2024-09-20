import Square from "./square";
import { useState, useEffect } from "react";

interface BoardProps {
  xIsNext: boolean,
  squares: Array<any>,
  onPlay: any
}

const Board: React.FC<BoardProps> = ({ xIsNext, squares, onPlay }) => {
  const { winner, winningLine } = calculateWinner(squares);

  const [winSquareIndexs, setWinSquareIndexes] = useState(Array(3).fill(null));

  let status;
  // useEffectで勝者が決まったときにインデックスを更新
  useEffect(() => {
    if (winner) {
      setWinSquareIndexes(winningLine);
    } else {
      setWinSquareIndexes([]); // 勝者がいない場合はリセット
    }
  }, [winner, winningLine]);
  function handleClick(i: number) {
    if (squares[i] || winner) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares)
  }

  const rows = [];
  for (let i = 0; i < 3; i++) {
    let squareList = [];
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      squareList.push(
        <Square
          value={squares[index]}
          onSquareClick={() => handleClick(index)}
          isHighlighted={winSquareIndexs.includes(index)}
        />
      );
    }
    rows.push(<div className="board-row">{squareList}</div>);
  }
  return (
    <>
      <div className="status">{status}</div>
      {rows}
    </>
  );
}

function calculateWinner(squares: any) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningLine: lines[i] }
    }
  }
  return { winner: null, winningLine: [] };
}
export default Board;