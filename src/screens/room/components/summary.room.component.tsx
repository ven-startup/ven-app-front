import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import * as React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import TextComponent from '../../../components/text.component';
import {Room} from '../../../store/slices/room.slice';

interface SummaryRoomComponentProps {
  room: Room;
  onPress?: () => void;
}

const SummaryRoomComponent = (props: SummaryRoomComponentProps) => {
  const calculateYear = () => {
    dayjs.extend(customParseFormat);
    const birthday = dayjs(props?.room?.friend?.birthday, 'DD/MM/YYYY');
    const age = dayjs().diff(birthday, 'year');
    return age + ' años';
  };
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.summaryContainer}>
        <View style={styles.friendPersonalDataContainer}>
          <TextComponent
            text={props.room.friend?.nickname}
            style={styles.nickname}
          />
          <TextComponent text={calculateYear()} style={styles.age} />
        </View>
        <View style={styles.topicsToTalkContainer}>
          <TextComponent
            text={props.room.friend?.topicsToTalk
              ?.map(topicToTalk => '#' + topicToTalk)
              ?.join(' ')}
            style={styles.topicsToTalk}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SummaryRoomComponent;

const styles = StyleSheet.create({
  summaryContainer: {
    flexDirection: 'row',
    paddingBottom: 5,
    shadowColor: 'red',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    borderBottomWidth: 0.3,
    overflow: 'hidden',
  },
  friendPersonalDataContainer: {
    width: '40%',
    padding: 10,
  },
  nickname: {
    fontSize: 20,
  },
  age: {fontSize: 10},
  topicsToTalk: {fontSize: 15},
  topicsToTalkContainer: {
    width: '60%',
    padding: 10,
    paddingLeft: 0,
  },
});
