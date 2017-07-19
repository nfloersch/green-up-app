import {combineReducers} from 'redux';
import {messageReducer} from '../screens/messages/messageReducer';
const rootReducer = combineReducers({messageReducer});
export default rootReducer;
