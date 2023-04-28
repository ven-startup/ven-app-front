import * as React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import SummaryRoomComponent from './components/summary.room.component';

const RoomScreen = () => {
  const room = useSelector((state: RootState) => state.room.value);
  return (
    <SafeAreaView style={styles.roomContainer}>
      <SummaryRoomComponent room={room} onPress={() => {}} />
    </SafeAreaView>
  );
};

export default RoomScreen;

const styles = StyleSheet.create({
  roomContainer: {flex: 1, backgroundColor: 'white'},
});
