/**
 * Ramesh Aqua Mobile App
 * Main entry point for the React Native application
 * Clean, readable implementation with Firebase integration
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';

import {store} from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';
import {initializeFirebase} from './src/services/firebaseConfig';

// Initialize Firebase when app starts
initializeFirebase();

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar 
            barStyle="dark-content" 
            backgroundColor="#ffffff" 
            translucent={false}
          />
          <AppNavigator />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;