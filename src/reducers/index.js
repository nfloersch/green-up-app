import {combineReducers} from 'redux';
import {messageReducer} from '../screens/messages/messageReducer';
import {loginReducer} from '../screens/login/login-reducer';
import {teamReducers} from '../screens/my-teams/team-reducers';





const rootReducer = combineReducers({messageReducer, loginReducer, teamReducers});
export default rootReducer;
