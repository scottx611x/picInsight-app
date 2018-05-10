import { Storage } from 'aws-amplify';

const initialState = {
  pictures: []
}

const PictureReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PICTURE_UPLOADED':
      let s = state.pictures.concat([{ s3Key: action.payload.s3Key }])
      return s
    default:
      return state;
  }
};

export default PictureReducer;