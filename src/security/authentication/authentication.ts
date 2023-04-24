import {GraphQLQuery} from '@aws-amplify/api';
import {API, Auth} from 'aws-amplify';
import {Authentication} from '../../contexts/user.context';
import {getUserQuery} from '../../graphql/user/query.user.graphql';
import {Operation} from '../../graphql/user/types.user.graphql';
import {setApp} from '../../store/slices/app.slice';
import {cleanUser, setUser} from '../../store/slices/user.slice';

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
  dispatch: any,
  navigation: {navigate: Function},
  route: {name: string},
) => {
  console.info('Start Validated Authenticated');
  Auth.currentAuthenticatedUser()
    .then(async () => {
      console.info('ValidatedAuthenticated Success');
      console.info('Current Screen', route.name);
      const response = await API.graphql<GraphQLQuery<Operation>>(
        getUserQuery(),
      );
      const user = response?.data?.getUser;
      if (user) {
        console.info('User Exists');
        dispatch(setUser(user));
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
      dispatch(cleanUser());
      console.warn('Destinity Screen Login');
      navigation.navigate('Login');
    })
    .finally(() => {
      console.info('Finished Validated Authenticated');
      dispatch(setApp({isLoading: false}));
    });
};
