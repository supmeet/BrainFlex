// src/pages/WordWrap.jsx
import React, { useReducer, useEffect } from "react";
import DynamicHeader from "../components/DynamicHeader";
import DynamicInstructions from "../components/DynamicInstructions";
import GridCell from "../components/GridCell";
import KeyboardKey from "../components/KeyboardKey";
import wordWrapLogo from "../assets/images/WordWrap-Logo.webp";
import "../assets/css/WordWrap.css";

const initialState = {
  currentGuess: "",
  guesses: [],
  feedback: [],
  showCongrats: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_GUESS":
      return { ...state, currentGuess: action.payload };
    case "SUBMIT_GUESS":
      const newFeedback = calculateFeedback(action.payload);
      const isCorrect = action.payload === secretWord;
      return {
        ...state,
        guesses: [...state.guesses, action.payload],
        feedback: [...state.feedback, newFeedback],
        currentGuess: "",
        showCongrats: isCorrect,
      };
    default:
      return state;
  }
};

const secretWord = "WORD";

const WordWrap = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const instructions = [
    { text: "Guess the 4-letter word in 8 attempts." },
    { text: "No repeating letters in the word." },
    {
      text: "Feedback is provided for each guess:",
      subInstructions: [
        {
          text: "Green: Correct letter in the correct position.",
          color: "green",
        },
        {
          text: "Yellow: Correct letter in the wrong position.",
          color: "yellow",
        },
        { text: "Gray: Letter not in the word.", color: "gray" },
      ],
    },
  ];

  const handleKeyPress = (key) => {
    if (key === "ENTER" && state.currentGuess.length === 4) {
      dispatch({ type: "SUBMIT_GUESS", payload: state.currentGuess });
    } else if (key === "BACKSPACE") {
      dispatch({ type: "SET_GUESS", payload: state.currentGuess.slice(0, -1) });
    } else if (state.currentGuess.length < 4 && /^[A-Z]$/.test(key)) {
      dispatch({ type: "SET_GUESS", payload: state.currentGuess + key });
    }
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
  }, [state.currentGuess]);

  return (
    <div className="wordwrap-container">
      <DynamicHeader
        logo={wordWrapLogo}
        title="WordWrap"
        tagline="Challenge Your Vocabulary!"
      />
      <div className="content-area">
        <DynamicInstructions
          title="How to Play WordWrap"
          instructions={instructions}
        />
        <div className="game-area">
          {[...Array(8)].map((_, rowIndex) => (
            <div key={rowIndex} className="grid-row">
              {[...Array(4)].map((_, colIndex) => (
                <GridCell
                  key={colIndex}
                  letter={
                    state.guesses[rowIndex]?.[colIndex] ||
                    (rowIndex === state.guesses.length
                      ? state.currentGuess[colIndex] || ""
                      : "")
                  }
                  feedback={state.feedback[rowIndex]?.[colIndex]}
                  isActive={
                    rowIndex === state.guesses.length &&
                    colIndex === state.currentGuess.length
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="keyboard">
        {"QWERTYUIOPASDFGHJKLZXCVBNM".split("").map((key) => (
          <KeyboardKey key={key} letter={key} onClick={handleKeyPress} />
        ))}
        <KeyboardKey letter="ENTER" onClick={handleKeyPress} />
        <KeyboardKey letter="BACKSPACE" onClick={handleKeyPress} />
      </div>
      {state.showCongrats && (
        <div className="popup">
          <div className="popup-content">
            <h2>Congratulations!</h2>
            <p>You guessed the word correctly!</p>
            <button onClick={() => window.location.reload()}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
};

const calculateFeedback = (guess) => {
  const feedback = Array(4).fill("gray");
  const secretArray = secretWord.split("");

  guess.split("").forEach((letter, index) => {
    if (letter === secretArray[index]) {
      feedback[index] = "green";
      secretArray[index] = null;
    }
  });

  guess.split("").forEach((letter, index) => {
    if (feedback[index] !== "green" && secretArray.includes(letter)) {
      feedback[index] = "yellow";
      secretArray[secretArray.indexOf(letter)] = null;
    }
  });

  return feedback;
};

export default WordWrap;
