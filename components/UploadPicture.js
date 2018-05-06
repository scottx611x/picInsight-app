import React from 'react';
import { Button, Image, Text, View, StyleSheet} from 'react-native';
import { ImagePicker } from 'expo';
import { Buffer } from 'buffer';
import uuidv4 from 'uuid/v4';
import { Storage } from 'aws-amplify';

const styles = StyleSheet.create({});

export default class ImageUploader extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 400, height: 400 }} />}
      </View>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync(
      {
        "base64": true,
        "quality": 1
      }
    );
    let buffer = new Buffer(result.base64, 'base64')

    Storage.put(uuidv4() + ".jpg", buffer, {
        contentType: 'image/jpeg' 
    })
    .catch(e => {
        console.log(e);
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}