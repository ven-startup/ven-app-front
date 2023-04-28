export type Operation = {
  listTopics: Topic[];
  createTopic: Topic;
  onCreateTopic: Topic;
};

export interface Topic {
  user?: string;
  topicsToTalk?: string[];
  topicToListen?: string;
  updatedAt?: string;
}

export interface ListTopicsInput {
  updatedAt: string;
}

export interface CreateTopicInput {
  topicsToTalk: string[];
  topicToListen?: String;
}
