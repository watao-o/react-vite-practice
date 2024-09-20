import React from "react"

interface SquareProps {
  value: string,
  onSquareClick: () => void;
  isHighlighted?: boolean;
};

const Square: React.FC<SquareProps> = ({ value, onSquareClick, isHighlighted = false }) => {
  return (
    <>
      <button
        className={`square ${isHighlighted ? "highlight" : ""}`}
        onClick={onSquareClick}
      >
        {value}
      </button>
    </>
  );
};

export default Square;