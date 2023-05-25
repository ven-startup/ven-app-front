import * as React from 'react';
import {
  Animated,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

interface ListOfElementsBlockComponentProps {
  styles?: Record<string, string | number>;
  elements: string[];
  prefix?: string;
  removeElement?: (element: string, index: number) => void;
  iconForAnimationToRemoveElement?: ImageSourcePropType;
}

const ListOfElementsBlockComponent = (
  props: ListOfElementsBlockComponentProps,
) => {
  const elementAnimations: Animated.Value[][] = props.elements.map(() => {
    return [new Animated.Value(0), new Animated.Value(1)];
  });

  const showIconElementAnimation = (
    animation: Animated.Value,
    action: () => void,
  ) => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(action);
  };

  const hideElementAnimation = (
    animation: Animated.Value,
    action: () => void,
  ) => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start(action);
  };

  return (
    <ScrollView>
      <View style={{...styles.ListOfElementsBlockContainer, ...props.styles}}>
        {props.elements.map((element: string, index: number) => {
          return (
            <TouchableWithoutFeedback
              key={element}
              onPress={() => {
                if (props.removeElement) {
                  hideElementAnimation(elementAnimations[index][1], () => {});
                  showIconElementAnimation(elementAnimations[index][0], () => {
                    elementAnimations[index][0].resetAnimation();
                    elementAnimations[index][1].resetAnimation();
                    props.elements.splice(index, 1);
                    props.removeElement(element, index);
                  });
                }
              }}>
              <View>
                <Animated.View style={{opacity: elementAnimations[index][1]}}>
                  <View key={element} style={styles.elementContainer}>
                    <Text key={element} style={styles.text}>
                      {(props.prefix ?? '') + element}
                    </Text>
                  </View>
                </Animated.View>

                {props.iconForAnimationToRemoveElement && (
                  <Animated.View
                    style={{
                      ...styles.iconForAnimationToRemoveElementContainer,
                      ...{opacity: elementAnimations[index][0]},
                    }}>
                    <Image
                      source={props.iconForAnimationToRemoveElement}
                      style={styles.iconForAnimationToRemoveElement}
                    />
                  </Animated.View>
                )}
              </View>
            </TouchableWithoutFeedback>
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
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
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
    borderRadius: 30,
  },
  text: {
    textAlign: 'center',
    fontSize: 21,
    color: '#000000',
  },
  iconForAnimationToRemoveElementContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  iconForAnimationToRemoveElement: {
    width: 48,
    height: 48,
  },
});
