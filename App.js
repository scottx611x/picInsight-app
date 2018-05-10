import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import AppReducer from './reducers/AppReducer';

import AppWithNavigationState from './components/AppNavigator';


import Amplify from "aws-amplify";
import awsConfig from './aws_data.json';

Amplify.configure({
    Auth: {
      identityPoolId: awsConfig.identityPoolId, 
      region: awsConfig.region
    },
    Storage: {
      bucket: awsConfig.bucket,
      region: awsConfig.region
    }
});

export default class App extends React.Component {
  store = createStore(AppReducer);

  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

