import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

export interface App {
  isLoading?: boolean;
}

const initialState = {
  value: {
    isLoading: false,
  } as App,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setApp: (state, action: PayloadAction<App>) => {
      state.value = {...state.value, ...action.payload};
    },
  },
});

// Action creators are generated for each case reducer function
export const {setApp} = appSlice.actions;

export default appSlice.reducer;
