import React, { useState, useEffect, useCallback } from 'react';
import { User, Users, RotateCcw, Trophy, Cpu, Brain } from 'lucide-react';
import GameBoard from './GameBoard';
import './TicTacToe.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameMode, setGameMode] = useState('single'); // 'single' or 'two-player'
  const [aiDifficulty, setAiDifficulty] = useState('impossible'); // 'random' or 'impossible'
  const [humanFirst, setHumanFirst] = useState(true); // Only for single player mode
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'winner', 'draw'
  const [winner, setWinner] = useState(null);
  const [isComputerTurn, setIsComputerTurn] = useState(false);

  // Check for winner
  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  // Check if board is full (draw)
  const isBoardFull = (squares) => {
    return squares.every(square => square !== null);
  };

  // Minimax Algorithm Implementation
  const minimax = (squares, depth, isMaximizing, alpha = -Infinity, beta = Infinity) => {
    const winner = checkWinner(squares);
    const humanPlayer = humanFirst ? 'X' : 'O';
    const computerPlayer = humanFirst ? 'O' : 'X';

    // Terminal cases
    if (winner === computerPlayer) return 10 - depth; // AI wins (prefer faster wins)
    if (winner === humanPlayer) return depth - 10; // Human wins (delay losses)
    if (isBoardFull(squares)) return 0; // Draw

    const availableMoves = squares
      .map((square, index) => square === null ? index : null)
      .filter(val => val !== null);

    if (isMaximizing) {
      // AI's turn - maximize score
      let maxScore = -Infinity;
      for (let move of availableMoves) {
        const newSquares = [...squares];
        newSquares[move] = computerPlayer;
        const score = minimax(newSquares, depth + 1, false, alpha, beta);
        maxScore = Math.max(maxScore, score);
        
        // Alpha-beta pruning optimization
        alpha = Math.max(alpha, score);
        if (beta <= alpha) break;
      }
      return maxScore;
    } else {
      // Human's turn - minimize score (from AI perspective)
      let minScore = Infinity;
      for (let move of availableMoves) {
        const newSquares = [...squares];
        newSquares[move] = humanPlayer;
        const score = minimax(newSquares, depth + 1, true, alpha, beta);
        minScore = Math.min(minScore, score);
        
        // Alpha-beta pruning optimization
        beta = Math.min(beta, score);
        if (beta <= alpha) break;
      }
      return minScore;
    }
  };

  // Find best computer move using Minimax
  const getBestMove = useCallback((squares) => {
    const computerPlayer = humanFirst ? 'O' : 'X';
    const availableMoves = squares
      .map((square, index) => square === null ? index : null)
      .filter(val => val !== null);

    let bestScore = -Infinity;
    let bestMove = availableMoves[0]; // Fallback

    for (let move of availableMoves) {
      const newSquares = [...squares];
      newSquares[move] = computerPlayer;
      const score = minimax(newSquares, 0, false);
      
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    return bestMove;
  }, [humanFirst]);

  // Computer move (Minimax AI or Random)
  const makeComputerMove = useCallback((squares) => {
    if (aiDifficulty === 'impossible') {
      // Use Minimax to find optimal move
      return getBestMove(squares);
    } else {
      // Random move (original implementation)
      const availableMoves = squares
        .map((square, index) => square === null ? index : null)
        .filter(val => val !== null);

      if (availableMoves.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableMoves.length);
        return availableMoves[randomIndex];
      }
      return null;
    }
  }, [aiDifficulty, getBestMove]);

  // Handle cell click
  const handleCellClick = (index) => {
    if (board[index] || gameStatus !== 'playing' || isComputerTurn) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    
    const gameWinner = checkWinner(newBoard);
    
    if (gameWinner) {
      setBoard(newBoard);
      setWinner(gameWinner);
      setGameStatus('winner');
      return;
    }

    if (isBoardFull(newBoard)) {
      setBoard(newBoard);
      setGameStatus('draw');
      return;
    }

    setBoard(newBoard);
    setIsXNext(!isXNext);

    // If single player mode and it's computer's turn next
    if (gameMode === 'single') {
      const humanPlayer = humanFirst ? 'X' : 'O';
      const nextPlayer = !isXNext ? 'X' : 'O';
      
      if (nextPlayer !== humanPlayer) {
        setIsComputerTurn(true);
      }
    }
  };

  // Computer move effect
  useEffect(() => {
    if (gameMode === 'single' && isComputerTurn && gameStatus === 'playing') {
      const timer = setTimeout(() => {
        const computerMove = makeComputerMove(board);
        
        if (computerMove !== null) {
          const newBoard = [...board];
          newBoard[computerMove] = isXNext ? 'X' : 'O';
          
          const gameWinner = checkWinner(newBoard);
          
          if (gameWinner) {
            setBoard(newBoard);
            setWinner(gameWinner);
            setGameStatus('winner');
          } else if (isBoardFull(newBoard)) {
            setBoard(newBoard);
            setGameStatus('draw');
          } else {
            setBoard(newBoard);
            setIsXNext(!isXNext);
          }
        }
        
        setIsComputerTurn(false);
      }, 500); // Small delay to make computer move visible

      return () => clearTimeout(timer);
    }
  }, [isComputerTurn, board, isXNext, gameMode, gameStatus, makeComputerMove]);

  // Initialize computer first move if needed
  useEffect(() => {
    if (gameMode === 'single' && !humanFirst && board.every(cell => cell === null)) {
      setIsComputerTurn(true);
    }
  }, [gameMode, humanFirst, board]);

  // Reset game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameStatus('playing');
    setWinner(null);
    setIsComputerTurn(false);
  };

  // Switch game mode
  const switchGameMode = (mode) => {
    setGameMode(mode);
    resetGame();
  };

  // Switch who goes first (single player only)
  const switchFirstPlayer = () => {
    setHumanFirst(!humanFirst);
    resetGame();
  };

  // Get current player info
  const getCurrentPlayerInfo = () => {
    if (gameStatus !== 'playing') return '';
    
    if (gameMode === 'single') {
      const humanPlayer = humanFirst ? 'X' : 'O';
      const computerPlayer = humanFirst ? 'O' : 'X';
      
      if (isComputerTurn) {
        return `Computer's turn (${computerPlayer})`;
      } else {
        return `Your turn (${humanPlayer})`;
      }
    } else {
      return `Player ${isXNext ? 'X' : 'O'}'s turn`;
    }
  };

  return (
    <div className="tic-tac-toe-container">
      <div className="game-card">
        {/* Header */}
        <div className="game-header">
          <h1 className="game-title">
            <Trophy className="trophy-icon" />
            Tic-Tac-Toe
          </h1>
          <p className="game-subtitle">Classic 3x3 Grid Game</p>
        </div>

        {/* Game Mode Selection */}
        <div className="game-mode-selector">
          <button
            onClick={() => switchGameMode('single')}
            className={`mode-button ${gameMode === 'single' ? 'mode-button-active' : 'mode-button-inactive'}`}
          >
            <Cpu size={18} />
            vs Computer
          </button>
          <button
            onClick={() => switchGameMode('two-player')}
            className={`mode-button ${gameMode === 'two-player' ? 'mode-button-active' : 'mode-button-inactive'}`}
          >
            <Users size={18} />
            Two Players
          </button>
        </div>

        {/* Single Player Settings */}
        {gameMode === 'single' && (
          <div className="single-player-settings">
            {/* AI Difficulty */}
            <div className="setting-row">
              <span className="setting-label">AI Difficulty</span>
              <div className="setting-buttons">
                <button
                  onClick={() => setAiDifficulty('random')}
                  className={`difficulty-button ${aiDifficulty === 'random' ? 'difficulty-button-easy' : 'difficulty-button-inactive'}`}
                >
                  <User size={14} />
                  Easy
                </button>
                <button
                  onClick={() => setAiDifficulty('impossible')}
                  className={`difficulty-button ${aiDifficulty === 'impossible' ? 'difficulty-button-impossible' : 'difficulty-button-inactive'}`}
                >
                  <Brain size={14} />
                  Impossible
                </button>
              </div>
            </div>
            
            {/* First Player */}
            <div className="setting-row">
              <span className="setting-label">Who goes first?</span>
              <div className="setting-buttons">
                <button
                  onClick={() => humanFirst || switchFirstPlayer()}
                  className={`first-player-button ${humanFirst ? 'first-player-button-active' : 'first-player-button-inactive'}`}
                >
                  You (X)
                </button>
                <button
                  onClick={() => !humanFirst || switchFirstPlayer()}
                  className={`first-player-button ${!humanFirst ? 'first-player-button-active' : 'first-player-button-inactive'}`}
                >
                  Computer (X)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Game Status */}
        <div className="game-status">
          {gameStatus === 'playing' && (
            <p className="status-playing">
              {getCurrentPlayerInfo()}
            </p>
          )}
          {gameStatus === 'winner' && (
            <div className="status-winner">
              <Trophy size={24} />
              {gameMode === 'single' 
                ? (winner === (humanFirst ? 'X' : 'O') ? 'You Win!' : 'Computer Wins!')
                : `Player ${winner} Wins!`
              }
            </div>
          )}
          {gameStatus === 'draw' && (
            <p className="status-draw">It's a Draw!</p>
          )}
        </div>

        {/* Game Board */}
        <GameBoard 
          board={board}
          onCellClick={handleCellClick}
          gameStatus={gameStatus}
          isComputerTurn={isComputerTurn}
        />

        {/* Reset Button */}
        <div className="reset-button-container">
          <button
            onClick={resetGame}
            className="reset-button"
          >
            <RotateCcw size={18} />
            New Game
          </button>
        </div>

        {/* Game Info */}
        <div className="game-info">
          <p className="info-row">
            Mode: <span className="info-value">
              {gameMode === 'single' ? 'Single Player' : 'Two Players'}
            </span>
          </p>
          {gameMode === 'single' && (
            <p className="info-row">
              You: <span className="info-value player-x">
                {humanFirst ? 'X' : 'O'}
              </span> | Computer: <span className="info-value player-o">
                {humanFirst ? 'O' : 'X'}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
