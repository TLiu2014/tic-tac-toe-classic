import React from 'react';
import './GameBoard.css';

const GameBoard = ({ board, onCellClick, gameStatus, isComputerTurn }) => {
  // Render cell
  const renderCell = (index) => {
    const value = board[index];
    return (
      <button
        key={index}
        className={`game-cell ${value === 'X' ? 'cell-x' : value === 'O' ? 'cell-o' : ''} ${
          gameStatus !== 'playing' ? 'cell-disabled' : 'cell-enabled'
        } ${isComputerTurn ? 'cell-waiting' : ''}`}
        onClick={() => onCellClick(index)}
        disabled={gameStatus !== 'playing' || isComputerTurn}
      >
        {value}
      </button>
    );
  };

  return (
    <div className="game-board">
      {Array(9).fill(null).map((_, index) => renderCell(index))}
    </div>
  );
};

export default GameBoard;
