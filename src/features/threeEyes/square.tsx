import React from "react"

interface SquareProps {
  value: string,
  onSquareClick: any
};
const Square: React.FC<SquareProps> = ({value, onSquareClick}) => {
  return (
    <> 
      <button
        className="square"
        onClick={onSquareClick}
      >
        {value}
      </button>
    </>
  );
};

export default Square;