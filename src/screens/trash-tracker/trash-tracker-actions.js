import {firebaseDataLayer} from '../../data-sources/firebase-data-layer';
import TrashDrop from '../../models/trash-drop';

export function dropTrash(trashDrop) {
    return () => {
        firebaseDataLayer.dropTrash(TrashDrop.create(trashDrop));
    };
}
