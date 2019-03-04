// @flow

import Coordinates from './coordinates';
import {isValidDate} from '../libs/validators';

export default class Location {
    name: ?string;
    description: ?string;
    status: ?string;
    active: ?boolean;
    coordinates: ?Coordinates;
    created: ?Date;

    constructor(args: Object = {}) {
        this.name = typeof args.name === 'string' ? args.name : null;
        this.description = typeof args.description === 'string' ? args.description : null;
        this.status = typeof args.status === 'string' ? args.status : null;
        this.active = typeof args.active === 'boolean' ? args.active : true;
        this.coordinates = Coordinates.create(args.coordinates);
        this.created = isValidDate(new Date(args.created)) ? new Date(args.created) : null;
    }

    static create(args: Object = {}) {
        return new Location(args);
    }
}