import * as React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface FloatButtonComponentProps {
  styles?: Record<string, string | number>;
  icon: ImageSourcePropType;
  onPress?: () => any;
}

const FloatButtonComponent = (props: FloatButtonComponentProps) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{...styles.floatButtonContainer, ...props.styles}}>
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
  },
  icon: {
    height: 24,
    width: 24,
  },
});
