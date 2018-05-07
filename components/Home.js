import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

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

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadPictureTitle: "Upload a Picture",
      viewPicturesTitle: "View Uploaded Pictures"
    };
  }
  
  UploadPicture = () => {
    this.props.navigation.navigate('UploadPicture');
  }

  ViewPictures = () => {
    this.props.navigation.navigate('ViewPictures');
  }
  
  render () {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>📷 🧠</Text>
        <Button
          color="blue"
          onPress={ this.UploadPicture }
          title={ this.state.uploadPictureTitle }>
        </Button>
        <Button
          color="green"
          onPress={ this.ViewPictures }
          title={ this.state.viewPicturesTitle }>
        </Button>
      </View>
    );
  }
}
