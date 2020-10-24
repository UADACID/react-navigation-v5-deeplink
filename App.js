/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { enableScreens } from 'react-native-screens';

import { NavigationContainer, useLinkTo } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

enableScreens()
const Stack = createNativeStackNavigator()

const HomeScreen = () => {
  const linkTo = useLinkTo();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={() => linkTo('/profile/tokenPratamaSetyaAji')}>
        <Text>navigate</Text>
      </TouchableOpacity>
    </View>
  ); 
}

const SettingScreen = (props) => {
  console.log({ props })
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Setting Screen</Text>
    </View>
  );
}

const ProfileScreen = (props) => {
  console.log({ props })
  const token = props?.route?.params?.token || 'token not found'
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ textAlign: 'center' }}>Profile Screen with token : {token}</Text>
    </View>
  );
}

const NotFoundScreen = (props) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ textAlign: 'center' }}>Not found 404</Text>
    </View>
  );
}

const config = {
  screens: {
    Home: 'home',
    Setting: 'setting',
    Profile: 'profile/:token',
    Notfound: '*'
  },
};

const linking = {
  prefixes: ['http://www.example.com', 'example://'],
  config
};

const App = () => {
  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Setting" component={SettingScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Notfound" component={NotFoundScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
