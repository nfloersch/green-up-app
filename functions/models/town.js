// @flow

const validators = require('./validators');
import Coordinates from './coordinates';

class TownLocation {
    address: ?string;
    name: ?string;
    notes: ?string;
    coordinates: ?Coordinates;

    constructor(args: ?Object) {
        this.address = (args || {}).address || '';
        this.name = (args || {}).name || '';
        this.notes = (args || {}).notes || '';
        this.coordinates = Coordinates.create((args || {}).coordinates);
    }

    static create(args: Object = {}, id?: string) {
        const _args = {...args};
        if (id) {
            _args.id = id;
        }
        return new TownLocation(_args);
    }
}

class Town {
    id: ?string;
    name: ?string;
    description: ?string;
    notes: ?string;
    dropOffInstructions: ?string;
    dropOffLocations: ?Array<TownLocation>;
    pickupInstructions: ?string;
    pickupLocations: ?Array<TownLocation>;
    roadsideDropOffAllowed: ?boolean;
    created: ?Date;
    updated: ?Date;

    constructor(args: Object = {}) {
        this.id = typeof args.id === 'string' ? args.id : null;
        this.name = typeof args.name === 'string'
            ? args.name
            : null;
        this.description = typeof args.description === 'string'
            ? args.description
            : null;
        this.notes = validators.isString(args.notes)
            ? args.notes
            : null;
        this.dropOffInstructions = args.dropOffInstructions || null;
        this.pickupInstructions = args.pickupInstructions || null;
        this.dropOffLocations = (Array.isArray(args.dropOffLocations) ? args.dropOffLocations : []).map(loc => TownLocation.create(loc));
        this.pickupLocations = (Array.isArray(args.pickupLocations) ? args.pickupLocations : []).map(loc => TownLocation.create(loc));
        this.roadsideDropOffAllowed = typeof args.roadsideDropOffAllowed === 'boolean' ? args.roadsideDropOffAllowed : false;
        this.created = validators.isValidDate(new Date(args.created))
            ? new Date(args.created)
            : new Date();
        this.updated = validators.isValidDate(new Date(args.updated))
            ? new Date(args.updated)
            : new Date();
    }

    static create(args: ?Object = {}, id?: string) {
        const _args = {...args};
        if (id) {
            _args.id = id;
        }
        return  JSON.parse(JSON.stringify(new Town(_args)));
    }
}

exports.Town = Town;