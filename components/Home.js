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
      takePictureTitle: "Take a Picture",
      viewResultsTitle: "View Results"
    };
  }
  
  TakePicture = () => {
    this.props.navigation.navigate(
        'TakePicture', 
        {data: "TakePicture"}
      );
  }

  ViewResults = () => {
    this.props.navigation.navigate(
        'ViewResults', 
        {data: "ViewResults"}
      );
  }
  
  render () {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>📷 🧠</Text>
        <Button
          color="blue"
          onPress={ this.TakePicture }
          title={ this.state.takePictureTitle }>
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
