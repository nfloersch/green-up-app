const isValidDate = require("./validators").isValidDate;
const Coordinates = require("./coordinates");
const Address = require("./address");
const deconstruct = require("./libs/deconstruct");

class SupplyDistributionSite {

    constructor(args = {}) {
        this.active = args.active !== false;
        this.address = Address.create(args.address);
        this.coordinates = Coordinates.create(args.coordinates);
        this.end = isValidDate(args.end) ? new Date(args.end) : null;
        this.name = args.name || "";
        this.notes = args.notes || "";
        this.start = isValidDate(args.start) ? new Date(args.start) : null;
        this.townId = typeof args.townId === "string" ? args.townId : null;
        this.created = args.created || null;
        this.updated = args.updated || null;
    }

    static create(args = {}) {
        return deconstruct(new SupplyDistributionSite(args));
    }
}

module.exports = SupplyDistributionSite;