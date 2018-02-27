// @flow

import {Coordinates} from './coordinates';
import {isDate} from '../libs/isDate';

export default class TrashDrop {
    uid: string;
    bagCount: number;
    status: string;
    active: boolean;
    tags: [string];
    location: Coordinates;
    created: Date;
    wasCollected: boolean;

    constructor(args: Object) {
        this.bagCount = typeof args.bagCount === 'number' ? args.bagCount : null;
        this.tags = Array.isArray(args.tags) ? args.tags.filter((tag) => typeof tag === 'string') : [];
        this.status = typeof args.status === 'string' ? args.status : null;
        this.active = typeof args.active === 'boolean' ? args.active : true;
        this.location = Coordinates.create(args.location);
        this.created = isDate(args.created) ? new Date(args.created) : new Date();
        this.wasCollected = typeof args.wasCollected === 'boolean' ? args.wasCollected : null;
    }

    static create(args) {
        return new TrashDrop(args || {});
    }
}