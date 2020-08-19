import { createSlice } from '@reduxjs/toolkit';
import _cloneDeep from 'lodash/cloneDeep';
import _dropRight from 'lodash/dropRight';

export interface IServer {
  id: number;
  tasks: string[];
  taskCount: number;
}

interface IServerState {
  servers: IServer[];
}

const initialState: IServerState = {
  servers: [],
};

const serverSlice = createSlice({
  name: 'server',
  initialState: initialState,
  reducers: {
    addServer: (state) => ({
      ...state,
      servers:
        state.servers.length < 10
          ? [...state.servers, { id: state.servers.length + 1, tasks: [], taskCount: 1 }]
          : [...state.servers],
    }),
    removeServer: (state) => ({
      ...state,
      servers: _dropRight(state.servers, 1),
    }),
    addServerTask: (_state, action) => {
      const state = _cloneDeep(_state);
      const { serverId, updatetasks } = action.payload;
      const index = state.servers.findIndex((server) => server.id === serverId);
      state.servers[index].tasks = updatetasks;
      return {
        ...state,
        servers: [...state.servers],
      };
    },
    removeServerTask: (_state, action) => {
      const state = _cloneDeep(_state);
      const { serverId, taskIndex } = action.payload;
      const index = state.servers.findIndex((server) => server.id === serverId);
      state.servers[index].tasks.splice(taskIndex, 1);
      return {
        ...state,
        servers: [...state.servers],
      };
    },
    setTaskCount: (_state, action) => {
      const state = _cloneDeep(_state);
      const { serverId, taskCount } = action.payload;
      const index = state.servers.findIndex((server) => server.id === serverId);
      state.servers[index].taskCount = taskCount;
      return {
        ...state,
        servers: [...state.servers],
      };
    },
    changeTaskStatus: (_state, action) => {
      const state = _cloneDeep(_state);
      const { serverId, taskIndex, status } = action.payload;
      const index = state.servers.findIndex((server) => server.id === serverId);
      state.servers[index].tasks[taskIndex] = status;
      return {
        ...state,
        servers: [...state.servers],
      };
    },
  },
});

export const {
  addServer,
  removeServer,
  addServerTask,
  removeServerTask,
  setTaskCount,
  changeTaskStatus,
} = serverSlice.actions;

export default serverSlice.reducer;
