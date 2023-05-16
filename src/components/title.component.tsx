import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {fonts} from '../themes/fonts.themes';

const TitleComponent = ({text, style}: any) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={{...styles.title, ...style}}>{text}</Text>
    </View>
  );
};

export default TitleComponent;

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: 'white',
  },
  title: {
    fontFamily: fonts.ArialRoundedMTBold,
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
  },
});
