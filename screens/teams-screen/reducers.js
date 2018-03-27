import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export function reducers(state = initialState.teams, action) {
    switch (action.type) {
        case types.NEW_TEAM:
            return {
                ...state,
                teams: [].concat(state.teams).concat(action.team)
            };
        case types.DELETE_TEAM:
            return {
                ...state,
                teams: (state.teams || []).filter(team => team.uid !== action.teamId)
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
        case types.SEARCH_TEAMS_SUCCESS:
            return {
                ...state,
                teamSearchResults: action.teams
            };
        case types.SELECT_TEAM:
            return {
                ...state,
                selectedTeam: action.team,
                locations: action.team.locations
            };
        case types.SELECT_TEAM_BY_ID :
            return {
                ...state,
                selectedTeam: state.teams[action.teamId]
            };
        case types.FETCH_TEAMS_SUCCESS :
            return {
                ...state,
                teams: action.teams
            };
        case types.LOCATIONS_UPDATED: {
            return {
                ...state,
                locations: action.locations
            };
        }
        case types.SET_SELECTED_TEAM_VALUE: {
            const newSelectedTeam = Object.assign({}, state.selectedTeam);
            newSelectedTeam[action.data.key] = action.data.value;
            return {
                ...state,
                selectedTeam: newSelectedTeam
            };
        }
        case types.TEAM_MEMBER_FETCH_SUCCESS : {
            return {
                ...state,
                teamMembers: {...state.teamMembers, [action.teamId]: action.membership},
                teamMembersLoaded: true
            };
        }

        case types.FETCH_INVITATIONS_SUCCESS : {
            return {
                ...state,
                invitations: action.invitations
            };
        }
        default:
            return state;
    }
}
