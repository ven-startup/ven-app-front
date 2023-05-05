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
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        // ignoredActions: ['your/action/type'],
        // Ignore these field paths in all actions
        ignoredActionPaths: [
          'payload.webRTC.rtcPeerConnection',
          'payload.webRTC.remoteMediaStream',
        ],
        // Ignore these paths in the state
        ignoredPaths: [
          'room.value.webRTC.rtcPeerConnection',
          'room.value.webRTC.localMediaStream',
          'room.value.webRTC.remoteMediaStream',
        ],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
