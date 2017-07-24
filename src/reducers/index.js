import {combineReducers} from 'redux';
import {messageReducer} from '../screens/messages/messageReducer';
import Welcome from './screens/login/';
const rootReducer = combineReducers({messageReducer});
export default rootReducer;
