import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {UserContext} from '../../contexts/user.context';

const MyDataScreen = () => {
  const userContext = React.useContext(UserContext);
  console.log('userContext', userContext);
  return <View style={styles.myDataContainer} />;
};

export default MyDataScreen;

const styles = StyleSheet.create({
  myDataContainer: {
    flex: 1,
    backgroundColor: 'red',
  },
});
