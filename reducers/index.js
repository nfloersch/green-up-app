import {combineReducers} from 'redux';
import {reducers as about} from '../screens/about-screen/reducers';
import {reducers as messages} from '../screens/messages-screen/reducers';
import {reducers as loading} from '../screens/loading-screen/reducers';
import {reducers as login} from '../screens/login-screen/reducers';
import {reducers as teams} from '../screens/teams-screen/reducers';
import {reducers as profile} from '../screens/profile-screen/reducers';
import {reducers as trashTracker} from '../screens/trash-tracker-screen/reducers';
import {reducers as towns} from '../screens/towns-screen/reducers';

const rootReducer = combineReducers({about, loading, login, messages, teams, trashTracker, profile, towns});

export default rootReducer;
