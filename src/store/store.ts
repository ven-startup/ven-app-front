import {configureStore} from '@reduxjs/toolkit';
import appSlice from './slices/app.slice';
import userSlice from './slices/user.slice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    app: appSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
