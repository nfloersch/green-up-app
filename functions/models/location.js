const Coordinates = require('./coordinates');
const {isString, isValidDate} = require('./validators');

class Location {
    constructor(args = {}) {
        this.name = isString(args.name) ? args.name : null;
        this.description = isString(args.description) ? args.description : null;
        this.status = isString(args.status) ? args.status : null;
        this.active = typeof args.active === 'boolean' ? args.active : true;
        this.coordinates = Coordinates.create(args.coordinates);
        this.created = isValidDate(new Date(args.created)) ? new Date(args.created) : null;
    }

    static create(args = {}) {
        return JSON.parse(JSON.stringify(new Location(args)));
    }
}

module.exports = Location;