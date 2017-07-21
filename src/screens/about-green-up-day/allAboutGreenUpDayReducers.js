import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';
export function allAboutGreenUpDayReducers(state = initialState, action) {
    switch (action.type) {
        case types.GET_ABOUT_CONTENT_SUCCESS:
            return {
                ...state,
                aboutContent: action.aboutContent

            };
        default:
            return state;
    }
}
