import {graphqlOperation} from 'aws-amplify';
import gql from 'graphql-tag';
import {ListTopicsInput} from './types.topic.graphql';

export const listTopicsQuery = (listTopicsInput: ListTopicsInput) => {
  const query = gql`
    query ListTopicsQuery($input: ListTopicsInput!) {
      listTopics(input: $input) {
        topicsToTalk
        updatedAt
      }
    }
  `;
  return graphqlOperation(query, {input: listTopicsInput});
};
