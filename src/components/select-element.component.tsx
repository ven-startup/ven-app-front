import * as React from 'react';
import {Image, StyleSheet, TouchableHighlight, View} from 'react-native';

const SelectElementComponent = ({elements, onPress}: any) => {
  const [isSelected, setIsSelected] = React.useState(null);

  return (
    <View style={styles.selectElementContainer}>
      {elements.map((element: any, index: number) => (
        <TouchableHighlight
          key={element.id}
          onPress={() => {
            onPress(index);
            setIsSelected(element.id);
          }}
          style={
            isSelected === element.id
              ? styles.elementSelectedContainer
              : styles.elementContainer
          }>
          <Image
            key={element.id}
            source={element.image}
            style={styles.element}
          />
        </TouchableHighlight>
      ))}
    </View>
  );
};

export default SelectElementComponent;

const styles = StyleSheet.create({
  selectElementContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  elementContainer: {
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: '#707070',
    marginRight: 5,
    opacity: 0.5,
  },
  elementSelectedContainer: {
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: '#707070',
    marginRight: 5,
  },
  element: {
    width: 32,
    height: 32,
  },
});
