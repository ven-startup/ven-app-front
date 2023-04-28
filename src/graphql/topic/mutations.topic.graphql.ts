import {graphqlOperation} from 'aws-amplify';
import gql from 'graphql-tag';
import {CreateTopicInput} from './types.topic.graphql';

export const createTopicMutation = (createTopicInput: CreateTopicInput) => {
  const mutation = gql`
    mutation CreateTopicInput($input: CreateTopicInput!) {
      createTopic(input: $input) {
        topicsToTalk
      }
    }
  `;
  return graphqlOperation(mutation, {input: createTopicInput});
};
