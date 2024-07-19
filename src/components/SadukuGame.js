import React, { useState, useEffect } from 'react';

const isValid = (board, row, col, num) => {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num || board[x][col] === num) return false;
  }
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[boxRow + i][boxCol + j] === num) return false;
    }
  }
  return true;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateSudoku = (difficulty) => {
  const board = Array(9).fill().map(() => Array(9).fill(0));
  
  const fillBoard = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
          for (let num of numbers) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (fillBoard(board)) return true;
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  fillBoard(board);

  const solution = board.map(row => [...row]);

  const removeNumbers = (board, difficulty) => {
    const cellsToRemove = {
      'easy': 30,
      'medium': 40,
      'hard': 50
    }[difficulty];

    const positions = shuffleArray(Array(81).fill().map((_, i) => i));
    for (let i = 0; i < cellsToRemove; i++) {
      const pos = positions[i];
      const row = Math.floor(pos / 9);
      const col = pos % 9;
      board[row][col] = 0;
    }
  };

  removeNumbers(board, difficulty);
  return { board, solution };
};

const SudokuGame = () => {
  const [gameState, setGameState] = useState(() => {
    const { board, solution } = generateSudoku('medium');
    return { board, initialBoard: board.map(row => [...row]), solution };
  });
  const [completed, setCompleted] = useState(false);
  const [errors, setErrors] = useState([]);
  const [difficulty, setDifficulty] = useState('medium');
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [hints, setHints] = useState(3);

  useEffect(() => {
    checkBoard();
  }, [gameState.board]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleCellChange = (row, col, value) => {
    if (gameState.initialBoard[row][col] === 0) {
      const newBoard = gameState.board.map(r => [...r]);
      newBoard[row][col] = value === '' ? 0 : parseInt(value, 10);
      setGameState(prev => ({ ...prev, board: newBoard }));
    }
  };

  const checkBoard = () => {
    const newErrors = [];
    let isComplete = true;

    for (let i = 0; i < 9; i++) {
      if (!isValidSet(gameState.board[i])) {
        newErrors.push(`第 ${i + 1} 行有重複數字`);
        isComplete = false;
      }
      const column = gameState.board.map(row => row[i]);
      if (!isValidSet(column)) {
        newErrors.push(`第 ${i + 1} 列有重複數字`);
        isComplete = false;
      }
    }

    for (let i = 0; i < 9; i += 3) {
      for (let j = 0; j < 9; j += 3) {
        if (!isValidSet(getBox(gameState.board, i, j))) {
          newErrors.push(`位於 (${i + 1},${j + 1}) 的 3x3 宮格有重複數字`);
          isComplete = false;
        }
      }
    }

    if (gameState.board.some(row => row.includes(0))) {
      isComplete = false;
    }

    setErrors(newErrors);
    if (isComplete && newErrors.length === 0) {
      setCompleted(true);
      setIsRunning(false);
    }
  };

  const isValidSet = (arr) => {
    const set = new Set(arr.filter(num => num !== 0));
    return set.size === arr.filter(num => num !== 0).length;
  };

  const getBox = (board, startRow, startCol) => {
    const box = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        box.push(board[startRow + i][startCol + j]);
      }
    }
    return box;
  };

  const restartGame = () => {
    const { board, solution } = generateSudoku(difficulty);
    setGameState({ board, initialBoard: board.map(row => [...row]), solution });
    setCompleted(false);
    setErrors([]);
    setTime(0);
    setIsRunning(true);
    setHints(3);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getHint = () => {
    if (hints > 0) {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (gameState.board[row][col] === 0) {
            const newBoard = gameState.board.map(r => [...r]);
            newBoard[row][col] = gameState.solution[row][col];
            setGameState(prev => ({ ...prev, board: newBoard }));
            setHints(hints - 1);
            return;
          }
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center max-w-md mx-auto p-4 font-sans">
      <h1 className="text-2xl font-normal mb-6 text-gray-800">數獨遊戲</h1>
      <div className="flex gap-4 mb-6">
        <select 
          value={difficulty} 
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-24 bg-gray-100 border border-gray-300 rounded p-2"
        >
          <option value="easy">簡單</option>
          <option value="medium">中等</option>
          <option value="hard">困難</option>
        </select>
        <button onClick={restartGame} className="bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-2 rounded">重新開始</button>
        <button onClick={getHint} disabled={hints === 0} className="bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-2 rounded disabled:opacity-50">提示 ({hints})</button>
      </div>
      <div className="mb-4 text-gray-600">時間：{formatTime(time)}</div>
      <div className="grid grid-cols-9 gap-0 mb-6">
        {gameState.board.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="number"
              min="1"
              max="9"
              value={cell === 0 ? '' : cell}
              onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
              className={`w-10 h-10 text-center border border-gray-300 ${
                gameState.initialBoard[rowIndex][colIndex] !== 0 ? 'bg-gray-100 text-gray-700' : 'bg-white'
              } focus:outline-none focus:border-gray-500`}
              style={{
                borderWidth: colIndex % 3 === 2 ? '0 2px 0 0' : '0 1px 0 0',
                borderBottomWidth: rowIndex % 3 === 2 ? '2px' : '1px',
              }}
              readOnly={gameState.initialBoard[rowIndex][colIndex] !== 0}
            />
          ))
        ))}
      </div>
      {errors.length > 0 && (
        <div className="mb-4 w-full bg-red-50 border border-red-200 text-red-800 p-4 rounded">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      {completed && (
        <div className="mb-4 w-full bg-green-50 border border-green-200 text-green-800 p-4 rounded text-center">
          恭喜！您已成功完成數獨遊戲！用時：{formatTime(time)}
        </div>
      )}
    </div>
  );
};

export default SudokuGame;