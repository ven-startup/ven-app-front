import * as React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fonts} from '../../themes/fonts.themes';
import facebook from './../../../assets/images/facebook.png';
import google from './../../../assets/images/google.png';

const LoginScreen = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Just Talk</Text>
        <Text style={styles.subtitle}>
          Conversa al instante con personas que quieren escucharte!
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Nickname')}>
          <Image source={google} style={styles.googleButton} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Nickname')}>
          <Image source={facebook} style={styles.facebookButton} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.ArialRoundedMT,
    color: 'black',
    fontSize: 50,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.ArialRoundedMT,
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButton: {
    height: 64,
    width: 64,
    marginRight: 25,
  },
  facebookButton: {
    height: 64,
    width: 64,
  },
});
