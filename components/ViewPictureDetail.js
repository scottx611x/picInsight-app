import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { Storage } from 'aws-amplify';
import { S3Image } from 'aws-amplify-react-native';


const styles = StyleSheet.create({});

class Picture extends React.Component {
  render() {
    let navParams = this.props.navigation.state.params;
    let { s3Key, localImageUri } = navParams;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {!localImageUri && 
          <S3Image 
            imgKey={s3Key} 
            style={{height: 300, width: 300}} 
          />} 
        {localImageUri && 
          <Image 
            source={{uri: localImageUri}} 
            style={{height: 300, width: 300}} 
          />} 
      </View>
    );
  }
}

class WikipediaLinks extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>WikipediaLinks</Text>
      </View>
    );
  }
}

class RekognitionResults extends React.Component {
  state = {
    "rekognitionResults": null
  }

  _keyExtractor = (item, index) => item.Name;


  componentDidMount = () => {
    let s3Key = this.props.navigation.state.params.s3Key
    let s3ResultsKey = s3Key.replace("jpg", "json")
    
    Storage.get(
      `processed/public/${s3ResultsKey}`, 
      {contentType: "application/json"}
    ).then(
      url => fetch(url).then(r => r.json())
      .then(data => {
        this.setState({rekognitionResults: data}); 
        // console.log("rekognitionResults: ", this.state.rekognitionResults);
      })
      .catch(e => console.log("Could not fetch rekognitionResults."))
    );
  }

  // renderCelebData = () => {

  // }

  // renderFaceData = () => {
    
  // }

  renderLabelData = (label) => {
    return <Text>{label.Name}: {label.Confidence}</Text>
  }

  render() {
    let { rekognitionResults } = this.state
    return (<View>
      {rekognitionResults && <FlatList
        data={rekognitionResults["labels"]["Labels"]}
        renderItem={(label) => this.renderLabelData(label.item)}
        keyExtractor={this._keyExtractor}
      />}
      {!rekognitionResults && <Text>No Rekognition Results Found</Text>}
    </View>);
  }
}

export default createBottomTabNavigator({
  '📷 Picture': Picture,
  '🧠 Rekognition Results': RekognitionResults
})
