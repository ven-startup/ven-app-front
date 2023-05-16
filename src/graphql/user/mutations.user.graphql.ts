import {graphqlOperation} from 'aws-amplify';
import gql from 'graphql-tag';
import {
  CreateUserInput,
  UpdateUserInput,
  UpdateUserPersonalInformationInput,
} from './types.user.graphql';

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
        creationDate
        personalInformationUpdateDate
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

export const updateUserPersonalInformationMutation = (
  updateUserPersonalInformationInput: UpdateUserPersonalInformationInput,
) => {
  const mutation = gql`
    mutation UpdateUserPersonalInformationMutation(
      $input: UpdateUserPersonalInformationInput!
    ) {
      updateUserPersonalInformation(input: $input) {
        user
      }
    }
  `;
  return graphqlOperation(mutation, {
    input: updateUserPersonalInformationInput,
  });
};
