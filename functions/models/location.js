const deconstruct = require("./libs/deconstruct");
const Coordinates = require("./coordinates");
const isValidDate = require("./validators").isValidDate;

class Location {

    constructor(args = {}) {
        this.name = typeof args.name === "string" ? args.name : null;
        this.description = typeof args.description === "string" ? args.description : null;
        this.status = typeof args.status === "string" ? args.status : null;
        this.active = typeof args.active === "boolean" ? args.active : true;
        this.coordinates = Coordinates.create(args.coordinates);
        this.created = isValidDate(args.created) ? new Date(args.created) : null;
    }

    static create(args = {}) {
        return deconstruct(new Location(args));
    }
}

module.exports = Location;