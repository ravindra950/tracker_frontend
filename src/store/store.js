import { configureStore } from '@reduxjs/toolkit';
import logReducer from './logSlice';

export const store = configureStore({
  reducer: {
    logs: logReducer
  }
});
