import * as firebaseDataLayer from '../../data-sources/firebase-data-layer';
import TrashDrop from '../../models/trash-drop';
import * as types from '../../constants/actionTypes';

export function dropTrash(trashDrop) {
    return () => {
        firebaseDataLayer.dropTrash(TrashDrop.create(trashDrop));
    };
}

export function updateTrashDrop(trashDrop) {
    return () => {
        firebaseDataLayer.updateTrashDrop(TrashDrop.create(trashDrop));
    };
}

export function locationUpdated(location) {
    return (dispatch) => {
        dispatch({type:types.USER_LOCATION_UPDATED, location});
    };
}


export function toggleTrashData(toggle, value){
    return (dispatch) => {
        dispatch({type:types.TOGGLE_TRASH_DATA, toggle, value});
    };
}