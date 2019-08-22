// @flow
import { combineReducers } from "redux";
import { reducers as about } from "../screens/about-screen/reducers";
import { reducers as messages } from "../screens/message-summaries-screen/reducers";
import { reducers as session } from "../components/session/reducers";
import { reducers as login } from "../screens/login-screen/reducers";
import { reducers as teams } from "../screens/teams-screen/reducers";
import { reducers as profile } from "../screens/profile-screen/reducers";
import { reducers as trashTracker } from "../screens/trash-map-screen/reducers";
import { reducers as towns } from "../screens/towns-screen/reducers";

const rootReducer = combineReducers({ about, session, login, messages, teams, trashTracker, profile, towns });

export default rootReducer;
