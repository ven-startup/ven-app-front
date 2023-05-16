import {graphqlOperation} from 'aws-amplify';
import gql from 'graphql-tag';

export const getUserQuery = () => {
  const query = gql`
    query GetUserQuery {
      getUser {
        gender
        birthday
        nickname
        topicsToListen
        topicsToTalk
        user
        creationDate
        personalInformationUpdateDate
      }
    }
  `;
  return graphqlOperation(query);
};
