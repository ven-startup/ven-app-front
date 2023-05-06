import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import InCallManager from 'react-native-incall-manager';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MediaStream, RTCView} from 'react-native-webrtc';
import {useDispatch, useSelector} from 'react-redux';
import callEnd from '../../../assets/images/call-end.png';
import microphone from '../../../assets/images/microphone.png';
import speaker from '../../../assets/images/speaker.png';
import FloatButtonComponent from '../../components/float-button.component';
import {setApp} from '../../store/slices/app.slice';
import {cleanRoom} from '../../store/slices/room.slice';
import {RootState} from '../../store/store';
import facadeWebRtc from '../../web-rtc/facade.web-rtc';
import DetailRoomComponent from './components/detail.room.component';
import SummaryRoomComponent from './components/summary.room.component';

const RoomScreen = ({navigation}: any) => {
  const room = useSelector((state: RootState) => state.room.value);
  const dispatch = useDispatch();
  const [isShowDetail, setIsShowDetail] = React.useState(false);
  const [isEnabledSpeaker, setIsEnabledSpeaker] = React.useState(true);
  const [isEnabledMicrophone, setIsEnabledMicrophone] = React.useState(true);
  const hideDetailInformation = () => {
    setIsShowDetail(false);
  };

  const backToHome = () => {
    dispatch(setApp({isLoading: false}));
    navigation.navigate('Home');
    setTimeout(() => {
      dispatch(setApp({isLoading: false}));
      dispatch(cleanRoom());
    }, 0);
  };

  // Configure Controll for call
  React.useEffect(() => {
    InCallManager.start({media: 'audio'});
    const timer = setTimeout(() => {
      InCallManager.setForceSpeakerphoneOn(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);
  return (
    <SafeAreaView style={styles.roomContainer}>
      <View style={styles.summaryContainer}>
        <SummaryRoomComponent
          room={room}
          onPress={() => {
            setIsShowDetail(true);
          }}
        />
        {room.webRTC.localMediaStream && (
          <RTCView
            mirror={true}
            objectFit={'cover'}
            streamURL={room.webRTC.localMediaStream.toURL()}
            zOrder={0}
          />
        )}
        <FloatButtonComponent
          styles={
            isEnabledSpeaker ? styles.speakerEnabled : styles.speakerDisabled
          }
          icon={speaker}
          onPress={() => {
            facadeWebRtc.toggleSpeaker(!isEnabledSpeaker);
            setIsEnabledSpeaker(!isEnabledSpeaker);
          }}
        />
        <FloatButtonComponent
          styles={styles.callEnd}
          icon={callEnd}
          onPress={() => {
            backToHome();
          }}
        />
        <FloatButtonComponent
          styles={
            isEnabledMicrophone
              ? styles.microphoneEnabled
              : styles.microphoneDisabled
          }
          icon={microphone}
          onPress={() => {
            setIsEnabledMicrophone(!isEnabledMicrophone);
            facadeWebRtc.toggleMicrophone(
              room.webRTC.localMediaStream as MediaStream,
            );
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
  callEnd: {
    backgroundColor: '#FF0000',
    position: 'absolute',
    bottom: 25,
    elevation: 5,
    alignSelf: 'center',
  },
  speakerEnabled: {
    backgroundColor: '#808080',
    opacity: 0.5,
    position: 'absolute',
    bottom: 25,
    left: 25,
    elevation: 5,
  },
  speakerDisabled: {
    backgroundColor: 'white',
    opacity: 0.5,
    borderWidth: 1,
    borderColor: 'black',
    position: 'absolute',
    bottom: 25,
    left: 25,
  },
  microphoneEnabled: {
    backgroundColor: 'white',
    opacity: 0.5,
    borderWidth: 1,
    borderColor: 'black',
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
  microphoneDisabled: {
    backgroundColor: '#808080',
    opacity: 0.5,
    position: 'absolute',
    bottom: 25,
    right: 25,
    elevation: 5,
  },
});
