import {combineReducers} from 'redux';
import {reducers as messages} from '../screens/messages-screen/reducers';
import {reducers as loading} from '../screens/loading-screen/reducers';
import {reducers as login} from '../screens/login-screen/reducers';
import {reducers as teams} from '../screens/teams-screen/reducers';
// import {allAboutGreenUpDayReducers} from '../screens/about-green-up-day/allAboutGreenUpDayReducers';
import {reducers as trashTracker} from '../screens/trash-tracker-screen/reducers';
const rootReducer = combineReducers({loading, login, messages, teams, trashTracker});
export default rootReducer;
