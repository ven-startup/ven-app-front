import {GraphQLQuery} from '@aws-amplify/api';
import {API, Auth} from 'aws-amplify';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import ErrorComponent from '../../components/error.component';
import NavigationComponent from '../../components/navigation.component';
import StepComponent from '../../components/step.component';
import SubtitleComponent from '../../components/subtitle.component';
import TextInputComponent from '../../components/text-input.component';
import TitleComponent from '../../components/title.component';
import {updateUserMutation} from '../../graphql/user/mutations.user.graphql';
import {Operation} from '../../graphql/user/types.user.graphql';
import {validatedAuthenticated} from '../../security/authentication/authentication';
import {setApp} from '../../store/slices/app.slice';
import {setUser} from '../../store/slices/user.slice';
import {RootState} from '../../store/store';

const NicknameScreen = ({navigation, route}: any) => {
  const user = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch();
  const [nickname, setNickname] = React.useState(user.nickname as string);
  const [errorMessage, setErrorMessage] = React.useState('');
  const isUpdateFlow = route?.params?.isUpdateFlow;

  const onPressBackButton = async () => {
    if (isUpdateFlow) {
      if (user.nickname !== nickname && isValidate(nickname)) {
        try {
          dispatch(setApp({isLoading: true}));
          await API.graphql<GraphQLQuery<Operation>>(
            updateUserMutation({nickname}),
          );
          user.nickname = nickname;
          setNickname(nickname);
          dispatch(setUser(user));
        } catch (error) {
          console.error(error);
        } finally {
          dispatch(setApp({isLoading: false}));
        }
      }
      navigation.navigate('Home');
    } else {
      Auth.signOut().then(() => {
        validatedAuthenticated(dispatch, navigation, route);
      });
    }
  };
  const onPressNextButton = () => {
    if (isValidate(nickname)) {
      user.nickname = nickname;
      dispatch(setUser(user));
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
  return (
    <SafeAreaView style={styles.nicknameContainer}>
      <NavigationComponent
        onPressBackButton={onPressBackButton}
        onPressNextButton={isUpdateFlow ? null : onPressNextButton}
        style={styles.navigation}
      />
      {isUpdateFlow ? (
        <View style={styles.spaceVertical} />
      ) : (
        <StepComponent total={4} actualStep={1} style={styles.step} />
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
  spaceVertical: {
    height: 52,
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
