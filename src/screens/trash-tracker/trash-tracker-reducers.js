import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export function trashTrackerReducers(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_TRASH_DROPS_SUCCESS:
            return {
                ...state,
                trashDrops: action.trashDrops
            };
        default:
            return state;
    }
}
