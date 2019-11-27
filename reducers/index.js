// @flow
import { combineReducers } from "redux";
import { aboutReducers as about } from "./about-reducers";
import { loginReducers as login } from "./login-reducers";
import { messageReducers as messages } from "./message-reducers";
import { reducer as network } from "react-native-offline";
import { profileReducers as profile } from "./profile-reducers";
import { sessionReducers as session } from "./session-reducers";
import { teamsReducers as teams } from "./teams-reducers";
import { townsReducers as towns } from "./towns-reducers";
import { trashTrackerReducers as trashTracker } from "./trash-tracker-reducers";
import { userLocationReducers as userLocation } from "./user-location-reducers";
import { trashCollectionSitesReducers as trashCollectionSites } from "./trash-collection-sites-reducers";
import { supplyDistributionSitesReducers as supplyDistributionSites } from "./supply-distribution-sites-reducers";
import {celebrationsReducers as celebrations} from "./celebrations-reducers";

const rootReducer = combineReducers<any, any>({
    about,
    celebrations,
    session,
    login,
    messages,
    network,
    supplyDistributionSites,
    teams,
    trashCollectionSites,
    trashTracker,
    profile,
    towns,
    userLocation
});

export default rootReducer;
