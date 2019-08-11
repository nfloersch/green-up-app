// @flow

const Coordinates = require('./coordinates');
const validators = require('./validators');


class Location {
    name: ?string;
    description: ?string;
    status: ?string;
    active: ?boolean;
    coordinates: ?Coordinates;
    created: ?Date;

    constructor(args: Object = {}) {
        this.name = validators.isString(args.name) ? args.name : null;
        this.description = validators.isString(args.description) ? args.description : null;
        this.status = validators.isString(args.status) ? args.status : null;
        this.active = typeof args.active === 'boolean' ? args.active : true;
        this.coordinates = Coordinates.create(args.coordinates);
        this.created = validators.isValidDate(new Date(args.created)) ? new Date(args.created) : null;
    }

    static create(args: Object = {}) {
        return JSON.parse(JSON.stringify(new Location(args)));
    }
}

exports.Location = Location;