import * as React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const TopicsToListenScreen = () => {
  return <SafeAreaView style={styles.topicsToListenContainer}></SafeAreaView>;
};

export default TopicsToListenScreen;

const styles = StyleSheet.create({
  topicsToListenContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
});
