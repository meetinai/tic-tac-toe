import React, { useState } from 'react';
import styles from '../styles/TicTacToe.module.css';

const TicTacToe = () => {
  const emptyBoard: ("O" | "X" | "")[] = Array(9).fill("");
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState<"O" | "X">("O");
  const [winner, setWinner] = useState<"O" | "X" | null>(null);
  const [score, setScore] = useState({ O: 0, X: 0 });

  const handleCellClick = (index: number) => {
    if (winner) return;
    if (board[index] !== "") return;

    setBoard(board.map((item, itemIndex) => itemIndex === index ? currentPlayer : item));
    setCurrentPlayer(currentPlayer === "O" ? "X" : "O");
  };

  const checkWinner = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;

      if (board[a] && (board[a] === board[b] && board[a] === board[c])) {
        const winner = board[a] as "O" | "X";
        setWinner(winner);
        setScore({ ...score, [winner]: score[winner] + 1 });
      }
    }
  };

  React.useEffect(checkWinner, [board]);

  return (
    <div className={styles.container}>
      <div className={styles.scoreboard}>
        <div className={styles.score}>
          <span className={styles.player}>Player O:</span> {score.O}
        </div>
        <div className={styles.score}>
          <span className={styles.player}>Player X:</span> {score.X}
        </div>
      </div>
      <div className={styles.board}>
        {board.map((item, index) => (
          <div
            className={styles.cell}
            key={index}
            onClick={() => handleCellClick(index)}
          >
            {item}
          </div>
        ))}
        {winner && <div className={styles.winner}>Player {winner} won!</div>}
      </div>
    </div>
  );
};

export default TicTacToe;