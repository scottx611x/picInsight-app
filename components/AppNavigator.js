import React from 'react';
import { addNavigationHelpers, createStackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import Home from './Home';
import UploadPicture from './UploadPicture';
import ViewPictures from './ViewPictures';
import ViewPictureDetail from './ViewPictureDetail'

export const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: { title: 'Home' }
    },
    UploadPicture: {
      screen: UploadPicture,
      navigationOptions: { title: 'Upload a Picture' }
    },
    ViewPictures: {
      screen: ViewPictures,
      navigationOptions: { title: 'View Pictures' }
    },
    ViewPictureDetail: {
      screen: ViewPictureDetail,
      navigationOptions: { title: 'View Picture Detail' }
    }
  },
  {
    initialRouteName: 'Home',
  }
);

class AppWithNavigationState extends React.Component {
  static router = AppNavigator.router;
  render() {
    const { navigation } = this.props;

    return <AppNavigator navigation={navigation} />;
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});
  
export default connect(mapStateToProps)(AppWithNavigationState);