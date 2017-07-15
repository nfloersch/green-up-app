import {combineReducers} from 'redux';
import {messageReducer} from '../screens/messages/messageReducer';
import {loginReducer} from '../screens/login/login-reducer';
import {teamReducer} from '../screens/my-teams/team-reducers';

const rootReducer = combineReducers({messageReducer, loginReducer});
export default rootReducer;
