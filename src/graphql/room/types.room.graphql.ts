export type Operation = {
  onCreateRoom: Room;
};

export interface Room {
  user: string;
  nickname: string;
  birthday: string;
  gender: string;
  topicsToTalk: string[];
  topicsToListen: string[];
  host: string;
}
