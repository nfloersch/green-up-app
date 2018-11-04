// @flow

import {isValidDate} from '../libs/validators';
import Contact from './contact';
import {Coordinates} from './coordinates';

export class TownLocation {

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

    static create(args: Object = {}, id: ?string) {
        const _args = {...args};
        if (Boolean(id)) {
            _args.id = id;
        }
        return new TownLocation(_args);
    }
}

export default class Town {
    id: ?string;
    name: ?string;
    description: ?string;
    notes: ?string;
    dropoffLocations: ?Array<TownLocation>;
    pickupLocations: ?Array<TownLocation>;
    roadsideDropoffAllowed: ?boolean;
    created: ?Date;
    updated: ?Date;
    contact: ?Contact;

    constructor(args: Object = {}) {
        this.id = typeof args.id === 'string' ? args.id : null;
        this.name = typeof args.name === 'string'
            ? args.name
            : null;
        this.description = typeof args.description === 'string'
            ? args.description
            : null;
        this.notes = typeof args.notes === 'string'
            ? args.notes
            : null;
        this.dropoffLocations = (Array.isArray(args.dropoffLocations) ? args.dropoffLocations : []).map(loc => TownLocation.create(loc));
        this.pickupLocations = (Array.isArray(args.pickupLocations) ? args.pickupLocations : []).map(loc => TownLocation.create(loc));
        this.roadsideDropoffAllowed = typeof args.roadsideDropoffAllowed === 'boolean' ? args.roadsideDropoffAllowed : false;
        this.created = isValidDate(new Date(args.created))
            ? new Date(args.created)
            : new Date();
        this.updated = isValidDate(new Date(args.updated))
            ? new Date(args.updated)
            : new Date();
        this.contact = Contact.create(args.contact);
    }

    static create(args: ?Object = {}, id: ?string) {
        const _args = {...args};
        if (Boolean(id)) {
            _args.id = id;
        }
        return new Town(_args);
    }

}
