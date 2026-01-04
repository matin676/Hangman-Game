import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy load components for code splitting
const StartPage = lazy(() => import("./components/StartPage"));
const Menu = lazy(() => import("./components/Menu"));
const Gamebox = lazy(() => import("./components/Gamebox"));
const NotFound = lazy(() => import("./components/NotFound"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="loading-fallback">
    <div className="loading-spinner"></div>
    <p>Loading...</p>
  </div>
);

import { GameProvider } from "./context/GameContext";

export default function App() {
  return (
    <Router>
      <GameProvider>
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<StartPage />} />
              <Route path="/menu" element={<Menu />} />
              <Route
                path="/main/superhero"
                element={<Gamebox category="superhero" />}
              />
              <Route
                path="/main/animal"
                element={<Gamebox category="animal" />}
              />
              <Route
                path="/main/movie"
                element={<Gamebox category="movie" />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </GameProvider>
    </Router>
  );
}
