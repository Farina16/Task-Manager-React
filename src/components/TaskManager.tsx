import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  addServer, 
  removeServer, 
  addTask, 
  updateServerTasks,
  IServer,
} from '../redux/serverReducer';
import { RootState } from '../store';
import Taskbar from './Taskbar';
import PendingTask from './PendingTask';

const TaskManager = () => {
  const dispatch = useDispatch();
  const [taskCount, setTaskCount] = useState(1);
  const {servers, tasks} = useSelector(({ Server }: RootState) => {
    return { 
        servers: Server.servers,
        tasks: Server.tasks,
    }
  })

  const addNewServer= () => {
    dispatch(addServer());
  }

  const updateTask = (serverId: number) => {
    dispatch(updateServerTasks({serverId}));
  }

  const addNewTask = () => {
    dispatch(addTask());
    servers.length > 0 && servers.map((server: IServer) => {
      server.status === 'idle' && dispatch(updateServerTasks({serverId: server.id}));
    })
  }

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <div className="app-container">
        <div>
          <button onClick={() => addNewServer()} className="btn add-server-btn">Add a server</button>
          <button onClick={() => dispatch(removeServer())} className="btn remove-server-btn">Remove a server</button>
        </div>

        <div className="task-container">
          <select className="add-dropdown" value={taskCount} 
            onChange={(e: any) => setTaskCount(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <button onClick={() => addNewTask()} className="btn add-task-btn">Add tasks</button>
          {tasks.map((task: string, index: number) => <div key={index}><PendingTask taskIndex={index} /></div>)}
          {servers?.map((server: IServer) => (
            <div key={server.id}>
              <h3>Server no {server.id}</h3>
              {server.tasks?.map((task: string, index: number) => 
                (task === 'start' || task === 'complete') && (
                  <div key={index}>
                    <Taskbar status={task} updateTask={() => updateTask(server.id)} />
                  </div>       
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskManager;
