import {API} from '@aws-amplify/api';
import {GraphQLQuery} from '@aws-amplify/api/lib-esm/types';
import {Auth} from 'aws-amplify';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import * as React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import edit from '../../../assets/images/edit.png';
import female from '../../../assets/images/female.png';
import male from '../../../assets/images/male.png';
import off from '../../../assets/images/off.png';
import ButtonComponent from '../../components/button.component';
import ListOfElementsComponent from '../../components/list-of-elements.component';
import SubtitleComponent from '../../components/subtitle.component';
import TextComponent from '../../components/text.component';
import {Gender} from '../../contexts/user.context';
import {createTopicMutation} from '../../graphql/topic/mutations.topic.graphql';
import {Operation} from '../../graphql/topic/types.topic.graphql';
import {setApp} from '../../store/slices/app.slice';
import {RootState} from '../../store/store';

const HomeScreen = ({navigation}: any) => {
  const user = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch();

  const validatedAvatarForGender = () => {
    return user.gender === Gender.MALE ? male : female;
  };
  const calculateYear = () => {
    dayjs.extend(customParseFormat);
    const birthday = dayjs(user.birthday, 'DD/MM/YYYY');
    const age = dayjs().diff(birthday, 'year');
    return age + ' años';
  };
  const registerTopicsToTalk = async () => {
    console.info('Register topics to talk');
    try {
      await API.graphql<GraphQLQuery<Operation>>(
        createTopicMutation({
          topicsToTalk: user.topicsToTalk ?? [],
        }),
      );
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setApp({isLoading: true}));
      navigation.navigate('TopicsToListen');
      setTimeout(() => {
        dispatch(setApp({isLoading: false}));
      }, 0);
    }
  };
  return (
    <SafeAreaView style={styles.homeContainer}>
      <View style={styles.offButtonContainer}>
        <TouchableOpacity
          onPress={() => {
            Auth.signOut();
          }}>
          <Image style={styles.offButton} source={off} />
        </TouchableOpacity>
      </View>
      <Image style={styles.avatar} source={validatedAvatarForGender()} />
      <SubtitleComponent
        style={styles.nickname}
        text={user.nickname}
        icon={edit}
        onPress={() => {
          navigation.navigate('Nickname', {isUpdateFlow: true});
        }}
      />
      <TextComponent style={styles.age} text={calculateYear()} />
      <View style={styles.topicsToTalkContainer}>
        <SubtitleComponent
          style={styles.topicsToTalkSubTitle}
          text={'Puedo hablar de ...'}
          icon={edit}
          onPress={() => {
            navigation.navigate('TopicsToTalk', {isUpdateFlow: true});
          }}
        />
      </View>
      <ListOfElementsComponent
        styles={{}}
        elements={user.topicsToTalk as string[]}
        prefix="#"
      />
      <ButtonComponent
        styles={styles.talkButton}
        text="Conversar"
        onPress={registerTopicsToTalk}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  offButtonContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  offButton: {
    width: 32,
    height: 32,
  },
  avatar: {
    marginBottom: 5,
  },
  nickname: {
    marginBottom: 1,
    textDecorationLine: 'underline',
  },
  age: {
    fontSize: 12,
    marginBottom: 25,
  },
  topicsToTalkContainer: {},
  topicsToTalkSubTitle: {
    textDecorationLine: 'underline',
  },
  talkButton: {},
});
