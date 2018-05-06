import React from 'react';
import { Home, UploadPicture, ViewResults } from './components'
import { createStackNavigator } from 'react-navigation';
import Amplify, { Auth } from "aws-amplify";
import awsConfig from './aws_data.json';

Amplify.configure({
    Auth: {
      identityPoolId: awsConfig.identityPoolId, 
      region: awsConfig.region
    },
    Storage: {
      bucket: awsConfig.uploadBucket,
      region: awsConfig.region
    }
});

Auth.currentCredentials()
.then(data => {console.log(data)})
.catch(e => {console.log(e)});

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