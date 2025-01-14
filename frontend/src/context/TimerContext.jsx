// Global state for the timer

import { createContext, useContext, useState, useEffect } from 'react';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timerId;
    if (isRunning) {
      timerId = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } 
    return () => clearInterval(timerId);
  }, [isRunning])

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setElapsedTime(0);
  }

  return (
    <TimerContext.Provider
      value={{ elapsedTime, isRunning, startTimer, stopTimer, resetTimer }}
    >
      {children}
    </TimerContext.Provider>
  )
}

export const useTimer = () => useContext(TimerContext);
