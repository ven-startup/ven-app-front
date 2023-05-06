import {graphqlOperation} from 'aws-amplify';
import gql from 'graphql-tag';

export const onCreateRoomSubscription = () => {
  console.info('Init process of suscribe to onCreateRoomSubscription');
  const subscription = gql`
    subscription OnCreateRoomSubscription {
      onCreateRoom {
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
  return graphqlOperation(subscription);
};
