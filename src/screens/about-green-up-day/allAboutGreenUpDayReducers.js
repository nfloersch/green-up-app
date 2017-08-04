import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';
export function allAboutGreenUpDayReducers(state = initialState, action) {
    switch (action.type) {
        case types.GET_ABOUT_GREENUP_SUCCESS:
            return {
                ...state,
                aboutContent: {
                    aboutGreenUp: action.aboutContent
                }

            };
        case types.GET_ABOUT_CONTACTS_SUCCESS:
            return {
                ...state,
                aboutContent: {
                    aboutContacts: action.aboutContent
                }
            };
        default:
            return state;
    }
}
