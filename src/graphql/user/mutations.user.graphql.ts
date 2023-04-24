import {graphqlOperation} from 'aws-amplify';
import gql from 'graphql-tag';
import {CreateUserInput, UpdateUserInput} from './types.user.graphql';

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

export const updateUserMutation = (updateUserInput: UpdateUserInput) => {
  const mutation = gql`
    mutation UpdateUserMutation($input: UpdateUserInput!) {
      updateUser(input: $input) {
        user
      }
    }
  `;
  return graphqlOperation(mutation, {input: updateUserInput});
};
