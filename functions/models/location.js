const Coordinates = require("./coordinates");
const  isValidDate = require("./validators").isValidDate;

class Location {
    name;
    description;
    status;
    active;
    coordinates: ?CoordinatesType;
    created;

    constructor(args = {}) {
        this.name = typeof args.name === "string" ? args.name : null;
        this.description = typeof args.description === "string" ? args.description : null;
        this.status = typeof args.status === "string" ? args.status : null;
        this.active = typeof args.active === "boolean" ? args.active : true;
        this.coordinates = Coordinates.create(args.coordinates);
        this.created = isValidDate(new Date(args.created)) ? new Date(args.created) : null;
    }

    static create(args = {}): LocationType {
        return new Location(args);
    }
}

module.exports = Location;