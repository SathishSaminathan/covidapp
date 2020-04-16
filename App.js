/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, StatusBar, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {MyStack} from './src/routes/StackNavigator';
import LottieAnimation from './src/components/Shared/LottieAnimation';
import {Colors} from './src/constants/ThemeConstants';
import { DrawerNav } from './src/routes/DrawerNavigator';

const App = () => {
  const [Loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      {!Loaded ? (
        <LottieAnimation />
      ) : (
        <NavigationContainer>
          <DrawerNav />
        </NavigationContainer>
      )}
    </View>
  );
};

export default App;
