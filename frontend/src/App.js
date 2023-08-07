import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import StartPage from "./components/StartPage";
import Gamebox from "./components/Gamebox";

import "./css/index.css";
import "./css/startPage.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/gamebox" element={<Gamebox />} />
        <Route path="*" element={<StartPage />} />
      </Routes>
    </Router>
  );
}
