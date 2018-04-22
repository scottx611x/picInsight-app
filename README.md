# picInsight-app [![Build Status](https://travis-ci.org/scottx611x/picInsight-app.svg?branch=master)](https://travis-ci.org/scottx611x/picInsight-app)
React-Native app that allows one to classify images

### App Requirements:
- Must use [`redux`](https://github.com/reactjs/react-redux)
	- https://github.com/jarretmoses/react-native-redux-example
	- `Actions` can be sent when a user presses a button, load an app, etc. They can contain information that you want to add to the state.
	- `Reducers` listen for actions. When it hears that an action has been sent to it, it updates the state.
	- `The Store` holds the Redux state and allows access and modifications to it. It’s the middleman between actions and reducers.

- Must make at least one network call
- Must have at least one stack navigator
- Must have at least one tab navigator
- Must be at least as large in scope as the previous projects

### TO-DO:
- [ ] CI/CD
	- https://medium.com/react-native-training/setup-continuous-integration-with-react-native-50ad2f6145f4
	- https://jtway.co/the-simplest-way-to-automate-delivery-of-your-react-native-application-f37f2c71eb1d
	  - https://fabric.io/kits?show_signup=true
	- https://hanno.co/blog/bitrise-deployment-workflow-react-native/
- [ ] Unit tests
	- https://facebook.github.io/jest/docs/en/tutorial-react-native.html
- [ ] Update: https://github.com/scottx611x/final-project-scottx611x
- [ ] What should this app even do?


### Deployment:
- picInsight require some external infrastructure who's deployment in handled by: [terraform](https://www.terraform.io)
- Follow [these instructions](https://github.com/scottx611x/picInsight-app/blob/master/deployment/terraform/README.md) to get started with infrastructure deployment
