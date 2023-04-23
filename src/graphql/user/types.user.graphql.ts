export type Operation = {
  createUser: User;
  getUser: User;
};
export interface User {
  user?: string;
  nickname?: string;
  birthday?: string;
  gender?: string;
  topicsToTalk?: string[];
  topicsToListen?: string[];
}

export interface CreateUserInput {
  birthday: string;
  gender: string;
  nickname: string;
  topicsToTalk: string[];
  topicsToListen: string[];
}

export interface UpdateUserInput {
  nickname?: string;
  topicsToTalk?: string[];
  topicsToListen?: string[];
}
