import {GraphQLQuery} from '@aws-amplify/api';
import {API} from 'aws-amplify';
import * as React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import SubtitleComponent from '../../components/subtitle.component';
import TextComponent from '../../components/text.component';
import {
  closeRoomMutation,
  createRoomMutation,
} from '../../graphql/room/mutations.room.graphql';
import {onCreateRoomSubscription} from '../../graphql/room/subscriptions.room.graphql';
import {Operation} from '../../graphql/room/types.room.graphql';
import {setApp} from '../../store/slices/app.slice';
import {Order, cleanRoom} from '../../store/slices/room.slice';
import {RootState} from '../../store/store';
import facadeWebRtc from '../../web-rtc/facade.web-rtc';

const WaitingRoomScreen = ({navigation, route}: any) => {
  const user = useSelector((state: RootState) => state.user.value);
  const room = useSelector((state: RootState) => state.room.value);
  const [messages] = React.useState([
    'Disfruta de la conversación y diviértete siendo tú mismo/a.',
    'Sé auténtico/a y habla con sinceridad.',
    'Escucha activamente y muestra interés en lo que la otra persona tiene que decir.',
    'Habla con respeto y consideración hacia la otra persona.',
    'Mantén una actitud abierta y dispuesta a aprender de la otra persona.',
  ]);
  const [message, setMessage] = React.useState(messages[0]);

  const iceCandidates: string[] = [];
  const dispatch = useDispatch();

  const backToHome = async () => {
    try {
      dispatch(setApp({isLoading: true}));
      await API.graphql<GraphQLQuery<Operation>>(closeRoomMutation());
    } catch (error) {
      console.error(error);
    } finally {
      navigation.navigate('Home');
      setTimeout(() => {
        dispatch(setApp({isLoading: false}));
        dispatch(cleanRoom());
      }, 0);
    }
  };

  // Configure WebRTC events
  React.useEffect(() => {
    room.webRTC.rtcPeerConnection.addEventListener(
      'negotiationneeded',
      event => {
        console.info('Web RTC negotiationneeded', event);
        if (
          room.order === Order.FIRST_USER &&
          !room.webRTC.rtcPeerConnection.localDescription &&
          !room.webRTC.rtcPeerConnection.remoteDescription
        ) {
          facadeWebRtc
            .createOfferDescriptionForPeerConnection(
              room.webRTC.rtcPeerConnection,
            )
            .then(() => {
              room.webRTC.offerDescription = JSON.stringify(
                room.webRTC.rtcPeerConnection.localDescription,
              );
              API.graphql<GraphQLQuery<Operation>>(
                createRoomMutation({
                  user: room?.friend?.user as string,
                  order: Order.SECOND_USER,
                  friend: {
                    user: user.user as string,
                    nickname: user.nickname as string,
                    birthday: user.birthday as string,
                    gender: user.gender as string,
                    topicsToTalk: user.topicsToTalk as string[],
                    topicsToListen: user.topicsToListen as string[],
                    offer: room.webRTC.offerDescription,
                  },
                }),
              )
                .then(() => {
                  console.info(
                    'Web RTC negotiationneeded offer successfully sent to friend',
                  );
                })
                .catch(error => {
                  console.error(error);
                });
            })
            .catch(error => {
              console.error(error);
            });
        }
        if (
          room.order === Order.SECOND_USER &&
          !room.webRTC.rtcPeerConnection.localDescription &&
          !room.webRTC.rtcPeerConnection.remoteDescription
        ) {
          facadeWebRtc
            .createLocalAnswerDescriptionForPeerConnection(
              room.webRTC.rtcPeerConnection,
              room?.webRTC?.offerDescription,
            )
            .then(() => {
              room.webRTC.answerDescription = JSON.stringify(
                room.webRTC.rtcPeerConnection.localDescription,
              );
              API.graphql<GraphQLQuery<Operation>>(
                createRoomMutation({
                  user: room?.friend?.user as string,
                  order: Order.FIRST_USER,
                  friend: {
                    user: user.user as string,
                    nickname: user.nickname as string,
                    birthday: user.birthday as string,
                    gender: user.gender as string,
                    topicsToTalk: user.topicsToTalk as string[],
                    topicsToListen: user.topicsToListen as string[],
                    answer: room.webRTC.answerDescription,
                  },
                }),
              )
                .then(() => {
                  console.info(
                    'Web RTC negotiationneeded answer successfully sent to friend',
                  );
                })
                .catch(error => {
                  console.error(error);
                });
            })
            .catch(error => {
              console.error(error);
            });
        }
      },
    );
    room.webRTC.rtcPeerConnection.addEventListener(
      'icecandidate',
      (event: any) => {
        console.info('Web RTC icecandidate');
        if (!event?.candidate) {
          API.graphql<GraphQLQuery<Operation>>(
            createRoomMutation({
              user: room?.friend?.user as string,
              order:
                room?.order === Order.FIRST_USER
                  ? Order.SECOND_USER
                  : Order.FIRST_USER,
              friend: {
                user: user.user as string,
                nickname: user.nickname as string,
                birthday: user.birthday as string,
                gender: user.gender as string,
                topicsToTalk: user.topicsToTalk as string[],
                topicsToListen: user.topicsToListen as string[],
                iceCandidates: iceCandidates,
              },
            }),
          )
            .then(() => {
              console.info('Web RTC icecandidate successfully sent to friend');
            })
            .catch(error => {
              console.error(error);
            });
          return;
        }
        iceCandidates.push(JSON.stringify(event.candidate));
      },
    );
    room.webRTC.rtcPeerConnection.addEventListener('track', (event: any) => {
      console.info('Web RTC track');
      room.webRTC.remoteMediaStream.addTrack(event.track);
    });
    room.webRTC.rtcPeerConnection.addEventListener(
      'iceconnectionstatechange',
      () => {
        console.info(
          'Web RTC iceconnectionstatechange',
          room.webRTC.rtcPeerConnection.iceConnectionState,
        );
        switch (room.webRTC.rtcPeerConnection.iceConnectionState) {
          case 'connected':
            console.info('Web RTC iceconnectionstatechange');
            if (route.name !== 'Room') {
              dispatch(setApp({isLoading: true}));
              navigation.navigate('Room');
              setTimeout(() => {
                dispatch(setApp({isLoading: false}));
              }, 0);
            }
            break;
          case 'disconnected':
            backToHome();
            break;
        }
      },
    );
  }, []);

  // Subscribe onCreateRoomSubscription for configure Web RTC
  React.useEffect(() => {
    const subscription = API.graphql<GraphQLQuery<Operation>>(
      onCreateRoomSubscription(),
    ).subscribe({
      next: ({value}: any) => {
        console.info(
          'Update Communication For Room',
          value?.data?.onCreateRoom,
        );
        if (
          room.order === Order.SECOND_USER &&
          value?.data?.onCreateRoom?.friend?.offer &&
          !room.webRTC.rtcPeerConnection.localDescription &&
          !room.webRTC.rtcPeerConnection.remoteDescription
        ) {
          room.webRTC.offerDescription =
            value?.data?.onCreateRoom?.friend?.offer;
          facadeWebRtc
            .createLocalMediaStream()
            .then(mediaStream => {
              room.webRTC.localMediaStream = mediaStream;
              facadeWebRtc.addLocalMediaStreamToPeerConnection(
                room.webRTC.rtcPeerConnection,
                mediaStream,
              );
            })
            .catch(error => console.error(error));
        } else if (
          room.order === Order.FIRST_USER &&
          value?.data?.onCreateRoom?.friend?.answer &&
          room.webRTC.rtcPeerConnection.localDescription &&
          !room.webRTC.rtcPeerConnection.remoteDescription
        ) {
          facadeWebRtc
            .registerRemoteAnswerDescriptionForPeerConnection(
              room.webRTC.rtcPeerConnection,
              value?.data?.onCreateRoom?.friend?.answer,
            )
            .catch(error => {
              console.error(error);
            });
        } else if (
          value?.data?.onCreateRoom?.friend?.iceCandidates &&
          room.webRTC.rtcPeerConnection.localDescription &&
          room.webRTC.rtcPeerConnection.remoteDescription
        ) {
          facadeWebRtc.processCandidates(
            room.webRTC.rtcPeerConnection,
            value?.data?.onCreateRoom?.friend?.iceCandidates,
          );
        }
      },
      error: (error: any) => {
        console.error(error);
      },
    });
    return () => {
      console.info('Init process of unsubscribe onCreateRoomSubscription');
      return subscription.unsubscribe();
    };
  }, []);

  // Messages dynamics
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(messages[Math.floor(Math.random() * 5)]);
    }, 3000);
    return () => clearTimeout(timer);
  }, [message, messages]);

  // Start Web RTC change comunication
  React.useEffect(() => {
    const timer = setTimeout(() => {
      startWebRTC();
    }, 15000);

    const startWebRTC = () => {
      if (
        room.order === Order.FIRST_USER &&
        !room.webRTC.rtcPeerConnection.localDescription &&
        !room.webRTC.rtcPeerConnection.remoteDescription
      ) {
        facadeWebRtc
          .createLocalMediaStream()
          .then(mediaStream => {
            room.webRTC.localMediaStream = mediaStream;
            facadeWebRtc.addLocalMediaStreamToPeerConnection(
              room.webRTC.rtcPeerConnection,
              mediaStream,
            );
          })
          .catch(error => console.error(error));
      }
    };

    return () => clearTimeout(timer);
  }, []);
  return (
    <SafeAreaView style={styles.waitingRoomContainer}>
      <ActivityIndicator
        style={styles.activityIndicator}
        size="large"
        color="#000000"
      />
      <TextComponent style={styles.text} text="Conectando con tu talker..." />
      <SubtitleComponent text={message} />
    </SafeAreaView>
  );
};

export default WaitingRoomScreen;

const styles = StyleSheet.create({
  waitingRoomContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  activityIndicator: {
    marginBottom: 5,
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
    marginBottom: 21,
  },
});
