// @flow

import {Team} from './team';
import {Coordinate} from './coordinate';

export class Zone {
    _id: string;
    name: string;
    description: string;
    status: string;
    active: boolean;
    team: Team;
    coordinates: [Coordinate];

    constructor(args = {}) {
        this._id = typeof args._id === 'string' ? args._id : null;
        this.name = typeof args.name === 'string' ? args.name : null;
        this.description = typeof args.description === 'string' ? args.description : null;
        this.status = typeof args.status === 'string' ? args.status : null;
        this.active = typeof args.active === 'boolean' ? args.active : true;
        this.team = typeof args.team === 'object' ? Team.create(args.team) : null;
        this.coordinates = Array.isArray(args.coordinates) ? args.coordinates.map(coordinate => Coordinate.create(coordinate)) : [];
    }

    static create(args) {
        return new Zone(args);
    }
}