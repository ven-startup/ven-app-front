import {Auth} from 'aws-amplify';
import * as React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ErrorComponent from '../../components/error.component';
import NavigationComponent from '../../components/navigation.component';
import StepComponent from '../../components/step.component';
import SubtitleComponent from '../../components/subtitle.component';
import TextInputComponent from '../../components/text-input.component';
import TitleComponent from '../../components/title.component';
import {UserContext} from '../../contexts/user.context';
import {validatedAuthenticated} from '../../security/authentication/authentication';
import LoadingComponent from '../../components/loading.component';

const NicknameScreen = ({navigation, route}: any) => {
  const userContext = React.useContext(UserContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [nickname, setNickname] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const onPressBackButton = () => {
    Auth.signOut().then(() => {
      validatedAuthenticated(
        userContext,
        null,
        navigation,
        route,
        setIsLoading,
      );
    });
  };
  const onPressNextButton = () => {
    if (isValidate(nickname)) {
      userContext.user.nickname = nickname;
      navigation.navigate('MyData');
    }
  };
  const onChangeNickname = (newNickname: string) => {
    isValidate(newNickname);
    setNickname(clearNickname(newNickname));
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
  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <SafeAreaView style={styles.nicknameContainer}>
      <NavigationComponent
        onPressBackButton={onPressBackButton}
        onPressNextButton={onPressNextButton}
        style={styles.navigation}
      />
      <StepComponent total={3} actualStep={1} style={styles.step} />
      <TitleComponent text="Nickname" style={styles.title} />
      <SubtitleComponent
        text="¿Con que nombre quieres que te conozcan?"
        style={styles.subtitle}
      />
      <TextInputComponent
        value={nickname}
        placeholder="Nickname"
        style={styles.textInput}
        onChangeText={onChangeNickname}
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
