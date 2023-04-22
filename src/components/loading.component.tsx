import * as React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const LoadingComponent = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#000000" />
    </View>
  );
};

export default LoadingComponent;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
