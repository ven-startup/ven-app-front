import * as React from 'react';

export interface User {
  authentication?: Authentication;
  nickname?: string;
  birthday?: string;
  gender?: Gender | string;
  topicsToTalk?: string[];
  topicsToListen?: string[];
}

export interface Authentication {
  username: string;
  accessToken: string;
  refreshToken: string;
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export const UserContext = React.createContext<User>({});
