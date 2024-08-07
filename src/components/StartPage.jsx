import React from "react";
import { Link } from "react-router-dom";

import "../css/startPage.css";

export default function StartPage() {
  const handlePlayButtonClick = () => {
    const audio = new Audio("/audio/startgame.mp3");
    audio.play();
  };

  return (
    <div className="page_Container">
      <img src="/images/TitleImage.svg" alt="Title" className="title-img" />
      <Link to="/menu">
        <img
          src="/images/play_btn.png"
          alt="play button"
          className="play-btn"
          onClick={handlePlayButtonClick}
        />
      </Link>
    </div>
  );
}
