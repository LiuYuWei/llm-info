import React, { useState, useEffect, useCallback } from 'react';

const Game2048 = () => {
  const [board, setBoard] = useState(initializeBoard());
  const [score, setScore] = useState(0);
  const [win, setWin] = useState(false);

  function initializeBoard() {
    let newBoard = Array(4).fill().map(() => Array(4).fill(0));
    addNewTile(newBoard);
    addNewTile(newBoard);
    return newBoard;
  }

  function addNewTile(board) {
    const available = board.flatMap((row, i) => 
      row.map((cell, j) => cell === 0 ? {i, j} : null).filter(Boolean)
    );
    if (available.length > 0) {
      const {i, j} = available[Math.floor(Math.random() * available.length)];
      board[i][j] = Math.random() < 0.9 ? 2 : 4;
    }
  }

  function moveBoard(board, direction) {
    let newBoard = JSON.parse(JSON.stringify(board));
    let changed = false;
    let newScore = 0;

    const move = (row) => {
      let newRow = row.filter(cell => cell !== 0);
      for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i] === newRow[i + 1]) {
          newRow[i] *= 2;
          newScore += newRow[i];
          newRow.splice(i + 1, 1);
        }
      }
      while (newRow.length < 4) {
        newRow.push(0);
      }
      return newRow;
    };

    if (direction === 'left' || direction === 'right') {
      for (let i = 0; i < 4; i++) {
        const oldRow = newBoard[i];
        const newRow = direction === 'left' ? move(oldRow) : move(oldRow.reverse()).reverse();
        if (JSON.stringify(oldRow) !== JSON.stringify(newRow)) {
          changed = true;
        }
        newBoard[i] = newRow;
      }
    } else {
      for (let j = 0; j < 4; j++) {
        const column = [newBoard[0][j], newBoard[1][j], newBoard[2][j], newBoard[3][j]];
        const newColumn = direction === 'up' ? move(column) : move(column.reverse()).reverse();
        if (JSON.stringify(column) !== JSON.stringify(newColumn)) {
          changed = true;
        }
        for (let i = 0; i < 4; i++) {
          newBoard[i][j] = newColumn[i];
        }
      }
    }

    return { newBoard, changed, newScore };
  }

  const move = useCallback((direction) => {
    if (win) return;

    const { newBoard, changed, newScore } = moveBoard(board, direction);

    if (changed) {
      addNewTile(newBoard);
      setBoard(newBoard);
      setScore(prevScore => prevScore + newScore);
      if (checkWin(newBoard)) {
        setWin(true);
      }
    }
  }, [board, win]);

  const checkWin = (board) => {
    for (let row of board) {
      if (row.includes(2048)) {
        return true;
      }
    }
    return false;
  };

  const handleKeyDown = useCallback((e) => {
    e.preventDefault();
    const keyDirections = {
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right'
    };
    const direction = keyDirections[e.key];
    if (direction) {
      move(direction);
    }
  }, [move]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const resetGame = () => {
    setBoard(initializeBoard());
    setScore(0);
    setWin(false);
  };

  const getTileColor = (value) => {
    const colors = {
      2: 'bg-yellow-100',
      4: 'bg-yellow-200',
      8: 'bg-orange-200',
      16: 'bg-orange-300',
      32: 'bg-red-300',
      64: 'bg-red-400',
      128: 'bg-blue-300',
      256: 'bg-blue-400',
      512: 'bg-green-300',
      1024: 'bg-green-400',
      2048: 'bg-purple-400',
    };
    return colors[value] || 'bg-gray-200';
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 relative">
      <h1 className="text-4xl font-bold mb-4">2048</h1>
      <div className="mb-4">Score: {score}</div>
      <div className="grid grid-cols-4 gap-2 bg-gray-300 p-2 rounded relative">
        {board.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`w-16 h-16 flex items-center justify-center text-2xl font-bold ${getTileColor(cell)} rounded`}
            >
              {cell !== 0 && cell}
            </div>
          ))
        )}
        {win && (
          <div className="absolute inset-0 bg-red-500 bg-opacity-75 flex items-center justify-center">
            <span className="text-4xl font-bold text-white">你贏了！</span>
          </div>
        )}
      </div>
      <button onClick={resetGame} className="mt-4 p-2 bg-green-500 text-white rounded">Reset Game</button>
    </div>
  );
};

export default Game2048;
