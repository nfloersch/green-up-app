
const  isValidDate = require("./validators");
const Coordinates = require("./coordinates");

class TownLocation {
    address;
    name;
    notes;
    coordinates;

    constructor(args) {
        this.address = (args || {}).address || "";
        this.name = (args || {}).name || "";
        this.notes = (args || {}).notes || "";
        this.coordinates = Coordinates.create((args || {}).coordinates);
    }

    static create(args = {}, id) {
        const _args = { ...args };
        if (Boolean(id)) {
            _args.id = id;
        }
        return new TownLocation(_args);
    }
}

class Town {
    id;
    name;
    description;
    notes;
    dropOffInstructions;
    dropOffLocations;
    pickupInstructions;
    pickupLocations;
    roadsideDropOffAllowed;
    created;
    updated;

    constructor(args = {}) {
        this.id = typeof args.id === "string" ? args.id : null;
        this.name = typeof args.name === "string"
            ? args.name
            : null;
        this.description = typeof args.description === "string"
            ? args.description
            : null;
        this.notes = typeof args.notes === "string"
            ? args.notes
            : null;
        this.dropOffInstructions = args.dropOffInstructions || null;
        this.pickupInstructions = args.pickupInstructions || null;
        this.dropOffLocations = (
            Array.isArray(args.dropOffLocations)
                ? args.dropOffLocations
                : []
        ).map((loc): TownLocation => TownLocation.create(loc));
        this.pickupLocations = (Array.isArray(args.pickupLocations) ? args.pickupLocations : [])
            .map((loc: TownLocation): TownLocation => TownLocation.create(loc));
        this.roadsideDropOffAllowed = typeof args.roadsideDropOffAllowed === "boolean" ? args.roadsideDropOffAllowed : false;
        this.created = isValidDate(new Date(args.created))
            ? new Date(args.created)
            : new Date();
        this.updated = isValidDate(new Date(args.updated))
            ? new Date(args.updated)
            : new Date();
    }

    static create(args = {}, id): Town {
        const _args = { ...args };
        if (Boolean(id)) {
            _args.id = id;
        }
        return new Town(_args);
    }
}

module.exports = Town;
