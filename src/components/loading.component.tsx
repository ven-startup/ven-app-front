import * as React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';

const LoadingComponent = () => {
  const app = useSelector((state: RootState) => state.app.value);
  return (
    app.isLoading && (
      <SafeAreaView style={styles.loadingContainer}>
        <View style={styles.activityContainer}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      </SafeAreaView>
    )
  );
};

export default LoadingComponent;

const styles = StyleSheet.create({
  loadingContainer: {position: 'absolute', width: '100%', height: '100%'},
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    opacity: 0.5,
  },
});
