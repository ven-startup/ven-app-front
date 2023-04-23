import {GraphQLQuery} from '@aws-amplify/api';
import {API, Auth} from 'aws-amplify';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ErrorComponent from '../../components/error.component';
import LoadingComponent from '../../components/loading.component';
import NavigationComponent from '../../components/navigation.component';
import StepComponent from '../../components/step.component';
import SubtitleComponent from '../../components/subtitle.component';
import TextInputComponent from '../../components/text-input.component';
import TitleComponent from '../../components/title.component';
import {UserContext} from '../../contexts/user.context';
import {updateUserMutation} from '../../graphql/user/mutations.user.graphql';
import {Operation} from '../../graphql/user/types.user.graphql';
import {validatedAuthenticated} from '../../security/authentication/authentication';

const NicknameScreen = ({navigation, route}: any) => {
  const userContext = React.useContext(UserContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [nickname, setNickname] = React.useState(
    userContext.user.nickname as string,
  );
  const [errorMessage, setErrorMessage] = React.useState('');
  const isUpdateFlow = route?.params?.isUpdateFlow;

  const onPressBackButton = async () => {
    if (isUpdateFlow) {
      if (userContext.user.nickname !== nickname && isValidate(nickname)) {
        await API.graphql<GraphQLQuery<Operation>>(
          updateUserMutation({nickname}),
        );
        userContext.user.nickname = nickname;
        setNickname(nickname);
      }
      navigation.navigate('Home');
    } else {
      Auth.signOut().then(() => {
        validatedAuthenticated(
          userContext,
          null,
          navigation,
          route,
          setIsLoading,
        );
      });
    }
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
        onPressNextButton={isUpdateFlow ? null : onPressNextButton}
        style={styles.navigation}
      />
      {isUpdateFlow ? (
        <View style={{height: 52}} />
      ) : (
        <StepComponent total={3} actualStep={1} style={styles.step} />
      )}
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
