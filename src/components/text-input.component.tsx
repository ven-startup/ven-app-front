import * as React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

const TextInputComponent = ({value, changeValue, placeholder, style}: any) => {
  return (
    <View style={styles.textFieldContainer}>
      <TextInput
        value={value}
        style={{...styles.textField, ...style}}
        placeholder={placeholder}
        placeholderTextColor="rgba(0, 0, 0, 0.6)"
        onChangeText={changeValue}
      />
    </View>
  );
};

export default TextInputComponent;

const styles = StyleSheet.create({
  textFieldContainer: {
    backgroundColor: 'white',
  },
  textField: {
    height: 56,
    fontSize: 18,
    marginHorizontal: 16,
    paddingHorizontal: 16.5,
    backgroundColor: 'white',
    color: 'black',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'rgba(0, 0, 0, 0.6)',
  },
});
