/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { enableScreens } from 'react-native-screens';

import { NavigationContainer, useLinkTo } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { navigate, navigationRef, reset } from './extend_navigation';

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
  // console.log({ props })
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Setting Screen</Text>
    </View>
  );
}

const ProfileScreen = (props) => {
  // console.log({ props })
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
  prefixes: ['http://www.example.com', 'example://'], // first index is for android & second index for ios
  config,
  // subscribe(listener) {
  //   const onReceiveURL = ({ url }) => { 
  //     console.log({ url })
      
  //     // return listener(url)
  //   };

  //   // Listen to incoming links from deep linking
  //   Linking.addEventListener('url', onReceiveURL);

  //   // console.log({ url })

  //   // Listen to firebase push notifications
  //   // const unsubscribeNotification = messaging().onNotificationOpenedApp(
  //   //   (message) => {
  //   //     const url = message.notification.url;
  //   //     console.log({url})

  //   //     if (url) {
  //   //       // Any custom logic to check whether the URL needs to be handled
  //   //       //...

  //   //       // Call the listener to let React Navigation handle the URL
  //   //       listener(url);
  //   //     }
  //   //   }
  //   // );

  //   return () => {
  //     // Clean up the event listeners
  //     Linking.removeEventListener('url', onReceiveURL);
  //     // unsubscribeNotification();
  //   };
  // },
  getStateFromPath(path, config) {
    console.log({ path, config })
    // navigate('Notfound')
    reset({
      index: 1,
      routes: [{ name: 'Setting' },{ name: 'Profile' }],
    })
    // Return a state object here
    // You can also reuse the default logic by importing `getStateFromPath` from `@react-navigation/native`
  },
  // getPathFromState(state, config) {
  //   console.log({ state, config })
  //   // Return a path string here
  //   // You can also reuse the default logic by importing `getPathFromState` from `@react-navigation/native`
  // },
};

const App = () => {

  useEffect(() => {
    const listener = Linking.addEventListener('url', onOpenUrl)
    // return listener.removeEventListener('url', onOpenUrl)
  }, [])

  const onOpenUrl = value => {
    console.log({ value })
  }
  return (
    <NavigationContainer ref={navigationRef} linking={linking} fallback={<Text>Loading...</Text>}>
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
