import React, { useEffect, useState } from 'react';
import './Clock.css';

const Clock = ({ initialTime = 5, isRunning, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    // Reset time left when initialTime changes
    setTimeLeft(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 1) {
            onTimeUp(); // Call onTimeUp when time runs out
            clearInterval(timer); // Clear the interval
            return 0; // Set timeLeft to 0
          }
          return prevTime - 1; // Decrement timeLeft
        });
      }, 1000);

      return () => clearInterval(timer); // Cleanup timer on unmount or when isRunning changes
    }
  }, [isRunning, timeLeft, onTimeUp]); // Dependencies: isRunning, timeLeft, onTimeUp

  // Calculate percentage for smooth outer circle reduction
  const timePercentage = (timeLeft / initialTime) * 100;

  return (
    <div className="clock-container">
      <div
        className="outer-circle"
        style={{
          background: `conic-gradient(
            green 0%, 
            yellow ${(100 - timePercentage) / 2}%, 
            red ${(100 - timePercentage)}%, 
            black ${100 - timePercentage}% 100%)`,
        }}
      >
        <div className="inner-circle">
          <span style={{ color: 'white' }}>{timeLeft}</span>
        </div>
      </div>
    </div>
  );
};

export default Clock;
