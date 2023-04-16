import * as React from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

const TextInputComponent = ({
  value,
  placeholder,
  style,
  editable,
  image,
  onPressIn,
  onChangeText,
}: any) => {
  return (
    <TouchableOpacity onPress={onPressIn}>
      <View style={styles.textFieldContainer}>
        <TextInput
          value={value}
          style={{...styles.textField, ...style}}
          placeholder={placeholder}
          placeholderTextColor="rgba(0, 0, 0, 0.6)"
          editable={editable}
          onFocus={onPressIn}
          onChangeText={onChangeText}
        />
        {image && (
          <View style={styles.imageContainer}>
            <Image source={image} style={styles.image} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default TextInputComponent;

const styles = StyleSheet.create({
  textFieldContainer: {
    backgroundColor: 'white',
  },
  textField: {
    width: '100%',
    height: 56,
    fontSize: 18,
    paddingHorizontal: 16.5,
    backgroundColor: 'white',
    color: 'black',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'rgba(0, 0, 0, 0.6)',
  },
  imageContainer: {
    position: 'absolute',
    right: 21,
    top: 17,
    opacity: 0.5,
  },
  image: {
    width: 24,
    height: 24,
  },
});
