import React from 'react';
import { Home, UploadPicture, ViewPictures, ViewPictureDetail } from './components'
import { createStackNavigator } from 'react-navigation';
import Amplify from "aws-amplify";
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
    ViewPictures: {
      screen: ViewPictures,
      navigationOptions: ({ navigation }) => ({
        title: `View Pictures`
      })
    },
    ViewPictureDetail: {
      screen: ViewPictureDetail,
      navigationOptions: ({ navigation }) => ({
        title: `View Picture Detail`
      })
    }
  },
  {
    initialRouteName: 'Home',
  }
);