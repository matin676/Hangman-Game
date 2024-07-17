import React, { useEffect, useRef } from "react";

export default function Keyboard({ selectedLetters, gameOver, onLetterClick }) {
  const keyboardRef = useRef(null);
  const clickAudioRef = useRef(null);

  clickAudioRef.current = new Audio("/audio/keyboard.mp3");

  const playClickSound = () => {
    if (clickAudioRef.current) {
      clickAudioRef.current.play();
    }
  };

  useEffect(() => {
    const keyboardDiv = keyboardRef.current;
    if (keyboardDiv) {
      keyboardDiv.innerHTML = "";
      for (let i = 97; i <= 122; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement("button");
        const span = document.createElement("span");
        span.innerText = letter;
        keyboardDiv.appendChild(button);
        button.appendChild(span);
        button.disabled = selectedLetters.includes(letter) || gameOver;
        button.addEventListener("click", () => {
          onLetterClick(letter);
          playClickSound();
        });
      }
    }

    return () => {
      const buttons = keyboardDiv ? keyboardDiv.querySelectorAll("button") : [];
      buttons.forEach((button) => {
        button.removeEventListener("click", () => {
          onLetterClick(button.innerText);
          playClickSound();
        });
      });
    };
  }, [selectedLetters, gameOver, onLetterClick]);

  return <div className="keyboard" ref={keyboardRef}></div>;
}
