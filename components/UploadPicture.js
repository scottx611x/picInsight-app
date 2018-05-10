import React from 'react';
import { Button, Image, Text, View, StyleSheet} from 'react-native';
import { ImagePicker } from 'expo';
import { Buffer } from 'buffer';
import uuidv4 from 'uuid/v4';
import { Storage } from 'aws-amplify';
import { pictureUploaded } from '../actions/PictureUploadedAction.js';
import { connect } from 'react-redux';


const styles = StyleSheet.create({});

class PictureUploader extends React.Component {
  state = {
    localImage: null,
    s3Key: null
  }

  onPictureUploaded = () => {
    this.props.pictureUploaded({ s3Key: this.state.s3Key });
  }

  goToPictureDetail = () => {
    this.props.navigation.navigate(
        'ViewPictureDetail', 
        {
          s3Key: this.state.s3Key,
          localImageUri: this.state.localImage.uri
        }
      );
  }
  
  uploadToS3 = () => {
    let { localImage, s3Key } = this.state;
    let buffer = new Buffer(localImage.base64, 'base64')
  
    Storage.put(
      s3Key, buffer, 
      { contentType: 'image/jpeg' }
    )
    .catch(err => console.log(err))
    this.onPictureUploaded()
  }

  pickImage = async () => {
    let s3Key = uuidv4() + ".jpg";
    let chosenImage = await ImagePicker.launchImageLibraryAsync(
      {
        "base64": true,
        "quality": .5
      }
    );

    if (!chosenImage.cancelled) {
      this.setState(
        {
          localImage: chosenImage,
          s3Key: s3Key
        }
      );
      this.uploadToS3()
    }
  };

  render() {
    let { localImage } = this.state;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {!localImage && 
          <Button
            title="Pick an image from camera roll"
            onPress={this.pickImage}
          />
        }
        {localImage && 
          <View>
            <Image 
              source={{uri: localImage.uri}} 
              style={{height: 300, width: 300}} 
            />
            <Button
              title="View Picture Detail"
              onPress={this.goToPictureDetail}
            />
          </View>

        }
      </View>
    );
  }
}

const mapStateToProps = state => ({ });
export default connect(mapStateToProps, {pictureUploaded,})(PictureUploader);
