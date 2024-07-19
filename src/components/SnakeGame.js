import React, { useState, useEffect, useRef } from 'react';

const CANVAS_SIZE = 400;
const SNAKE_SIZE = 20;
const GAME_SPEED = 100;

const SnakeGame = () => {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStarted) {
        setGameStarted(true);
        setDirection({ x: 1, y: 0 }); // Start moving right
      } else {
        switch (e.key) {
          case 'ArrowUp':
            if (direction.y === 0) setDirection({ x: 0, y: -1 });
            break;
          case 'ArrowDown':
            if (direction.y === 0) setDirection({ x: 0, y: 1 });
            break;
          case 'ArrowLeft':
            if (direction.x === 0) setDirection({ x: -1, y: 0 });
            break;
          case 'ArrowRight':
            if (direction.x === 0) setDirection({ x: 1, y: 0 });
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [gameStarted, direction]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const moveSnake = () => {
        setSnake((prevSnake) => {
          const newSnake = [...prevSnake];
          const head = {
            x: (newSnake[0].x + direction.x + CANVAS_SIZE / SNAKE_SIZE) % (CANVAS_SIZE / SNAKE_SIZE),
            y: (newSnake[0].y + direction.y + CANVAS_SIZE / SNAKE_SIZE) % (CANVAS_SIZE / SNAKE_SIZE),
          };

          // Check collision with self
          if (newSnake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)) {
            setGameOver(true);
            return prevSnake;
          }

          newSnake.unshift(head);

          // Check if snake ate food
          if (head.x === food.x && head.y === food.y) {
            setScore((prevScore) => prevScore + 1);
            setFood({
              x: Math.floor(Math.random() * (CANVAS_SIZE / SNAKE_SIZE)),
              y: Math.floor(Math.random() * (CANVAS_SIZE / SNAKE_SIZE)),
            });
          } else {
            newSnake.pop();
          }

          return newSnake;
        });
      };

      const gameLoop = setInterval(moveSnake, GAME_SPEED);
      return () => clearInterval(gameLoop);
    }
  }, [direction, food, gameOver, gameStarted]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw snake
    ctx.fillStyle = 'green';
    snake.forEach((segment) => {
      ctx.fillRect(segment.x * SNAKE_SIZE, segment.y * SNAKE_SIZE, SNAKE_SIZE - 1, SNAKE_SIZE - 1);
    });

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * SNAKE_SIZE, food.y * SNAKE_SIZE, SNAKE_SIZE - 1, SNAKE_SIZE - 1);

    // Draw grid
    ctx.strokeStyle = '#ddd';
    for (let i = 0; i < CANVAS_SIZE / SNAKE_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * SNAKE_SIZE, 0);
      ctx.lineTo(i * SNAKE_SIZE, CANVAS_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * SNAKE_SIZE);
      ctx.lineTo(CANVAS_SIZE, i * SNAKE_SIZE);
      ctx.stroke();
    }
  }, [snake, food]);

  const restartGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection({ x: 0, y: 0 });
    setGameOver(false);
    setScore(0);
    setGameStarted(false);
  };

  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h3 className="text-3xl font-bold mb-4">貪食蛇遊戲</h3>
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            className="border-2 border-gray-400 mx-auto"
          />
          <p className="mt-4 text-xl">分數: {score}</p>
          {!gameStarted && !gameOver && (
            <p className="mt-2 text-lg">按任意方向鍵開始遊戲</p>
          )}
          {gameOver && (
            <div className="mt-4">
              <p className="text-xl text-red-500 mb-2">遊戲結束！</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={restartGame}
              >
                重新開始
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
