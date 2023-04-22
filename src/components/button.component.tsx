import * as React from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';

interface ButtonComponentProps {
  styles?: Record<string, string | number>;
  onPress?: () => any;
}

const ButtonComponent = (props: ButtonComponentProps) => {
  return (
    <TouchableHighlight onPress={props.onPress}>
      <View style={styles.buttonContainer}>
        <Text style={{...styles.text, ...props.styles}}>Conversar</Text>
      </View>
    </TouchableHighlight>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'white',
  },
  text: {
    paddingHorizontal: 50,
    paddingVertical: 20,
    color: 'black',
    fontSize: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#707070',
  },
});
