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
        case types.RETRIEVE_CONTACTS_SUCCESS:
            return {
                ...state,
                contacts: (state.contacts || []).filter(contact => (action.contacts || []).map(c => c.email).indexOf(contact.email) < 0).concat(action.contacts)
            };
        case types.RETRIEVE_CONTACTS_FAIL:
            return {
                ...state,
                contacts: []
            };
        default:
            return state;
    }
}
