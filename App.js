import React from 'react';
import { Home, UploadPicture, ViewResults } from './components'
import { createStackNavigator } from 'react-navigation';

export default createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: 'Home'
      }
    },
    UploadPicture: {
      screen: UploadPicture,
      navigationOptions: ({ navigation }) => ({
        title: `Upload a Picture`
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