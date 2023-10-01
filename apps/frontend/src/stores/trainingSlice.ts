import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: { language: { label: string, id: string } | null, words: any[] | null } = {
  language: null,
  words: null
};

const trainingSlice = createSlice({
  name: 'training',
  initialState,
  reducers: {
    setLanguage: (state, { payload: { label, id } }: PayloadAction<{ label: string, id: string }>) => {
      state.language = { label, id };
    },
    setWords: (state, { payload: { words } }: PayloadAction<{
      words: any[]
    }>) => {
      state.words = words;
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const { setLanguage, setWords, resetState } = trainingSlice.actions;

export default trainingSlice.reducer;