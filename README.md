# picInsight-app [![Build Status](https://travis-ci.org/scottx611x/picInsight-app.svg?branch=master)](https://travis-ci.org/scottx611x/picInsight-app)
React-Native app that allows one to classify images through the use of the [AWS Rekognition API](https://aws.amazon.com/rekognition/)

### Pre-reqs:
- npm
- terraform
- Expo XDE

### Deployment:
- picInsight require some external infrastructure who's deployment is handled by: [terraform](https://www.terraform.io)
- Follow [these instructions](https://github.com/scottx611x/picInsight-app/blob/master/deployment/terraform/README.md) to get started with infrastructure deployment (or just continue on below)

### Running the app:
- `cd deployment/terraform/`
- `terraform init && terraform apply`
- `cd ../../`
- `npm install`
- Proceed to open project w/ Expo XDE

![may-10-2018 01-04-57](https://user-images.githubusercontent.com/5629547/39853114-4a4e5806-53ee-11e8-9cd2-1582c82060b9.gif)


### App Requirements:
- [x] Must use [`redux`](https://github.com/reactjs/react-redux)
- [x] Must make at least one network call
- [x] Must have at least one stack navigator
- [x] Must have at least one tab navigator
- [x] Must be at least as large in scope as the previous projects

### TO-DO:
- [x] Implement redux
- [x] Display Rekognition results:
  - [ ] Image w/ bounding boxes drawn (if face(s) detected)
  - [ ] Wikipedia links for most specific labels
  - [x] Raw Json data
- [x] Update: https://github.com/scottx611x/final-project-scottx611x
