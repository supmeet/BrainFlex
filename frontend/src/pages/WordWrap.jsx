// src/pages/WordWrap.jsx
import React, { useState, useEffect } from "react";
import "../assets/css/WordWrap.css";

const WordWrap = () => {
  const secretWord = "WORD"; // Hardcoded secret word
  const [showPopup, setShowPopup] = useState(true);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [feedback, setFeedback] = useState([]);

  const startGame = () => {
    setShowPopup(false);
  };

  const handleKeyPress = (key) => {
    if (key === "ENTER") {
      if (currentGuess.length === 4) {
        submitGuess();
      }
    } else if (key === "BACKSPACE") {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (currentGuess.length < 4 && /^[A-Z]$/.test(key)) {
      setCurrentGuess(currentGuess + key);
    }
  };

  const submitGuess = () => {
    if (currentGuess.length === 4) {
      const newFeedback = calculateFeedback(currentGuess);
      setGuesses([...guesses, currentGuess]);
      setFeedback([...feedback, newFeedback]);
      setCurrentGuess("");
    }
  };

  const calculateFeedback = (guess) => {
    let greenCount = 0;
    let yellowCount = 0;
    const secretArray = secretWord.split("");
    const guessArray = guess.split("");

    guessArray.forEach((letter, index) => {
      if (letter === secretArray[index]) {
        greenCount++;
        secretArray[index] = null; // Mark as used
      }
    });

    guessArray.forEach((letter, index) => {
      if (secretArray.includes(letter) && letter !== secretWord[index]) {
        yellowCount++;
        secretArray[secretArray.indexOf(letter)] = null; // Mark as used
      }
    });

    return { green: greenCount, yellow: yellowCount };
  };

  useEffect(() => {
    const handlePhysicalKeyPress = (event) => {
      const key = event.key.toUpperCase();
      if (key === "ENTER" || key === "BACKSPACE" || /^[A-Z]$/.test(key)) {
        handleKeyPress(key);
      }
    };

    window.addEventListener("keydown", handlePhysicalKeyPress);
    return () => {
      window.removeEventListener("keydown", handlePhysicalKeyPress);
    };
  }, [currentGuess]);

  return (
    <div className="wordwrap-container">
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>How to Play WordWrap</h2>
            <p>Guess the 4-letter word in 8 attempts. No repeating letters!</p>
            <p>
              Green: Correct position. Yellow: Wrong position. Gray: Not in
              word.
            </p>
            <button onClick={startGame}>Start Game</button>
          </div>
        </div>
      )}
      <div className="game-area">
        <div className="grid">
          {[...Array(8)].map((_, rowIndex) => (
            <div key={rowIndex} className="grid-row">
              {[...Array(4)].map((_, colIndex) => (
                <div key={colIndex} className="grid-cell">
                  {guesses[rowIndex]
                    ? guesses[rowIndex][colIndex]
                    : rowIndex === guesses.length
                    ? currentGuess[colIndex] || ""
                    : ""}
                </div>
              ))}
              <div className="feedback-row">
                <div className="circle green-circle">
                  {feedback[rowIndex]?.green || 0}
                </div>
                <div className="circle yellow-circle">
                  {feedback[rowIndex]?.yellow || 0}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="keyboard">
        {"QWERTYUIOPASDFGHJKLZXCVBNM".split("").map((key) => (
          <div key={key} className="key" onClick={() => handleKeyPress(key)}>
            {key}
          </div>
        ))}
        <div className="key" onClick={() => handleKeyPress("ENTER")}>
          ⏎
        </div>
        <div className="key" onClick={() => handleKeyPress("BACKSPACE")}>
          ⌫
        </div>
      </div>
    </div>
  );
};

export default WordWrap;
