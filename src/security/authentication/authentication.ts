import {Auth} from 'aws-amplify';
import {Authentication} from '../../contexts/user.context';

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
  navigation: {navigate: Function},
  route: {name: string},
) => {
  Auth.currentAuthenticatedUser()
    .then(() => {
      console.info('ValidatedAuthenticated Success');
      navigation.navigate('Nickname');
    })
    .catch(() => {
      console.warn('ValidatedAuthenticated Failed');
      console.warn('Current Screen', route.name);
      if (route.name !== 'Login') {
        navigation.navigate('Login');
      }
    });
};
