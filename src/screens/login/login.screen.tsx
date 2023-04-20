import {CognitoHostedUIIdentityProvider} from '@aws-amplify/auth';
import {Auth, Hub} from 'aws-amplify';
import * as React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  convertSignInEventDataToAuthentication,
  validatedAuthenticated,
} from '../../security/authentication/authentication';
import {fonts} from '../../themes/fonts.themes';
import google from './../../../assets/images/google.png';
import {UserContext, UserContextInit} from '../../contexts/user.context';

const LoginScreen = ({navigation, route}: any) => {
  const userContext = React.useContext(UserContext);

  React.useEffect(() => {
    const listener = Hub.listen('auth', ({payload: {event, data}}) => {
      console.info('Listen Auth Channel');
      console.info('Event', event);
      console.info('Data', data);
      switch (event) {
        case 'signIn':
          userContext.user = {...UserContextInit.user};
          userContext.authentication =
            convertSignInEventDataToAuthentication(data);
          validatedAuthenticated(navigation, route);
          break;
        case 'signOut':
          const keys = Object.keys(userContext);
          keys.forEach(key => {
            delete userContext[key as keyof UserContext];
          });
          validatedAuthenticated(navigation, route);
          break;
        default:
          break;
      }
    });
    validatedAuthenticated(navigation, route);
    return listener;
  }, [userContext, navigation, route]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Just Talk</Text>
        <Text style={styles.subtitle}>
          Conversa al instante con personas que quieren escucharte!
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() =>
            Auth.federatedSignIn({
              provider: CognitoHostedUIIdentityProvider.Google,
            })
          }>
          <Image source={google} style={styles.googleButton} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.ArialRoundedMT,
    color: 'black',
    fontSize: 50,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.ArialRoundedMT,
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButton: {
    height: 64,
    width: 64,
    marginRight: 25,
  },
  facebookButton: {
    height: 64,
    width: 64,
  },
});
