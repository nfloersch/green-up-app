import * as types from '../../constants/actionTypes';
var dummyUser = {
    _id: '123456',
    firstName: 'Andy',
    lastName: 'Pants'
};

export function login(username, password) {
    console.log('user logged in with ' + username + ' - ' + password);
    return {type: types.LOGIN_SUCCESSFUL, user: dummyUser};
}