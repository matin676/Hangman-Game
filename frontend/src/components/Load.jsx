import React, { useRef } from "react";

export default function Load({ onLoadClick }) {
  const refreshButtonRef = useRef(null);
  const clickAudioRef = useRef(null);

  clickAudioRef.current = new Audio("/audio/refreshbtn.mp3");

  const handleClick = () => {
    onLoadClick();
    playClickSound();
  };

  const playClickSound = () => {
    if (clickAudioRef.current) {
      clickAudioRef.current.play();
    }
  };

  return (
    <div className="load-container">
      <img
        src="/images/load.png"
        alt="refresh button"
        onClick={handleClick}
        title="Refresh"
        ref={refreshButtonRef}
      />
    </div>
  );
}
