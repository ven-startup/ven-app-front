import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface TimerProps {
  style: Record<string, string | number>;
}

const TimerComponent = (props: TimerProps) => {
  const [seconds, setSeconds] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const getCurrentTimer = () => {
    return (
      minutes.toString().padStart(2, '0') +
      ':' +
      seconds.toString().padStart(2, '0')
    ).trim();
  };
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (seconds === 59) {
        setSeconds(0);
        setMinutes(currentMinute => currentMinute + 1);
      } else {
        setSeconds(currentSecond => currentSecond + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <View style={{...styles.timerContainer, ...props.style}}>
      <Text style={styles.text}>{getCurrentTimer()}</Text>
    </View>
  );
};

export default TimerComponent;

const styles = StyleSheet.create({
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    paddingHorizontal: 7,
    textAlign: 'center',
    color: 'black',
    fontSize: 14,
    borderWidth: 1,
    borderColor: 'black',
    opacity: 0.5,
    borderRadius: 10,
  },
});
