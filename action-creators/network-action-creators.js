// @flow
import * as actionTypes from "../constants/action-types";

export const setNetworkStatus = (isOnline: boolean): ActionType => ({
    type: actionTypes.NETWORK_STATUS_CHANGE,
    data: { isOnline }
});