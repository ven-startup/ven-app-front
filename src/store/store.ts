import {configureStore} from '@reduxjs/toolkit';
import appSlice from './slices/app.slice';
import roomSlice from './slices/room.slice';
import userSlice from './slices/user.slice';

export const store = configureStore({
  reducer: {
    app: appSlice,
    user: userSlice,
    room: roomSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
