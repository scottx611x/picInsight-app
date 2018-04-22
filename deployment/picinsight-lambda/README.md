# image-classifier:

Lambda function that gets triggered on uploads to s3, calls the Rekognition api to get image information, draws on top of the existing image (bounding boxes?) and then outputs the processed image into a new bucket for the app to be able to view

