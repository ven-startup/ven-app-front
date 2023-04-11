import {Auth, Hub} from 'aws-amplify';
import * as React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ErrorComponent from '../../components/error.component';
import NavigationComponent from '../../components/navigation.component';
import StepComponent from '../../components/step.component';
import SubtitleComponent from '../../components/subtitle.component';
import TextInputComponent from '../../components/text-input.component';
import TitleComponent from '../../components/title.component';
import {User, UserContext} from '../../contexts/user.context';
import {
  convertSignInEventDataToAuthentication,
  validatedAuthenticated,
} from '../../security/authentication/authentication';

const NicknameScreen = ({navigation, route}: any) => {
  const userContext = React.useContext(UserContext);
  const [nickname, setNickname] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const changeNickname = (newNickname: string) => {
    isValidate(newNickname);
    setNickname(clearNickname(newNickname));
  };
  const onPressBackButton = () => {
    Auth.signOut();
  };
  const onPressNextButton = () => {
    if (isValidate(nickname)) {
      userContext.nickname = nickname;
      navigation.navigate('MyData');
    }
  };
  const isValidate = (newNickname: string) => {
    const validated = true;
    setErrorMessage('');
    if (newNickname === '') {
      setErrorMessage('Debes registrar un Nickname!');
      return false;
    } else if (newNickname.length > 20) {
      setErrorMessage('No puede superar los 20 caracteres!');
      return false;
    }
    return validated;
  };
  const clearNickname = (newNickname: string): string => {
    let cleanNewNickname = newNickname;
    const alphanumericRegex = /[^a-zA-Z0-9]/g;
    if (cleanNewNickname !== '' && alphanumericRegex.test(cleanNewNickname)) {
      cleanNewNickname = cleanNewNickname.replace(alphanumericRegex, '');
    }
    if (cleanNewNickname.length > 20) {
      cleanNewNickname = cleanNewNickname.substring(0, 20);
    }
    return cleanNewNickname;
  };

  React.useEffect(() => {
    const unsubscribe = Hub.listen('auth', ({payload: {event, data}}) => {
      console.log('event', event);
      console.log('data', data);
      switch (event) {
        case 'signIn':
          userContext.authentication =
            convertSignInEventDataToAuthentication(data);
          console.log('userContext', userContext);
          validatedAuthenticated(navigation, route);
          break;
        case 'signOut':
          const keys = Object.keys(userContext);
          keys.forEach(key => {
            delete userContext[key as keyof User];
          });
          console.log('userContext', userContext);
          validatedAuthenticated(navigation, route);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
        default:
          console.log('default');
          break;
      }
    });
    validatedAuthenticated(navigation, route);
    return unsubscribe;
  }, [userContext, navigation, route]);

  return (
    <SafeAreaView style={styles.nicknameContainer}>
      <NavigationComponent
        onPressBackButton={onPressBackButton}
        onPressNextButton={onPressNextButton}
        style={styles.navigation}
      />
      <StepComponent total={4} actualStep={1} style={styles.step} />
      <TitleComponent text="Nickname" style={styles.title} />
      <SubtitleComponent
        text="¿Con que nombre quieres que te conozcan?"
        style={styles.subtitle}
      />
      <TextInputComponent
        value={nickname}
        changeValue={changeNickname}
        placeholder="Nickname"
        style={styles.textInput}
      />
      <ErrorComponent text={errorMessage} />
    </SafeAreaView>
  );
};

export default NicknameScreen;

const styles = StyleSheet.create({
  nicknameContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  navigation: {
    marginBottom: 12,
  },
  step: {
    marginBottom: 27,
  },
  title: {
    marginBottom: 78,
  },
  subtitle: {
    marginBottom: 78,
  },
  textInput: {
    marginBottom: 10,
  },
});
