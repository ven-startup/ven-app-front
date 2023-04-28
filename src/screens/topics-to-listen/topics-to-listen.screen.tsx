import {GraphQLQuery} from '@aws-amplify/api/lib-esm/types';
import {API} from 'aws-amplify';
import * as React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import ListOfElementsBlockComponent from '../../components/list-of-elements.block.component';
import NavigationComponent from '../../components/navigation.component';
import TimerComponent from '../../components/timer.component';
import {listTopicsQuery} from '../../graphql/topic/query.topic.graphql';
import {Operation} from '../../graphql/topic/types.topic.graphql';
import {RootState} from '../../store/store';
import {onCreateTopicSubscription} from '../../graphql/topic/subscriptions.topic.graphql';
import {User} from '../../store/slices/user.slice';

const TopicsToListenScreen = ({navigation}: any) => {
  const user = useSelector((state: RootState) => state.user.value);
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
        allTopics.push(...(topic?.topicsToTalk ?? []));
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
    navigation.goBack();
  };

  const removeElement = async (topic: string, index: number) => {
    console.info('Remove topic', topic);
    const newTopicsToListen = [...topicsToListen];
    newTopicsToListen.splice(index, 1);
    setTopicsToListen(newTopicsToListen);
    try {
      const response = await fetch('https://ven.mocklab.io/match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...user, topicsToListen: [topic]} as User),
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
        console.info('New Topics', value?.data?.onCreateTopic?.topicsToTalk);
        setTopicsToListen(currentTopicsToListen => {
          return removeRepeatTopic([
            ...value?.data?.onCreateTopic?.topicsToTalk,
            ...currentTopicsToListen,
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
  return (
    <SafeAreaView style={styles.topicsToListenContainer}>
      <NavigationComponent
        onPressBackButton={onPressBackButton}
        style={styles.navigation}
        title={'¿Qué quiero escuchar?'}
      />
      <TimerComponent style={styles.timer} />
      <ListOfElementsBlockComponent
        elements={topicsToListen}
        removeElement={removeElement}
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
