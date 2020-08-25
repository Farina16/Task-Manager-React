import { createSlice } from '@reduxjs/toolkit';
import _cloneDeep from 'lodash/cloneDeep';
import _drop from 'lodash/drop';
import _dropRight from 'lodash/dropRight';

export interface IServer {
  id: number;
  tasks: string[];
  status: string;
}

interface IServerState {
  servers: IServer[];
  tasks: string[];
}

const initialState: IServerState = {
  servers: [],
  tasks: [],
};

const serverSlice = createSlice({
  name: 'server',
  initialState: initialState,
  reducers: {
    addServer: (state) => {
      return {
        ...state,
        servers:
          state.servers.length < 10
            ? [
                ...state.servers,
                {
                  id: state.servers.length + 1,
                  tasks: state.tasks.length > 0 ? ['start'] : [],
                  status: state.tasks.length > 0 ? 'active' : 'idle',
                },
              ]
            : [...state.servers],
        tasks: state.servers.length < 10 && state.tasks.length > 0 ? _drop(state.tasks, 1) : [],
      };
    },
    removeServer: (state) => ({
      ...state,
      servers: _dropRight(state.servers, 1),
    }),
    addTask: (state) => ({
      ...state,
      tasks: state.tasks.find((task: string) => task === 'start')
        ? [...state.tasks, 'pending']
        : [...state.tasks, 'start'],
    }),
    removeTask: (_state, action) => {
      const state = _cloneDeep(_state);
      state.tasks.length > 0 && state.tasks.splice(action.payload.taskIndex, 1);
      return {
        ...state,
        tasks: [...state.tasks],
      };
    },
    updateServerTasks: (_state, action) => {
      const state = _cloneDeep(_state);
      const index = state.servers.findIndex((server) => server.id === action.payload.serverId);
      const stasks = state.servers[index].tasks;
      stasks[stasks.length - 1] = 'complete';
      state.servers[index].tasks = state.tasks.length > 0 ? [...stasks, 'start'] : [...stasks];
      state.servers[index].status = state.tasks.length > 0 ? 'active' : 'idle';
      return {
        ...state,
        servers: [...state.servers],
        tasks: state.tasks.length > 0 ? _drop(state.tasks, 1) : [],
      };
    },
  },
});

export const {
  addServer,
  removeServer,
  addTask,
  removeTask,
  updateServerTasks,
} = serverSlice.actions;

export default serverSlice.reducer;
