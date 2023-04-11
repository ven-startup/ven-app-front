import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {fonts} from '../themes/fonts.themes';

const SubtitleComponent = ({text, style}: any) => {
  return (
    <View style={styles.subtitleContainer}>
      <Text style={{...styles.subtitle, ...style}}>{text}</Text>
    </View>
  );
};

export default SubtitleComponent;

const styles = StyleSheet.create({
  subtitleContainer: {
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  subtitle: {
    fontFamily: fonts.ArialRoundedMT,
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
  },
});
