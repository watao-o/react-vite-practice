import Square from "./square";

interface BoardProps {
  xIsNext: boolean,
  squares: Array<any>,
  onPlay: any
}

const Board: React.FC<BoardProps> = ({xIsNext, squares, onPlay}) => {
  const winner = calculateWinner(squares);

  let status;
  if(winner) {
    status = `Winner: ${winner}`
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`
  }
  function handleClick(i:number) {
    if(squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares)
  }

  const rows = [];
  for (let i = 0; i < 3; i++) {
    let squareList = [];
    for (let j = 0;j < 3; j++) {
      const index = i * 3 + j;
      squareList.push(<Square value={squares[index]} onSquareClick={() => handleClick(index)}/>);
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
  for(let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
export default Board;