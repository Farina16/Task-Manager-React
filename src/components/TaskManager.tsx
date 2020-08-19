import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  addServer, 
  removeServer, 
  addServerTask, 
  removeServerTask,
  IServer, 
  setTaskCount,
  changeTaskStatus,
} from '../redux/serverReducer';
import { RootState } from '../store';
import Taskbar from './Taskbar';

const TaskManager = () => {
  const dispatch = useDispatch();
  const {servers} = useSelector(({ Server }: RootState) => {
    return { 
        servers: Server.servers,
    }
  })

  const addTask= (serverId: number) => {
    const index = (servers && servers.findIndex(server => server.id === serverId)) as number;
    const { taskCount, tasks } = servers[index] as IServer;
    let newtasks = tasks;
    for (let i=0; i<taskCount; i++) {
        newtasks.find((task: string) => task === 'start') ?
            newtasks=[ ...newtasks, 'pending']
        :
            newtasks=[ ...newtasks, 'start']
    }
    dispatch(addServerTask({serverId, updatetasks: newtasks}))
  }

  const updateTask = (serverId: number, taskIndex: number) => {
    const index = servers.findIndex((server) => server.id === serverId);
    dispatch(changeTaskStatus({serverId, taskIndex, status: 'complete'}));
    (servers[index].tasks.length > taskIndex + 1) && 
      dispatch(changeTaskStatus({serverId, taskIndex: taskIndex + 1, status: 'start'}));
  }

  const removeTask = (serverId: number, taskIndex: number) => {
    dispatch(removeServerTask({serverId, taskIndex}))
  }

  const pendingTask = (serverId: number, taskIndex: number) => (
    <div className="waiting-task">
      <div className="task-bar">waiting...</div>
      <button onClick={() => removeTask(serverId, taskIndex)} className="btn remove-task-btn">
        <i className="fa fa-trash"></i>
      </button>
    </div>
  )

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <div className="app-container">
        <div>
          <button onClick={() => dispatch(addServer())} className="btn add-server-btn">Add a server</button>
          <button onClick={() => dispatch(removeServer())} className="btn remove-server-btn">Remove a server</button>
        </div>
        {servers?.map((server: IServer) => (
          <div key={server.id} className="task-container">
            <select className="add-dropdown" value={server.taskCount} 
            onChange={(e: any) => dispatch(setTaskCount({ serverId: server.id, taskCount: e.target.value}))}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            <button onClick={() => addTask(server.id)} className="btn add-task-btn">Add tasks</button>
            {server.tasks?.map((task: string, index: number) => {
              return task === 'pending' ? 
                  pendingTask(server.id, index) 
                : 
                  <div key={index}>
                    <Taskbar status={task} updateTask={() => updateTask(server.id, index)} />
                  </div>       
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskManager;
