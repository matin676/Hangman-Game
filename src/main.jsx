import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Create floating particles for animated background
const Particles = () => (
  <div className="particles">
    {[...Array(9)].map((_, i) => (
      <div key={i} className="particle" />
    ))}
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Particles />
    <App />
  </React.StrictMode>
);
