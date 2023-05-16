import {API} from '@aws-amplify/api';
import {GraphQLQuery} from '@aws-amplify/api/lib-esm/types';
import {Auth} from 'aws-amplify';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import * as React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import edit from '../../../assets/images/edit.png';
import off from '../../../assets/images/off.png';
import ButtonComponent from '../../components/button.component';
import DialogComponent from '../../components/dialog.component';
import ListOfElementsComponent from '../../components/list-of-elements.component';
import SubtitleComponent from '../../components/subtitle.component';
import TextComponent from '../../components/text.component';
import {createTopicMutation} from '../../graphql/topic/mutations.topic.graphql';
import {Operation} from '../../graphql/topic/types.topic.graphql';
import {setApp} from '../../store/slices/app.slice';
import {RootState} from '../../store/store';
import avatarUtil from '../../utils/avatar.util';

const HomeScreen = ({navigation}: any) => {
  const user = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch();

  const [uriAvatar, setUriAvatar] = React.useState<string>(
    avatarUtil.generateAvatarImageUrlWithPreventCache(user.user as string),
  );

  // declared for dialog
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

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
  // Functions for dialog
  const createDialog = () => {
    const allowDateForUpdate = dayjs(
      new Date(user.personalInformationUpdateDate as string),
    ).add(6, 'month');
    const allowDateForUpdateWithFormat =
      allowDateForUpdate.format('DD/MM/YYYY');
    return `No podrás actualizar tus datos personales hasta el día ${allowDateForUpdateWithFormat}`;
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
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Avatar', {
            isUpdateFlow: true,
            setUriAvatar,
          });
        }}>
        <FastImage
          style={styles.avatar}
          source={{
            uri: uriAvatar,
            priority: FastImage.priority.high,
            cache: FastImage.cacheControl.immutable,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>
      <SubtitleComponent
        style={styles.nickname}
        text={user.nickname}
        icon={edit}
        onPress={() => {
          navigation.navigate('Nickname', {isUpdateFlow: true});
        }}
      />
      <TouchableOpacity
        onPress={() => {
          if (
            dayjs(new Date(user.personalInformationUpdateDate as string))
              .add(6, 'month')
              .isBefore(dayjs())
          ) {
            navigation.navigate('MyData', {
              isUpdateFlow: true,
            });
          } else {
            setIsDialogOpen(true);
          }
        }}>
        <TextComponent style={styles.age} text={calculateYear()} />
      </TouchableOpacity>
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
      {isDialogOpen && (
        <DialogComponent
          cancelAction={() => {
            setIsDialogOpen(false);
          }}
          acceptAction={async () => {
            setIsDialogOpen(false);
          }}
          message={createDialog()}
        />
      )}
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
    height: 100,
    width: 100,
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
