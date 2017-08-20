import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export function trashTrackerReducers(state = initialState, action) {
    switch (action.type) {
        case types.TRASH_DROP_SUCCESS:
            return {
                ...state,
                trashDrops: action.trashDrops

            };
        case types.TRASH_DROP_FAIL:
            return {
                ...state,
                trashDrops: action.trashDrops
            };
        default:
            return state;
    }
}
