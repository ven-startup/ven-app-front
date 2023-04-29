import * as React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface FloatButtonComponentProps {
  styles?: StyleProp<ViewStyle>;
  icon: ImageSourcePropType;
  onPress?: () => any;
}

const FloatButtonComponent = (props: FloatButtonComponentProps) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.floatButtonContainer}>
      <Image source={props.icon} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default FloatButtonComponent;

const styles = StyleSheet.create({
  floatButtonContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF0000',
    position: 'absolute',
    bottom: 10,
    elevation: 5,
    alignSelf: 'center',
  },
  icon: {
    height: 24,
    width: 24,
  },
});
