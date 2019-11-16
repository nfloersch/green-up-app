const Coordinates = require("./coordinates");
const isValidDate = require("./libs/validators").isValidDate;
const deconstruct = require("./libs/deconstruct");

class Celebration {

    constructor(args = {}) {
        this.name = typeof args.name === "string" ? args.name : null;
        this.description = typeof args.description === "string" ? args.description : null;
        this.status = typeof args.status === "string" ? args.status : null;
        this.active = typeof args.active === "boolean" ? args.active : true;
        this.address = typeof args.address === "string" ? args.address : null;
        this.coordinates = Coordinates.create(args.coordinates);
        this.created = isValidDate(new Date(args.created)) ? new Date(args.created) : null;
        this.start = isValidDate(new Date(args.created)) ? new Date(args.created) : null;
        this.end = isValidDate(new Date(args.created)) ? new Date(args.created) : null;
        this.image = typeof args.image === "string" ? args.image : null;
    }

    static create(args = {}) {
        return deconstruct(new Celebration(args));
    }
}

module.exports = Celebration;