import {GraphQLQuery} from '@aws-amplify/api';
import {API, Auth} from 'aws-amplify';
import {
  Authentication,
  UserInit,
  UserContextInterface,
} from '../../contexts/user.context';
import {getUserQuery} from '../../graphql/user/query.user.graphql';
import {Operation} from '../../graphql/user/types.user.graphql';

export const convertSignInEventDataToAuthentication = (
  signInEvent: any,
): Authentication => {
  return {
    username: signInEvent?.username,
    accessToken: signInEvent?.signInUserSession?.accessToken?.jwtToken,
    refreshToken: signInEvent?.signInUserSession?.refreshToken?.token,
  };
};

export const validatedAuthenticated = (
  userContext: UserContextInterface,
  data: any,
  navigation: {navigate: Function},
  route: {name: string},
  setIsLoading: (isLoading: boolean) => any,
) => {
  console.info('Start Validated Authenticated');
  setIsLoading(true);
  Auth.currentAuthenticatedUser()
    .then(async () => {
      console.info('ValidatedAuthenticated Success');
      console.info('Current Screen', route.name);
      userContext.authentication = convertSignInEventDataToAuthentication(data);
      const response = await API.graphql<GraphQLQuery<Operation>>(
        getUserQuery(),
      );
      const user = response?.data?.getUser;
      if (user) {
        console.info('User Exists');
        userContext.user = {...user};
        console.info('Destinity Screen Home');
        navigation.navigate('Home');
      } else {
        console.info('Destinity Screen Nickname');
        navigation.navigate('Nickname');
      }
    })
    .catch(() => {
      console.warn('ValidatedAuthenticated Failed');
      console.warn('Current Screen', route.name);
      delete userContext.authentication;
      userContext.user = {...UserInit};
      console.warn('Destinity Screen Login');
      navigation.navigate('Login');
    })
    .finally(() => {
      console.info('Finished Validated Authenticated');
      setIsLoading(false);
    });
};
