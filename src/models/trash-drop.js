// @flow

import {Coordinates} from './coordinates';
import {isDate} from '../libs/isDate';

export default class TrashDrop {
    uid: string;
    bagCount: number;
    status: string;
    active: boolean;
    tags: [string];
    coordinates: Coordinates;
    created: Date;

    constructor(args: Object) {
        this.bagCount = typeof args.bagCount === 'number' ? args.bagCount : null;
        this.tags = Array.isArray(args.tags) ? args.tags.filter((tag) => typeof tag === 'string') : [];
        this.status = typeof args.status === 'string' ? args.status : null;
        this.active = typeof args.active === 'boolean' ? args.active : true;
        this.coordinates = typeof args.coordinates === 'object' ? Coordinates.create(args.coordinates) : null;
        this.created = isDate(args.created) ? new Date(args.created) : null;
    }

    static create(args) {
        return new TrashDrop(args || {});
    }
}