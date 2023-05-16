import {CognitoHostedUIIdentityProvider} from '@aws-amplify/auth';
import {Auth, Hub} from 'aws-amplify';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import FloatButtonComponent from '../../components/float-button.component';
import SubtitleComponent from '../../components/subtitle.component';
import TitleComponent from '../../components/title.component';
import {validatedAuthenticated} from '../../security/authentication/authentication';
import {setApp} from '../../store/slices/app.slice';
import google from './../../../assets/images/google.png';

const LoginScreen = ({navigation, route}: any) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const listener = Hub.listen('auth', ({payload: {event}}) => {
      console.info('Listen Auth Channel');
      console.info('Event', event);
      switch (event) {
        case 'parsingCallbackUrl':
        case 'signOut':
          validatedAuthenticated(dispatch, navigation, route);
          break;
        default:
          break;
      }
    });
    return listener;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <TitleComponent style={styles.title} text="Ven" />
        <SubtitleComponent
          style={styles.subtitle}
          text="Conversa al instante con personas que quieren escucharte!"
        />
      </View>
      <View style={styles.buttonsContainer}>
        <FloatButtonComponent
          styles={styles.googleButtonContainer}
          stylesIcon={styles.googleButton}
          icon={google}
          onPress={() => {
            Auth.federatedSignIn({
              provider: CognitoHostedUIIdentityProvider.Google,
            });
            dispatch(setApp({isLoading: true}));
          }}
        />
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
    padding: 10,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButtonContainer: {
    width: 80,
    height: 80,
    backgroundColor: 'white',
    elevation: 5,
  },
  googleButton: {
    width: 40,
    height: 40,
  },
});
