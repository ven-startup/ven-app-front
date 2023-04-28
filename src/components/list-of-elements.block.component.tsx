import * as React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface ListOfElementsBlockComponentProps {
  styles?: Record<string, string | number>;
  elements: string[];
  prefix?: string;
  removeElement?: (element: string, index: number) => void;
}

const ListOfElementsBlockComponent = (
  props: ListOfElementsBlockComponentProps,
) => {
  return (
    <ScrollView>
      <View style={{...styles.ListOfElementsBlockContainer, ...props.styles}}>
        {props.elements.map((element: string, index: number) => {
          return (
            <TouchableOpacity
              activeOpacity={0.5}
              key={element}
              onPress={() => {
                props.removeElement && props.removeElement(element, index);
              }}>
              <View key={element} style={styles.elementContainer}>
                <Text key={element} style={styles.text}>
                  {(props.prefix ?? '') + element}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default ListOfElementsBlockComponent;

const styles = StyleSheet.create({
  ListOfElementsBlockContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  elementContainer: {
    width: '100%',
    paddingVertical: 21,
    paddingHorizontal: 21,
    padding: 5,
    marginRight: 5,
    marginBottom: 12,
    backgroundColor: '#F8F8F8',
  },
  text: {
    fontSize: 21,
    color: '#000000',
  },
});
