import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import SummaryRoomComponent from './components/summary.room.component';
import DetailRoomComponent from './components/detail.room.component';

const RoomScreen = () => {
  const [isShowDetail, setIsShowDetail] = React.useState(false);
  const room = useSelector((state: RootState) => state.room.value);
  const hideDetailInformation = () => {
    setIsShowDetail(false);
  };
  return (
    <SafeAreaView style={styles.roomContainer}>
      <View style={styles.summaryContainer}>
        <SummaryRoomComponent
          room={room}
          onPress={() => {
            setIsShowDetail(true);
          }}
        />
      </View>
      {isShowDetail && (
        <DetailRoomComponent
          room={room}
          onPressBackButton={hideDetailInformation}
        />
      )}
    </SafeAreaView>
  );
};

export default RoomScreen;

const styles = StyleSheet.create({
  roomContainer: {flex: 1, backgroundColor: 'white'},
  summaryContainer: {},
});
