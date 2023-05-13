import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface DialogComponentProps {
  styles?: Record<string, string | number>;
  message: string;
  cancelAction?: () => void;
  acceptAction?: () => void;
}

const DialogComponent = (props: DialogComponentProps) => {
  return (
    <TouchableOpacity
      style={{...styles.dialogContainer, ...props.styles}}
      onPress={props.cancelAction}>
      <View style={styles.messageContainer}>
        <Text style={styles.message}>{props.message}</Text>
        {props.acceptAction && (
          <TouchableOpacity onPress={props.acceptAction}>
            <Text style={styles.acceptButton}>ACEPTAR</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default DialogComponent;

const styles = StyleSheet.create({
  dialogContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#747474',
  },
  messageContainer: {
    backgroundColor: 'white',
    margin: 40,
    padding: 24,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
  },
  message: {color: 'black'},
  acceptButton: {
    marginTop: 20,
    textAlign: 'center',
    color: '#FF2424',
  },
});
