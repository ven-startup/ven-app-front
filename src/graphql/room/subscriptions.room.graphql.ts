import {graphqlOperation} from 'aws-amplify';
import gql from 'graphql-tag';

export const onCreateRoomSubscription = () => {
  console.info('Init process of suscribe to onCreateRoomSubscription');
  const subscription = gql`
    subscription OnCreateRoomSubscription {
      onCreateRoom {
        user
        friend {
          birthday
          gender
          host
          nickname
          topicsToListen
          topicsToTalk
        }
      }
    }
  `;
  return graphqlOperation(subscription);
};
