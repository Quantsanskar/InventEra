import { useState, useEffect, useCallback } from 'react';
// import './App.css';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: 0 };
const game = () => {
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [food, setFood] = useState({ x: 15, y: 15 });
    const [direction, setDirection] = useState(INITIAL_DIRECTION);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);

    const generateFood = useCallback(() => {
        const newFood = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
        };
        setFood(newFood);
    }, []);

    const resetGame = () => {
        setSnake(INITIAL_SNAKE);
        setDirection(INITIAL_DIRECTION);
        generateFood();
        setGameOver(false);
        setScore(0);
    };

    const checkCollision = (head) => {
        // Wall collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
            return true;
        }
        // Self collision
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                return true;
            }
        }
        return false;
    };

    const moveSnake = useCallback(() => {
        if (gameOver || (direction.x === 0 && direction.y === 0)) return;

        setSnake((prevSnake) => {
            const newSnake = [...prevSnake];
            const head = {
                x: newSnake[0].x + direction.x,
                y: newSnake[0].y + direction.y
            };

            if (checkCollision(head)) {
                setGameOver(true);
                return prevSnake;
            }

            newSnake.unshift(head);

            // Check if food is eaten
            if (head.x === food.x && head.y === food.y) {
                setScore(prev => prev + 1);
                generateFood();
            } else {
                newSnake.pop();
            }

            return newSnake;
        });
    }, [direction, food, gameOver, generateFood]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    if (direction.y !== 1) setDirection({ x: 0, y: -1 });
                    break;
                case 'ArrowDown':
                    if (direction.y !== -1) setDirection({ x: 0, y: 1 });
                    break;
                case 'ArrowLeft':
                    if (direction.x !== 1) setDirection({ x: -1, y: 0 });
                    break;
                case 'ArrowRight':
                    if (direction.x !== -1) setDirection({ x: 1, y: 0 });
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [direction]);

    useEffect(() => {
        const gameLoop = setInterval(moveSnake, 150);
        return () => clearInterval(gameLoop);
    }, [moveSnake]);


    return (
        <div className="game-container">
            <div className="score">Score: {score}</div>
            <div className="grid">
                {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
                    const x = index % GRID_SIZE;
                    const y = Math.floor(index / GRID_SIZE);
                    const isSnake = snake.some(segment => segment.x === x && segment.y === y);
                    const isFood = food.x === x && food.y === y;
                    const snakeIndex = snake.findIndex(segment => segment.x === x && segment.y === y);

                    return (
                        <div
                            key={index}
                            className={`cell ${isSnake ? 'snake' : ''} ${isFood ? 'food' : ''}`}
                            data-snake-index={snakeIndex}
                        >
                            {isSnake && <div className="snake-shadow"></div>}
                        </div>
                    );
                })}
            </div>
            {gameOver && (
                <div className="game-over">
                    <h2>Game Over!</h2>
                    <button onClick={resetGame}>Play Again</button>
                </div>
            )}
        </div>

    );
};

export default game;