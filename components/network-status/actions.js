// @flow
import * as actionTypes from "../../constants/action-types";

export const setNetworkStatus = isOnline => ({ type: actionTypes.NETWORK_STATUS_CHANGE, data: { isOnline } });