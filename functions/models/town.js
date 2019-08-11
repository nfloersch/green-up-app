/** global require **/
const {isString, isValidDate} = require('./validators');
const Coordinates = require('./coordinates');

class TownLocation {
    constructor(args) {
        this.address = (args || {}).address || '';
        this.name = (args || {}).name || '';
        this.notes = (args || {}).notes || '';
        this.coordinates = Coordinates.create((args || {}).coordinates);
    }

    static create(args = {}, id) {
        const _args = {...args};
        if (id) {
            _args.id = id;
        }
        return new TownLocation(_args);
    }
}

class Town {
    constructor(args = {}) {
        this.id = isString(args.id) ? args.id : null;
        this.name = isString(args.name)
            ? args.name
            : null;
        this.description = isString(args.description)
            ? args.description
            : null;
        this.notes = isString(args.notes)
            ? args.notes
            : null;
        this.dropOffInstructions = args.dropOffInstructions || null;
        this.pickupInstructions = args.pickupInstructions || null;
        this.dropOffLocations = (Array.isArray(args.dropOffLocations) ? args.dropOffLocations : []).map(loc => TownLocation.create(loc));
        this.pickupLocations = (Array.isArray(args.pickupLocations) ? args.pickupLocations : []).map(loc => TownLocation.create(loc));
        this.roadsideDropOffAllowed = typeof args.roadsideDropOffAllowed === 'boolean' ? args.roadsideDropOffAllowed : false;
        this.created = isValidDate(new Date(args.created))
            ? new Date(args.created)
            : new Date();
        this.updated = isValidDate(new Date(args.updated))
            ? new Date(args.updated)
            : new Date();
    }

    static create(args = {}, id) {
        const _args = {...args};
        if (id) {
            _args.id = id;
        }
        return JSON.parse(JSON.stringify(new Town(_args)));
    }
}

module.exports = Town;