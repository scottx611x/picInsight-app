import React from 'react';
import { FlatList, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Storage } from 'aws-amplify';
import { S3Image } from 'aws-amplify-react-native';
import { connect } from 'react-redux';

const styles = StyleSheet.create();

class ViewPictures extends React.Component {
	state = { pictures: []};	

	_keyExtractor = (picture, index) => picture.s3Key;

	renderS3Image = (s3Key) => {
		return <TouchableHighlight onPress={() => this.goToPictureDetail(s3Key)}>
			<S3Image
				style={{width: 300, height: 300}}
				imgKey={s3Key} 
			/>
		</TouchableHighlight>
	}

	goToPictureDetail = (s3Key) => {
		this.props.navigation.navigate(
        'ViewPictureDetail', 
        {s3Key: s3Key}
      );
	}

	render() {	
		console.log(this.props.pictures)
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<FlatList
				  data={this.props.pictures}
				  renderItem={({item}) => this.renderS3Image(item.s3Key)}
				  keyExtractor={this._keyExtractor}
				/>
			</View>
		)
	}
}

const mapStateToProps = state => {
  return { pictures: state.pictures };
};

export default connect(mapStateToProps)(ViewPictures);