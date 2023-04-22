import {graphqlOperation} from 'aws-amplify';
import gql from 'graphql-tag';
import {CreateUserInput} from './types.user.graphql';

export const createUserMutation = (createUserInput: CreateUserInput) => {
  const mutation = gql`
    mutation CreateUserMutation($input: CreateUserInput!) {
      createUser(input: $input) {
        user
        nickname
        topicsToListen
        gender
        birthday
        topicsToTalk
      }
    }
  `;
  return graphqlOperation(mutation, {input: createUserInput});
};
