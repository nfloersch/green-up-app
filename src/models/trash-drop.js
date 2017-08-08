// @flow

import {Coordinate} from './coordinate';
import {isDate} from '../libs/isDate';

export class TrashDropLocation {
    uid: string;
    bagCount: number;
    status: string;
    active: boolean;
    tags: [string];
    coordinate: Coordinate;
    created: Date;

    constructor(args = {}) {
        this.uid = typeof args.uid === 'string' ? args.uid : null;
        this.bagCount = typeof args.bagCont === 'number' ? args.bagCount : null;
        this.tags = Array.isArray(args.tags) ? args.tags.filter((tag) => typeof tag === 'string') : [];
        this.status = typeof args.status === 'string' ? args.status : null;
        this.active = typeof args.active === 'boolean' ? args.active : true;
        this.coordinate = typeof coordinate === 'object' ? Coordinate.create(args.coordinate) : null;
        this.created = isDate(args.created) ? new Date(args.created) : null;
    }

    static create(args) {
        return new TrashDropLocation(args);
    }
}