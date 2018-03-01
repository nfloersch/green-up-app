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
    createdBy: object;
    collectedBy: object;

    constructor(args: Object) {
        this.uid = typeof args.uid === 'string' ? args.uid : null;
        this.bagCount = typeof args.bagCount === 'number' ? args.bagCount : null;
        this.tags = Array.isArray(args.tags) ? args.tags.filter((tag) => typeof tag === 'string') : [];
        this.status = typeof args.status === 'string' ? args.status : null;
        this.active = typeof args.active === 'boolean' ? args.active : true;
        this.location = Coordinates.create(args.location);
        this.created = isDate(args.created) ? new Date(args.created) : new Date();
        this.wasCollected = typeof args.wasCollected === 'boolean' ? args.wasCollected : false;
        this.createdBy = typeof args.createdBy === 'object' ? args.createdBy : null;
        this.collectedBy = typeof args.collectedBy === 'object' ? args.collectedBy : null;
    }

    static create(args) {
        return new TrashDrop(args || {});
    }
}