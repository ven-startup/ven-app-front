import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import ListOfElementsComponent from '../../../components/list-of-elements.component';
import NavigationComponent from '../../../components/navigation.component';
import SubtitleComponent from '../../../components/subtitle.component';
import TextComponent from '../../../components/text.component';
import {Room} from '../../../store/slices/room.slice';
import {URL_AVATAR_IMAGE} from '../../../utils/constants.util';

interface DetailRoomComponentProps {
  style?: {};
  room: Room;
  onPressBackButton?: () => void;
}

const DetailRoomComponent = (props: DetailRoomComponentProps) => {
  const calculateYear = () => {
    dayjs.extend(customParseFormat);
    const birthday = dayjs(props?.room?.friend?.birthday, 'DD/MM/YYYY');
    const age = dayjs().diff(birthday, 'year');
    return age + ' años';
  };
  return (
    <View style={styles.shellContainer}>
      <View style={styles.detailContainer}>
        <NavigationComponent
          style={styles.navigation}
          onPressBackButton={props.onPressBackButton}
        />
        <FastImage
          style={styles.avatar}
          source={{
            uri: `${URL_AVATAR_IMAGE}${props?.room?.friend?.user}.png`,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <SubtitleComponent
          style={styles.nickname}
          text={props?.room?.friend?.nickname}
        />
        <TextComponent style={styles.age} text={calculateYear()} />
        <View style={styles.topicsToTalkContainer}>
          <SubtitleComponent
            style={styles.topicsToTalkSubTitle}
            text={'Puedo hablar de ...'}
          />
        </View>
        <ListOfElementsComponent
          styles={{}}
          elements={props?.room?.friend?.topicsToTalk as string[]}
          prefix="#"
        />
      </View>
    </View>
  );
};

export default DetailRoomComponent;

const styles = StyleSheet.create({
  shellContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    padding: 10,
  },
  detailContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  navigation: {marginBottom: 25},
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
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 5,
  },
  nickname: {
    marginBottom: 1,
  },
  age: {
    fontSize: 12,
    marginBottom: 25,
    textAlign: 'center',
  },
  topicsToTalkContainer: {},
  topicsToTalkSubTitle: {
    marginBottom: 25,
  },
  talkButton: {},
});
