import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export function reducers(state = initialState, action) {
    switch (action.type) {

        case types.FETCH_SUPPLY_LOCATIONS_SUCCESS :
            return {
                ...state,
                supplyLocations: Object.assign({}, action.supplyLocations)
            };
        case types.FETCH_SUPPLY_LOCATIONS_FAIL :
            return {
                ...state,
                supplyLocations: {}
            };
        default:
            return state;
    }
}
