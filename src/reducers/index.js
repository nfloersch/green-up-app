import {combineReducers} from 'redux';
import {messageReducer} from '../screens/messages/messageReducer';
import {loginReducer} from '../screens/login/login-reducer';
import {teamReducers} from '../screens/my-teams/team-reducers';
import {allAboutGreenUpDayReducers} from '../screens/about-green-up-day/allAboutGreenUpDayReducers';
import {trashTrackerReducers} from '../screens/trash-tracker/trash-tracker-reducers';
const rootReducer = combineReducers({messageReducer, loginReducer, teamReducers, allAboutGreenUpDayReducers, trashTrackerReducers});
export default rootReducer;
