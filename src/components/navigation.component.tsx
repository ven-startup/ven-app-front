import * as React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import arrowLeft from '../../assets/images/arrow-left.png';
import arrowRigth from '../../assets/images/arrow-right.png';

const NavigationComponent = ({
  onPressBackButton,
  onPressNextButton,
  style,
  title,
}: any) => {
  return (
    <View style={styles.navigationContainer}>
      {onPressBackButton && (
        <TouchableOpacity onPress={onPressBackButton}>
          <Image source={arrowLeft} style={{...styles.arrowButton, ...style}} />
        </TouchableOpacity>
      )}
      {title && <Text style={styles.title}>{title}</Text>}
      {onPressNextButton && (
        <TouchableOpacity onPress={onPressNextButton}>
          <Image
            source={arrowRigth}
            style={{...styles.arrowButton, ...style}}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default NavigationComponent;

const styles = StyleSheet.create({
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  arrowButton: {width: 24, height: 24},
  title: {
    textAlign: 'center',
    width: '80%',
    position: 'absolute',
    left: '10%',
    color: 'black',
    fontSize: 18,
  },
});
