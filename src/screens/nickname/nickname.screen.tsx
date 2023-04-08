import {Auth} from 'aws-amplify';
import * as React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const NicknameScreen = () => {
  return (
    <View>
      <Button title="Sign Out" onPress={() => Auth.signOut()} />
      <Text style={styles.title}>NicknameScreen</Text>
    </View>
  );
};

export default NicknameScreen;

const styles = StyleSheet.create({
  title: {
    color: 'black',
  },
});
