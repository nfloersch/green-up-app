import * as types from '../../constants/actionTypes';
import Expo from 'expo';
import TrashDrop from '../../models/trash-drop';

const _markers = [...Array(43)].map((t, i) => {
    return TrashDrop.create({_id: i.toString(), active: true)
});
