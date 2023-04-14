import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Amplify} from 'aws-amplify';
import * as React from 'react';
import amplifyConfiguration from '../amplify.config';
import LoginScreen from './screens/login/login.screen';
import MyDataScreen from './screens/my-data/my-data.screen';
import NicknameScreen from './screens/nickname/nickname.screen';

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
        <Stack.Screen name="Nickname" component={NicknameScreen} />
        <Stack.Screen name="MyData" component={MyDataScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
