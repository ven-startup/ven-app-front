import * as React from 'react';
import {StyleSheet, View} from 'react-native';

const StepComponent = ({total, actualStep, style}: any) => {
  const steps = createSteps(total, actualStep, style);
  return <View style={styles.stepContainer}>{steps.map(step => step)}</View>;
};

function createSteps(total: number, actualStep: number, style: any) {
  const steps = [];
  for (let step = 1; step <= total; step++) {
    if (step === actualStep) {
      steps.push(<View key={step} style={{...styles.actualStep, ...style}} />);
    } else {
      steps.push(<View key={step} style={{...styles.step, ...style}} />);
    }
  }
  return steps;
}

export default StepComponent;

const styles = StyleSheet.create({
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: 'white',
  },
  step: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    marginRight: 12,
  },
  actualStep: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'black',
    opacity: 0.7,
    marginRight: 12,
  },
});
