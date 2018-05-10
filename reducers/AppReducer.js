import { combineReducers } from 'redux';
import NavigationReducer from './NavigationReducer'
import PictureReducer from './PictureReducer';


const AppReducer = combineReducers({
  pictures: PictureReducer,
  nav: NavigationReducer,
});


export default AppReducer;