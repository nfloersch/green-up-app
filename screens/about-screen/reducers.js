// import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';
import * as types from '../../constants/actionTypes';

export function reducers(state = initialState.about, action) {
    switch (action.type) {
        case types.RESET:
            return {...state, about: initialState.about};
        default:
            return state;
    }
}
