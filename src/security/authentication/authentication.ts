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
      console.log('Authenticated');
      navigation.navigate('Nickname');
    })
    .catch(() => {
      console.log('Not Authenticated', route.name);
      if (route.name !== 'Login') {
        navigation.navigate('Login');
      }
    });
};
