import {combineReducers} from 'redux';
import {messageReducer} from '../screens/messages/messageReducer';
import {loginReducer} from '../screens/login/login-reducer';
const rootReducer = combineReducers({messageReducer, loginReducer});
export default rootReducer;
