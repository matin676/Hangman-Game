import React from "react";
import { Link } from "react-router-dom";

import "../css/menu.css";

export default function Menu() {
  return (
    <div className="menu-page">
      <h2 className="menu-logo">
        <img src="/images/menu.png" alt="menu" />
      </h2>
      <div className="menu-container">
        <div className="menu-box">
          <Link to="/main/superhero" className="menu-link">
            <div className="menu-img-container">
              <img src="/images/superhero_logo.jpg" alt="superhero game" />
            </div>
            <h2 className="menu-box-logo">Superhero</h2>
          </Link>
        </div>
        <div className="menu-box">
          <Link to="/main/animal" className="menu-link">
            <div className="menu-img-container">
              <img src="/images/animal.jpg" alt="animal game" />
            </div>
            <h2 className="menu-box-logo">Animal</h2>
          </Link>
        </div>
        <div className="menu-box">
          <Link to="/main/movie" className="menu-link">
            <div className="menu-img-container">
              <img src="/images/movie.jpg" alt="movie game" />
            </div>
            <h2 className="menu-box-logo">Movie</h2>
          </Link>
        </div>
      </div>
    </div>
  );
}
