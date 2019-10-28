// @flow
import * as firebaseDataLayer from "../../data-sources/firebase-data-layer";
import TrashDrop from "../../models/trash-drop";
import * as types from "../../constants/action-types";

export const dropTrash = (trashDrop: TrashDrop): ThunkType => {
    function thunk(dispatch: Dispatch<ActionType>) {
        const drop = TrashDrop.create(trashDrop);
        firebaseDataLayer.dropTrash(drop)
            .then((data: mixed) => {
                dispatch({ type: types.TRASH_DROP_SUCCESS, data });
            })
            .catch((error: Error) => {
                dispatch({ type: types.TRASH_DROP_FAIL, error, data: drop });
            });
    }

    thunk.interceptOnOffline = true;
    return thunk;
};

export const updateTrashDrop = (trashDrop: TrashDrop): ThunkType => {
    function thunk(dispatch: Dispatch<ActionType>) {
        const drop = TrashDrop.create(trashDrop);
        firebaseDataLayer.updateTrashDrop(drop)
            .then((data: mixed) => {
                dispatch({ type: types.TRASH_DROP_SUCCESS, data });
            })
            .catch((error: Error) => {
                dispatch({ type: types.TRASH_DROP_FAIL, error, data: drop });
            });
    }

    thunk.interceptOnOffline = true;
    return thunk;
};

export const locationUpdated = (location: LocationType): ActionType => (
    {
        type: types.USER_LOCATION_UPDATED,
        data: location
    }
);

export const toggleTrashData = (toggle: boolean, value: mixed): ActionType => ({
    type: types.TOGGLE_TRASH_DATA,
    data: { toggle, value }
});