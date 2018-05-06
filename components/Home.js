import React from 'react';
import { OMDB_API_URL } from '../App';
import { OMDBResults } from '.';
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
      searchQuery: "",
      uploadPictureTitle: "Upload a Picture",
      viewResultsTitle: "View Results"
    };
  }
  
  UploadPicture = () => {
    this.props.navigation.navigate('UploadPicture');
  }

  ViewResults = () => {
    this.props.navigation.navigate('ViewResults');
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
          onPress={ this.ViewResults }
          title={ this.state.viewResultsTitle }>
        </Button>
      </View>
    );
  }
}
