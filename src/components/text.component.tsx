import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {fonts} from '../themes/fonts.themes';

const TextComponent = ({text, style}: any) => {
  return (
    <View style={styles.textContainer}>
      <Text style={{...styles.text, ...style}}>{text}</Text>
    </View>
  );
};

export default TextComponent;

const styles = StyleSheet.create({
  textContainer: {
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontFamily: fonts.ArialRoundedMT,
    fontSize: 16,
    textAlign: 'left',
    color: 'black',
  },
});
