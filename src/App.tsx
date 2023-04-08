import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/login/login.screen';
import NicknameScreen from './screens/nickname/nickname.screen';
import amplifyConfiguration from '../amplify.config';
import {Amplify} from 'aws-amplify';

Amplify.configure(amplifyConfiguration);
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Nickname"
          component={NicknameScreen}
          options={{title: 'Second'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
