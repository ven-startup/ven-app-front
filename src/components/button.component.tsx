import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface ButtonComponentProps {
  styles?: Record<string, string | number>;
  text: string;
  onPress?: () => any;
}

const ButtonComponent = (props: ButtonComponentProps) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.buttonContainer}>
      <Text style={{...styles.text, ...props.styles}}>{props.text}</Text>
    </TouchableOpacity>
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
