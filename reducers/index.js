// @flow
import { combineReducers } from "redux";
import { aboutReducers as about } from "./about-reducers";
import { loginReducers as login } from "./login-reducers";
import { messageReducers as messages } from "./message-reducers";
import { reducer as network } from "react-native-offline";
import { profileReducers as profile } from "./profile-reducers";
import { reducers as session } from "../components/session/reducers";
import { teamsReducers as teams } from "./teams-reducers";
import { townsReducers as towns } from "./towns-reducers";
import { reducers as trashTracker } from "../screens/trash-map-screen/reducers";

const rootReducer = combineReducers<any, any>({ about, session, login, messages, network, teams, trashTracker, profile, towns });

export default rootReducer;
