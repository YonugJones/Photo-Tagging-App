// Global state for the timer

import { createContext, useContext, useState, useEffect } from 'react';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timerId;
    if (isRunning) {
      console.log('Timer started');
      timerId = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } 
    return () => clearInterval(timerId);
  }, [isRunning])

  const startTimer = () => {
    console.log('Starting timer...');
    setIsRunning(true)
  };
  const stopTimer = () => {
    setIsRunning(false)
    console.log('Stopping timer...')
  };
  const resetTimer = () => {
    console.log('Resetting timer...')
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

// eslint-disable-next-line react-refresh/only-export-components
export const useTimer = () => useContext(TimerContext);
