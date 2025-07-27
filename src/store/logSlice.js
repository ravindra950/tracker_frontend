import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLogs = createAsyncThunk('logs/fetchLogs', async () => {
  const res = await axios.get('http://localhost:4000/api/jobs/logs');
  return res.data;
});

export const triggerImport = createAsyncThunk('logs/triggerImport', async () => {
  await axios.post('http://localhost:4000/api/jobs/import');
  const res = await axios.get('http://localhost:4000/api/jobs/logs');
  return res.data;
});

export const fetchSummary = createAsyncThunk('logs/fetchSummary', async () => {
  const res = await axios.get('http://localhost:4000/api/jobs/summary');
  return res.data;
});

const logSlice = createSlice({
  name: 'logs',
  initialState: {
    data: [],
    status: 'idle',
    summary: []
  },
  extraReducers: builder => {
    builder
      .addCase(fetchLogs.pending, state => { state.status = 'loading'; })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(triggerImport.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchSummary.fulfilled, (state, action) => {
        state.summary = action.payload;
      });
  }
});

export default logSlice.reducer;
