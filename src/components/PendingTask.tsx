import React from 'react';
import { useDispatch } from 'react-redux';
import { removeTask } from '../redux/serverReducer';

interface IProps {
  taskIndex: number;
}

const PendingTask = ({ taskIndex }: IProps) => {  
  const dispatch = useDispatch();

  return (
    <div className="waiting-task">
      <div className="task-bar">waiting...</div>
      <button onClick={() => dispatch(removeTask(taskIndex))} className="btn remove-task-btn">
      <i className="fa fa-trash"></i>
      </button>
    </div>
  );
}

export default PendingTask;
