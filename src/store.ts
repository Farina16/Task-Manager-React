import { combineReducers, configureStore } from '@reduxjs/toolkit';
import serverReducer from './redux/serverReducer';

const rootReducer = combineReducers({
  Server: serverReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export default store;
