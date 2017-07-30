import * as types from '../../constants/actionTypes';
import TrashDrop from '../../models/trash-drop';

export function dropTrash(location) {
    return {type: types.TRASH_DROP_SUCCESS, trashDrop: TrashDrop.create(location)};
}
