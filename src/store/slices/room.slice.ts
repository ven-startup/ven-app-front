import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

export interface Room {
  user?: string;
  friend?: Friend;
}

export interface Friend {
  nickname?: string;
  birthday?: string;
  gender?: Gender | string;
  topicsToTalk?: string[];
  topicsToListen?: string[];
  host?: string;
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

const initialState = {
  value: {
    user: '',
    friend: {
      user: '',
      nickname: '',
      birthday: '',
      gender: '',
      topicsToTalk: [],
      topicsToListen: [],
      host: '',
    } as Friend,
  },
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<Room>) => {
      state.value = {...state.value, ...action.payload};
    },
    cleanRoom: state => {
      state.value = {...initialState.value};
    },
  },
});

// Action creators are generated for each case reducer function
export const {setRoom, cleanRoom} = roomSlice.actions;

export default roomSlice.reducer;
