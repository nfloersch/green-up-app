const Coordinates = require("./coordinates");
const isValidDate = require("./validators").isValidDate;
const deconstruct = require("./libs/deconstruct");
const Address = require("./address");

class Celebration {

    constructor(args = {}) {
        this.active = typeof args.active === "boolean" ? args.active : true;
        this.address = Address.create(args.address);
        this.coordinates = Coordinates.create(args.coordinates);
        this.created = isValidDate(new Date(args.created)) ? new Date(args.created) : null;
        this.description = typeof args.description === "string" ? args.description : null;
        this.end = isValidDate(new Date(args.created)) ? new Date(args.created) : null;
        this.image = typeof args.image === "string" ? args.image : null;
        this.name = typeof args.name === "string" ? args.name : null;
        this.start = isValidDate(new Date(args.created)) ? new Date(args.created) : null;
        this.status = typeof args.status === "string" ? args.status : null;
    }

    static create(args = {}) {
        return deconstruct(new Celebration(args));
    }
}

module.exports = Celebration;