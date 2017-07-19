import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';
export function teamReducers(state = initialState, action) {
    switch (action.type) {
        case types.NEW_TEAM:
            return {
                ...state,
                teams: [].concat(state.teams).concat(action.team)
            };
        case types.DELETE_TEAM:
            return {
                ...state,
                teams: (state.teams || []).filter(team => team._id !== action.teamId)
            };
        default:
            return state;
    }
}
