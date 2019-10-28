// @flow
import * as types from "../constants/action-types";
import initialState from "./initial-state";

export const teamsReducers = (state: Object = initialState.teams, action: ActionType): Object => {
    switch (action.type) {
        case types.NEW_TEAM:
            return {
                ...state,
                teams: [].concat(state.teams).concat(action.data)
            };
        case types.DELETE_TEAM:
            return {
                ...state,
                teams: (state.teams || []).filter((team: TeamType): boolean => team.id !== action.data)
            };
        case types.RETRIEVE_CONTACTS_SUCCESS:
            return {
                ...state,
                contacts: (state.contacts || [])
                    .filter((contact: ContactType): boolean => (action.data || []).map((c: Object): ?string => c.email).indexOf(contact.email) < 0)
                    .concat(action.data)
            };
        case types.RETRIEVE_CONTACTS_FAIL:
            return {
                ...state,
                contacts: []
            };
        case types.SELECT_TEAM:
            return {
                ...state,
                selectedTeam: action.data,
                locations: (action.data || {}).locations
            };
        case types.SELECT_TEAM_BY_ID :
            return {
                ...state,
                selectedTeam: state.teams[action.data]
            };
        case types.FETCH_TEAMS_SUCCESS :
            return {
                ...state,
                teams: action.data
            };

        case types.SET_SELECTED_TEAM_VALUE: {
            const newSelectedTeam = Object.assign({}, state.selectedTeam);
            newSelectedTeam[(action.data || {}).key] = (action.data || {}).value;
            return {
                ...state,
                selectedTeam: newSelectedTeam
            };
        }
        case types.TEAM_MEMBER_FETCH_SUCCESS : {
            return {
                ...state,
                teamMembers: { ...state.teamMembers, [(action.data || {}).teamId]: (action.data || {}).membership },
                teamMembersLoaded: true
            };
        }
        case types.TEAM_REQUEST_FETCH_SUCCESS : {
            return {
                ...state,
                teamRequests: { ...state.teamRequests, [(action.data || {}).teamId]: (action.data || {}).requests }
            };
        }
        case types.FETCH_INVITATIONS_SUCCESS : {
            return {
                ...state,
                myInvitations: action.data
            };
        }
        case types.FETCH_INVITEES_SUCCESS : {
            return {
                ...state,
                invitations: { ...state.invitations, [(action.data || {}).teamId]: (action.data || {}).invitees }
            };
        }
        case types.REVOKE_INVITATION_SUCCESS : {
            return {
                ...state
            };
        }
        case types.RESET:
            return {
                ...state,
                teamMembers: initialState.teamMembers,
                selectedTeam: initialState.selectedTeam,
                teams: initialState.teams
            };
        default:
            return state;
    }
};
