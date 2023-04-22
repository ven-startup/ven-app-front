import * as React from 'react';

export interface UserContextInterface {
  authentication?: Authentication;
  user: User;
}

export interface Authentication {
  username: string;
  accessToken: string;
  refreshToken: string;
}

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

export const UserInit = {
  user: '',
  nickname: '',
  birthday: '',
  gender: '',
  topicsToTalk: [],
  topicsToListen: [],
};

export const UserContext = React.createContext<UserContextInterface>({
  user: {...UserInit},
});
