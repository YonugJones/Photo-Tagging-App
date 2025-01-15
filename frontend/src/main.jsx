import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TimerProvider } from './context/TimerContext.jsx';
import GamePage from './pages/GamePage';
import HighScoresPage from './pages/HighScoresPage';
import './styles/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TimerProvider>
      <Router>
        <Routes>
          <Route path='/' element={<GamePage />} />
          <Route path="/high-scores" element={<HighScoresPage />} />
        </Routes>
      </Router>
    </TimerProvider>
  </StrictMode>,
)
