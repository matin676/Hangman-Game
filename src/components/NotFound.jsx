import React from "react";
import { Link } from "react-router-dom";
import "../css/notFound.css";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-content animate-fade-in-up">
        <span className="not-found-icon">🔍</span>
        <h1 className="not-found-title">404</h1>
        <p className="not-found-text">Page not found</p>
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
}
