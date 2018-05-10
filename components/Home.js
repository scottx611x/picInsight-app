import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { createStore } from 'redux';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
    paddingBottom: 20
  }
});

const uploadPictureTitle = "Upload a Picture"
const viewPicturesTitle = "View Uploaded Pictures"

export default class Home extends React.Component {
  UploadPicture = () => {
    this.props.navigation.navigate('UploadPicture');
  }

  ViewPictures = () => {
    this.props.navigation.navigate('ViewPictures');
  }
  
  render () {
    return (
        <View style={styles.container}>
          <Text style={styles.title}>📷 🧠</Text>
          <Button
            color="blue"
            onPress={ this.UploadPicture }
            title={ uploadPictureTitle }>
          </Button>
          <Button
            color="green"
            onPress={ this.ViewPictures }
            title={ viewPicturesTitle }>
          </Button>
        </View>
    );
  }
}