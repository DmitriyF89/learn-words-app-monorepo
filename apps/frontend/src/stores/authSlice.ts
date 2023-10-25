import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: { userId: string | null } = { userId: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserId: (state, { payload: { id } }: PayloadAction<{ id: string }>) => {
      state.userId = id;
    },
    resetState: () => {
      return initialState;
    },
  }
});

export const { setUserId, resetState } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUserId = (state: { auth: { userId: string | null } }) => {
  return state.auth.userId
};