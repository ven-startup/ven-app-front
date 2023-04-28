import {graphqlOperation} from 'aws-amplify';
import gql from 'graphql-tag';

export const onCreateTopicSubscription = () => {
  console.info('Init process of suscribe to onCreateTopicSubscription');
  const subscription = gql`
    subscription OnCreateTopicSubscription {
      onCreateTopic {
        topicsToTalk
      }
    }
  `;
  return graphqlOperation(subscription);
};
