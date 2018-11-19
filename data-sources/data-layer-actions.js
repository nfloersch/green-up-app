import * as types from '../constants/actionTypes';
import Team from '../models/team';
import TrashDrop from '../models/trash-drop';
import Message from '../models/message';

export function userAuthenticated(user) {
    return {type: types.LOGIN_SUCCESSFUL, user};
}

export function messageFetchSuccessful(messages) {
    const _key = Object.keys(messages)[0];
    const myMessages = Object.keys(messages[_key]).reduce((messageHash, key) => (Object.assign({}, messageHash, {[key]: Message.create(Object.assign({uid: key}, messages[_key][key]))})), {});
    return {type: types.FETCH_MESSAGES_SUCCESS, messages: {[_key]: myMessages}};
}

export function noCurrentUser() {
    return {type: types.NO_CURRENT_USER};
}

export function userLoggedOut() {
    return {type: types.LOGOUT_SUCCESSFUL};
}

export function userFailedLogOut(error) {
    return {type: types.LOGOUT_FAIL, error};
}

export function userFailedAuthentication(error) {
    return {type: types.LOGIN_FAIL, error};
}

export function teamFetchSuccessful(_teams: Object) {
    const teams = Object.keys(_teams || {}).reduce((teamObj, key) => (Object.assign({}, teamObj, {[key]: Team.create(_teams[key], key)})), {});

    return {type: types.FETCH_TEAMS_SUCCESS, teams};
}

export function townDataFetchFail() {
    return {type: types.FETCH_TEAMS_FAIL};
}

export function resetData() {
    return {type: types.RESET};
}

export function trashDropFetchSuccessful(_trashDrops: Object) {
    const trashDrops = Object.keys(_trashDrops || {}).reduce((trashDropObj, key) => (Object.assign({}, trashDropObj, {[key]: TrashDrop.create(_trashDrops[key], key)})), {});
    return {type: types.FETCH_TRASH_DROPS_SUCCESS, trashDrops};
}

export function profileFetchSuccessful(profile: Object) {
    return {type: types.FETCH_PROFILE_SUCCESS, profile};
}


export function teamMemberFetchSuccessful(membership: Object, teamId: string) {
    return {type: types.TEAM_MEMBER_FETCH_SUCCESS, membership, teamId};
}

export function profileCreateFail(error: Object) {
    return {type: types.UPDATE_PROFILE_FAIL, error};
}

export function profileFetchFail(error: Object) {
    return {type: types.FETCH_PROFILE_FAIL, error};
}

export function townDataFetchSuccessful(townData: Object) {

    return {type: types.FETCH_TOWN_DATA_SUCCESS, townData};
}

export function invitationFetchSuccessful(invitations: Object) {
    return {type: types.FETCH_INVITATIONS_SUCCESS, invitations};
}

export function noTeamsToLoad() {
    return {type: types.NO_TEAMS_TO_LOAD};
}

export function initilizationSuccessful() {
    return {type: types.INITIALIZE_SUCCESS};
}

export function initilizationFail() {
    return {type: types.INITIALIZE_FAIL};
}