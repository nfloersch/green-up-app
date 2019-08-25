import * as firebaseDataLayer from "../../data-sources/firebase-data-layer";
import TrashDrop from "../../models/trash-drop";
import * as types from "../../constants/action-types";

export const dropTrash = trashDrop => {
    function thunk() {
        firebaseDataLayer.dropTrash(TrashDrop.create(trashDrop));
    }

    thunk.interceptOnOffline = true;
    return thunk;
};

export const updateTrashDrop = trashDrop => {
    function thunk() {
        firebaseDataLayer.updateTrashDrop(TrashDrop.create(trashDrop));
    }

    thunk.interceptOnOffline = true;
    return thunk;
};

export function locationUpdated(location) {
    return (dispatch) => {
        dispatch({ type: types.USER_LOCATION_UPDATED, location });
    };
}


export function toggleTrashData(toggle, value) {
    return (dispatch) => {
        dispatch({ type: types.TOGGLE_TRASH_DATA, toggle, value });
    };
}