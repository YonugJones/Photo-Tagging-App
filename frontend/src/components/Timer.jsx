// Timer component

import { useTimer } from '../context/TimerContext';

const Timer = () => {
  const { elapsedTime } = useTimer();

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  return (
    <div className='timer'>
      <p>Time: {formatTime(elapsedTime)}</p>
    </div>
  )
}

export default Timer;