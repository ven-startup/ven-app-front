import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface User {
  user?: string;
  nickname?: string;
  birthday?: string;
  gender?: Gender | string;
  topicsToTalk?: string[];
  topicsToListen?: string[];
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

const initialState = {
  value: {
    user: '',
    nickname: '',
    birthday: '',
    gender: '',
    topicsToTalk: [],
    topicsToListen: [],
  } as User,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.value = {...state.value, ...action.payload};
    },
    cleanUser: state => {
      state.value = {...initialState.value};
    },
  },
});

// Action creators are generated for each case reducer function
export const {setUser, cleanUser} = userSlice.actions;

export default userSlice.reducer;
