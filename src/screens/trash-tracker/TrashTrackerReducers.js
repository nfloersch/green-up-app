import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';
export function TrashTrackerReducers(state = initialState, action) {
    switch (action.type) {
        case types.TRASH_DROP_SUCCESS:
        return {
            ...state
          };
        case types.TRASH_DROP_FAIL:
        return {
            ...state
          };
          default:
              return state;
  }
}
