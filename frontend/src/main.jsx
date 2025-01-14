import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TimerProvider } from './context/TimerContext.jsx';
import './styles/index.css';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TimerProvider>
      <App />
    </TimerProvider>
  </StrictMode>,
)
