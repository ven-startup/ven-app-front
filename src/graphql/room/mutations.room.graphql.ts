import {graphqlOperation} from 'aws-amplify';
import gql from 'graphql-tag';
import {CreateRoomInput} from './types.room.graphql';

export const createRoomMutation = (createRoomInput: CreateRoomInput) => {
  console.info('Call Create Room Mutation');
  const mutation = gql`
    mutation CreateRoomInput($input: CreateRoomInput!) {
      createRoom(input: $input) {
        user
        order
        friend {
          user
          birthday
          gender
          offer
          answer
          iceCandidates
          nickname
          topicsToListen
          topicsToTalk
        }
      }
    }
  `;
  return graphqlOperation(mutation, {input: createRoomInput});
};

export const closeRoomMutation = () => {
  console.info('Call Create Room Mutation');
  const mutation = gql`
    mutation CloseRoomMutation {
      closeRoom {
        user
        order
        friend {
          user
          birthday
          gender
          offer
          answer
          iceCandidates
          nickname
          topicsToListen
          topicsToTalk
        }
      }
    }
  `;
  return graphqlOperation(mutation);
};
