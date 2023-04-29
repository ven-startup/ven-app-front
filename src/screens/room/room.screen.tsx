import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import callEnd from '../../../assets/images/call-end.png';
import FloatButtonComponent from '../../components/float-button.component';
import {RootState} from '../../store/store';
import DetailRoomComponent from './components/detail.room.component';
import SummaryRoomComponent from './components/summary.room.component';

const RoomScreen = ({navigation}: any) => {
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
        <FloatButtonComponent
          icon={callEnd}
          onPress={() => {
            navigation.navigate('Home');
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
  summaryContainer: {flex: 1, backgroundColor: 'white'},
});
