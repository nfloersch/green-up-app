// @flow
import * as types from "../../constants/action-types";
import initialState from "../../reducers/initial-state";

export function reducers(state: Object = initialState.networkStatus, action: ActionType): Object {
    switch (action.type) {
        case types.NETWORK_STATUS_CHANGE :
            return {
                ...state,
                isOnline: (action.data || {}).isOnline
            };
        default:
            return state;
    }
}
