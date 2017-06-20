import {combineReducers} from 'redux';
import {messageReducer} from './messageReducer';
const rootReducer = combineReducers({messageReducer});
export default rootReducer;
