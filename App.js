import React from 'react';
import { Home, TakePicture, ViewResults } from './components'
import { createStackNavigator } from 'react-navigation';

export default createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: 'Home'
      }
    },
    TakePicture: {
      screen: TakePicture,
      navigationOptions: ({ navigation }) => ({
        title: `Take a Picture`
      })
    },
    ViewResults: {
      screen: ViewResults,
      navigationOptions: ({ navigation }) => ({
        title: `View Results`
      })
    }
  },
  {
    initialRouteName: 'Home',
  }
);