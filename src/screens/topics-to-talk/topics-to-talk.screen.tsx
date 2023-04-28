import {API} from '@aws-amplify/api';
import {GraphQLQuery} from '@aws-amplify/api/lib-esm/types';
import * as React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ErrorComponent from '../../components/error.component';
import ListOfElementsComponent from '../../components/list-of-elements.component';
import NavigationComponent from '../../components/navigation.component';
import StepComponent from '../../components/step.component';
import SubtitleComponent from '../../components/subtitle.component';
import TextInputComponent from '../../components/text-input.component';
import TitleComponent from '../../components/title.component';
import {
  createUserMutation,
  updateUserMutation,
} from '../../graphql/user/mutations.user.graphql';
import {Operation} from '../../graphql/user/types.user.graphql';
import {setApp} from '../../store/slices/app.slice';
import {setUser} from '../../store/slices/user.slice';
import {RootState} from '../../store/store';

const TopicsToTalkScreen = ({navigation, route}: any) => {
  const user = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch();

  const isUpdateFlow = route?.params?.isUpdateFlow;

  // declared for topic to talk
  const [topicToTalk, setTopicToTalk] = React.useState('');

  // declared for list of topic to talk
  const [listOfTopicToTalk, setListOfTopicToTalk] = React.useState<string[]>([
    ...(user.topicsToTalk as string[]),
  ]);

  const [errorMessage, setErrorMessage] = React.useState('');

  const onPressBackButton = async () => {
    if (isUpdateFlow) {
      if (
        user.topicsToTalk !== listOfTopicToTalk &&
        isValidateListOfTopicToTalk(listOfTopicToTalk)
      ) {
        try {
          dispatch(setApp({isLoading: true}));
          await API.graphql<GraphQLQuery<Operation>>(
            updateUserMutation({topicsToListen: listOfTopicToTalk}),
          );
          user.topicsToTalk = listOfTopicToTalk;
          setListOfTopicToTalk(listOfTopicToTalk);
          dispatch(setUser(user));
        } catch (error) {
          console.error(error);
        } finally {
          dispatch(setApp({isLoading: false}));
        }
      }
      navigation.navigate('Home');
    } else {
      navigation.navigate('MyData');
    }
  };
  const onPressNextButton = async () => {
    if (isValidateListOfTopicToTalk(listOfTopicToTalk)) {
      user.topicsToTalk = listOfTopicToTalk;
      dispatch(setUser(user));
      await createUser();
      navigation.navigate('Home');
    }
  };

  /// Functions for topic to talk
  const onChangeTopicToTalk = (newTopicToTalk: string) => {
    setTopicToTalk(clearTopicToTalk(newTopicToTalk));
  };
  const clearTopicToTalk = (newTopicToTalk: string): string => {
    let cleanNewTopicToTalk = newTopicToTalk;
    const alphanumericRegex = /[^a-zA-Z0-9]/g;
    if (
      cleanNewTopicToTalk !== '' &&
      alphanumericRegex.test(cleanNewTopicToTalk)
    ) {
      cleanNewTopicToTalk = cleanNewTopicToTalk.replace(alphanumericRegex, '');
    }
    if (cleanNewTopicToTalk.length > 20) {
      cleanNewTopicToTalk = cleanNewTopicToTalk.substring(0, 20);
    }
    return cleanNewTopicToTalk;
  };
  const addTopicToTalkToList = () => {
    if (
      topicToTalk !== '' &&
      !listOfTopicToTalk.some(
        topicToTalkRegister =>
          topicToTalkRegister.toLowerCase() === topicToTalk.toLowerCase(),
      )
    ) {
      const newListOfTopicToTalk = [...listOfTopicToTalk];
      newListOfTopicToTalk.push('#'.concat(topicToTalk));
      setListOfTopicToTalk(newListOfTopicToTalk);
      setTopicToTalk('');
    }
  };

  /// Functions for list for topics to talk
  const removeTopicToTalk = (indexOfListOfTopicToTalk: number) => {
    const newListOfTopicToTalk = [...listOfTopicToTalk];
    newListOfTopicToTalk.splice(indexOfListOfTopicToTalk, 1);
    setListOfTopicToTalk(newListOfTopicToTalk);
    return listOfTopicToTalk;
  };
  const isValidateListOfTopicToTalk = (newListOfTopicToTalk: string[]) => {
    const isValidated = true;
    setErrorMessage('');
    if (newListOfTopicToTalk.length === 0) {
      setErrorMessage(
        'Debes tener seleccionado al menos un tema para poder conversar!',
      );
      return false;
    }
    return isValidated;
  };

  // Persistence
  const createUser = async () => {
    try {
      dispatch(setApp({isLoading: true}));
      const response = await API.graphql<GraphQLQuery<Operation>>(
        createUserMutation({
          nickname: user.nickname as string,
          birthday: user.birthday as string,
          gender: user.gender as string,
          topicsToTalk: user.topicsToTalk as string[],
          topicsToListen: user.topicsToListen as string[],
        }),
      );
      dispatch(setUser({...response?.data?.createUser}));
      console.info(`User ${user.nickname} was registered correctly`);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setApp({isLoading: false}));
    }
  };
  return (
    <SafeAreaView style={styles.topicsToTalkContainer}>
      <NavigationComponent
        onPressBackButton={onPressBackButton}
        onPressNextButton={isUpdateFlow ? null : onPressNextButton}
        style={styles.navigation}
      />
      {isUpdateFlow ? (
        <View style={styles.spaceVertical} />
      ) : (
        <StepComponent total={3} actualStep={3} style={styles.step} />
      )}
      <TitleComponent text="¿De que puedo hablar?" style={styles.title} />
      <SubtitleComponent
        text="Un nuevo amigo espera con ansias poder escucharte!"
        style={styles.subtitle}
      />
      <ListOfElementsComponent
        styles={{}}
        elements={listOfTopicToTalk}
        removeElement={removeTopicToTalk}
      />
      <TextInputComponent
        value={topicToTalk}
        placeholder="Puedo Hablar de ..."
        style={styles.textInput}
        onChangeText={onChangeTopicToTalk}
        onSubmitEditing={addTopicToTalkToList}
      />
      <ErrorComponent text={errorMessage} />
    </SafeAreaView>
  );
};

export default TopicsToTalkScreen;

const styles = StyleSheet.create({
  topicsToTalkContainer: {
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
