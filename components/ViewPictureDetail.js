import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

const styles = StyleSheet.create({});

class A extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>A</Text>
      </View>
    );
  }
}

class B extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>B</Text>
      </View>
    );
  }
}

class C extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>C</Text>
      </View>
    );
  }
}

export default createBottomTabNavigator({
  A: A,
  B: B,
  C: C
})
