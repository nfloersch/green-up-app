// @flow

import {Coordinate} from './coordinate';

export class TrashDrop {
    _id: string;
    bagCount: number;
    status: string;
    active: boolean;
    tags: [string];
    coordinate: Coordinate;

    constructor(args = {}) {
        this._id = typeof args._id === 'string' ? args._id : null;
        this.bagCount = typeof args.bagCont === 'number' ? args.bagCount : null;
        this.tags = Array.isArray(args.tags) ? args.tags.filter((tag) => typeof tag === 'string') : [];
        this.status = typeof args.status === 'string' ? args.status : null;
        this.active = typeof args.active === 'boolean' ? args.active : true;
        this.coordinate = typeof coordinate === 'object' ?  Coordinate.create(coordinate): null;
    }

    static create(args) {
        return new TrashDrop(args);
    }
}