import * as React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {fonts} from '../themes/fonts.themes';

interface SubtitleComponentProps {
  text?: string;
  style?: Record<string, string | number>;
  icon?: ImageSourcePropType;
  onPress?: () => any;
}

const SubtitleComponent = (props: SubtitleComponentProps) => {
  return (
    <TouchableHighlight onPress={props.onPress}>
      <View style={styles.subtitleContainer}>
        <Text style={{...styles.subtitle, ...props.style}}>{props.text}</Text>
        {props.icon && <Image style={styles.icon} source={props.icon} />}
      </View>
    </TouchableHighlight>
  );
};

export default SubtitleComponent;

const styles = StyleSheet.create({
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  subtitle: {
    fontFamily: fonts.ArialRoundedMTBold,
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
  },
  icon: {
    width: 22,
    height: 22,
  },
});
