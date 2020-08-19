import React, { useState, useEffect } from 'react';

interface IProps {
  status: string;
  updateTask: () => void;
}

const Taskbar = ({status, updateTask}: IProps) => {
  const [counter, setCounter] = useState(20);
  
  useEffect(() => {
    counter === 0 && setTimeout(() => updateTask(), 200);
    counter > 0 && setTimeout(() => (setCounter(counter - 1)), 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter])

  const displayCounter = () => {
    return counter.toString().length === 1 ? `0${counter}` : counter;
  }

  const barStyle = {
    width: `${((20 - counter) / 2) * 10}%`
  }

  return (
    <div className="task-bar">
      <div style={barStyle} className="task-progress-bar">
        00:{status === 'complete' ? '00' : displayCounter()}
      </div>
    </div>
  );
}

export default Taskbar;
