// @flow
import * as firebaseDataLayer from "../data-sources/firebase-data-layer";
import TrashDrop from "../models/trash-drop";
import * as types from "../constants/action-types";

export const dropTrash = (trashDrop: TrashDrop): ThunkType => {
    function thunk(dispatch: Dispatch<ActionType>) {
        console.log("[ACTION] dropTrash ...");
        const drop = TrashDrop.create(trashDrop);
        firebaseDataLayer.dropTrash(drop)
            .then((data: mixed) => {
                console.log("{{DISPATCH: TRASH_DROP_SUCCESS >> \n" + JSON.stringify(data,null,'  ') + "\n }}");
                dispatch({ type: types.TRASH_DROP_SUCCESS, data });
            })
            .catch((error: Error) => {
                console.log("{{DISPATCH: TRASH_DROP_FAIL >> \n" + JSON.stringify(error,null,'  ') + "\n }}");
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

export const removeTrashDrop = (trashDrop: TrashDrop): ThunkType => {
    function thunk(dispatch: Dispatch<ActionType>) {
        const drop = TrashDrop.create(trashDrop);
        firebaseDataLayer.removeTrashDrop(drop)
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