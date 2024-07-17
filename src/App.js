import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import StartPage from "./components/StartPage";
import Gamebox from "./components/Gamebox";
import Menu from "./components/Menu";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/menu" element={<Menu />} />
        <Route
          path="/main/superhero"
          element={<Gamebox category="superhero" />}
        />
        <Route path="/main/animal" element={<Gamebox category="animal" />} />
        <Route path="/main/movie" element={<Gamebox category="movie" />} />
      </Routes>
    </Router>
  );
}
