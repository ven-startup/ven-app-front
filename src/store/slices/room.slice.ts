import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {MediaStream, RTCPeerConnection} from 'react-native-webrtc';
import facadeWebRtc from '../../web-rtc/facade.web-rtc';

export interface Room {
  user?: string;
  friend?: Friend;
  order?: number | Order;
  webRTC: WebRTC;
}

export interface Friend {
  user?: string;
  nickname?: string;
  birthday?: string;
  gender?: Gender | string;
  topicsToTalk?: string[];
  topicsToListen?: string[];
  offer?: string;
  answer?: string;
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum Order {
  FIRST_USER = 1,
  SECOND_USER = 2,
}

export interface WebRTC {
  rtcPeerConnection: RTCPeerConnection;
  offerDescription: string;
  answerDescription: string;
  localMediaStream: MediaStream | null;
  remoteMediaStream: MediaStream;
  iceCandidates: string[];
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
      offer: '',
      answer: '',
    } as Friend,
    webRTC: {
      rtcPeerConnection: facadeWebRtc.createPeerConnection(),
      offerDescription: '',
      answerDescription: '',
      iceCandidates: [],
      remoteMediaStream: facadeWebRtc.createRemoteMediaStream(),
      localMediaStream: null,
    },
  } as Room,
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<Room>) => {
      state.value = {...state.value, ...action.payload};
    },
    updateIceCandidate: (state, action) => {
      state.value = {
        ...state.value,
        webRTC: {
          ...state.value.webRTC,
          iceCandidates: [...state.value.webRTC.iceCandidates, action.payload],
        },
      };
    },
    cleanIceCandidates: state => {
      state.value = {
        ...state.value,
        webRTC: {
          ...state.value.webRTC,
          iceCandidates: [],
        },
      };
    },
    cleanRoom: state => {
      console.warn('clean 1');
      state.value.webRTC.remoteMediaStream.getTracks().map(track => {
        state.value.webRTC.remoteMediaStream.removeTrack(track);
      });
      console.warn('clean 2');
      state.value.webRTC.rtcPeerConnection.close();

      console.warn('clean 3');
      state.value = {
        ...initialState.value,
        webRTC: {
          rtcPeerConnection: facadeWebRtc.createPeerConnection(),
          offerDescription: '',
          answerDescription: '',
          iceCandidates: [],
          remoteMediaStream: facadeWebRtc.createRemoteMediaStream(),
          localMediaStream: null,
        },
      };
      console.warn('clean 4');
    },
  },
});

// Action creators are generated for each case reducer function
export const {setRoom, updateIceCandidate, cleanIceCandidates, cleanRoom} =
  roomSlice.actions;

export default roomSlice.reducer;
