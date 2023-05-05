export type Operation = {
  createRoom: Room;
  onCreateRoom: Room;
};

export interface Room {
  user: string;
  order: number;
  friend: {
    user: string;
    nickname: string;
    birthday: string;
    gender: string;
    topicsToTalk: string[];
    topicsToListen: string[];
    offer?: string;
    answer?: string;
    iceCandidates?: string[];
  };
}

export interface CreateRoomInput {
  user: string;
  friend: FriendInput;
  order: number;
}

export interface FriendInput {
  user: string;
  nickname: string;
  birthday: string;
  gender: string;
  topicsToTalk: string[];
  topicsToListen: string[];
  offer?: string;
  answer?: string;
  iceCandidates?: string[];
}
