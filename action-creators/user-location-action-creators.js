// @flow

import * as types from "../constants/action-types";

type UserLocationType = { coordinates: LocationType, townId: string, lastUpdated: Date, error: string };

export const userLocationError = (error: string): ActionType => (
    {
        type: types.USER_LOCATION_UPDATE_FAIL,
        error
    }
);


export const userLocationUpdate = (data: UserLocationType): ActionType => (
    {
        type: types.USER_LOCATION_UPDATE_SUCCESS,
        data
    }
);

