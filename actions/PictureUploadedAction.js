export const pictureUploaded = (type) => {
  return {
    type: 'PICTURE_UPLOADED',
    payload: type
  };
};