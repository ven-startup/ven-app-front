import {GraphQLQuery} from '@aws-amplify/api/lib-esm/types';
import {API} from 'aws-amplify';
import dayjs from 'dayjs';
import * as React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ListOfElementsBlockComponent from '../../components/list-of-elements.block.component';
import NavigationComponent from '../../components/navigation.component';
import TimerComponent from '../../components/timer.component';
import {onCreateRoomSubscription} from '../../graphql/room/subscriptions.room.graphql';
import {listTopicsQuery} from '../../graphql/topic/query.topic.graphql';
import {onCreateTopicSubscription} from '../../graphql/topic/subscriptions.topic.graphql';
import {Operation} from '../../graphql/topic/types.topic.graphql';
import {setApp} from '../../store/slices/app.slice';
import {setRoom} from '../../store/slices/room.slice';
import {User} from '../../store/slices/user.slice';
import {RootState} from '../../store/store';
import {API_MATCH} from '../../utils/constants.util';
import ven from './../../../assets/images/ven.png';

const TopicsToListenScreen = ({navigation}: any) => {
  const user = useSelector((state: RootState) => state.user.value);
  const room = useSelector((state: RootState) => state.room.value);
  const dispatch = useDispatch();
  const [topicsToListen, setTopicsToListen] = React.useState<string[]>([]);

  const getTopicsToListen = async () => {
    console.info('Load All Topics for Test App');
    try {
      const topics = await API.graphql<GraphQLQuery<Operation>>(
        listTopicsQuery({
          updatedAt: new Date().toISOString(),
        }),
      );
      const allTopics: string[] = [];
      topics?.data?.listTopics?.forEach(topic => {
        const minimunDate = dayjs().subtract(1, 'minute');
        if (minimunDate.isBefore(dayjs(new Date(topic.updatedAt as string)))) {
          allTopics.push(...(topic?.topicsToTalk ?? []));
        }
      });
      setTopicsToListen(removeRepeatTopic(allTopics));
    } catch (error) {
      console.error(error);
    }
  };
  const removeRepeatTopic = (topics: string[]) => {
    const newTopics: string[] = [];
    topics.forEach(topic => {
      if (newTopics.indexOf(topic) === -1) {
        newTopics.push(topic);
      }
    });
    return newTopics;
  };
  const onPressBackButton = () => {
    dispatch(setApp({isLoading: true}));
    navigation.navigate('Home');
    setTimeout(() => {
      dispatch(setApp({isLoading: false}));
    }, 0);
  };

  const removeElement = async (topic: string, index: number) => {
    console.info('Remove topic', topic);
    const newTopicsToListen = [...topicsToListen];
    newTopicsToListen.splice(index, 1);
    setTopicsToListen(newTopicsToListen);
    try {
      const response = await fetch(API_MATCH as string, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...user,
          topicsToListen: [topic],
        } as User),
      });
      console.info('Response for Match API', await response.json());
    } catch (error) {
      console.error(error);
    }
  };

  // List Topics
  React.useEffect(() => {
    getTopicsToListen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Subscribe onCreateTopicSubscription
  React.useEffect(() => {
    const subscription = API.graphql<GraphQLQuery<Operation>>(
      onCreateTopicSubscription(),
    ).subscribe({
      next: ({value}: any) => {
        console.info(
          'New Topic to Listen',
          value?.data?.onCreateTopic?.topicsToTalk,
        );
        setTopicsToListen(currentTopicsToListen => {
          return removeRepeatTopic([
            ...currentTopicsToListen,
            ...value?.data?.onCreateTopic?.topicsToTalk,
          ]);
        });
      },
      error: () =>
        setTopicsToListen(currentTopicsToListen => [...currentTopicsToListen]),
    });
    return () => {
      console.info('Init process of unsubscribe onCreateTopicSubscription');
      return subscription.unsubscribe();
    };
  }, []);

  // Subscribe onCreateRoomSubscription
  React.useEffect(() => {
    const subscription = API.graphql<GraphQLQuery<Operation>>(
      onCreateRoomSubscription(),
    ).subscribe({
      next: ({value}: any) => {
        console.info('New Match', value?.data?.onCreateRoom);
        dispatch(setApp({isLoading: true}));
        dispatch(
          setRoom({
            ...room,
            user: value?.data?.onCreateRoom?.user,
            friend: value?.data?.onCreateRoom?.friend,
            order: value?.data?.onCreateRoom?.order,
          }),
        );
        subscription.unsubscribe();
        navigation.navigate('WaitingRoom');
        setTimeout(() => {
          dispatch(setApp({isLoading: false}));
        }, 0);
      },
      error: (error: any) => {
        dispatch(setApp({isLoading: false}));
        console.error(error);
      },
    });
    return () => {
      console.info('Init process of unsubscribe onCreateRoomSubscription');
      return subscription.unsubscribe();
    };
  }, []);
  return (
    <SafeAreaView style={styles.topicsToListenContainer}>
      <NavigationComponent
        onPressBackButton={onPressBackButton}
        style={styles.navigation}
        title={'Quiero escuchar sobre ...'}
      />
      <TimerComponent style={styles.timer} />
      <ListOfElementsBlockComponent
        elements={topicsToListen}
        prefix="#"
        removeElement={removeElement}
        iconForAnimationToRemoveElement={ven}
      />
    </SafeAreaView>
  );
};

export default TopicsToListenScreen;

const styles = StyleSheet.create({
  topicsToListenContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  navigation: {
    marginBottom: 12,
  },
  timer: {
    marginBottom: 12,
  },
});
