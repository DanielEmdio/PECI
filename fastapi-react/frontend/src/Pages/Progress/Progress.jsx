import React, { useState } from 'react';

const Progress = () => {
  const [progress, setProgress] = useState(0);

  const handleIncrement = () => {
    setProgress(progress + 1);
  };

  const handleDecrement = () => {
    setProgress(progress - 1);
  };

  return (
    <div>
      <h1>Progress Tracking Page</h1>
      <p>Current Progress: {progress}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </div>
  );
};

export default Progress;
