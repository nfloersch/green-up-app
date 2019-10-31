const deconstruct = require("./libs/deconstruct");
const Coordinates = require("./coordinates");
const isValidDate = require("./validators").isValidDate;

class TrashDrop {

    constructor(args) {
        this.id = typeof args.id === "string" ? args.id : null;
        this.bagCount = typeof args.bagCount === "number" ? args.bagCount : null;
        this.tags = Array.isArray(args.tags) ? args.tags.filter((tag) => typeof tag === "string") : [];
        this.status = typeof args.status === "string" ? args.status : null;
        this.active = typeof args.active === "boolean" ? args.active : true;
        this.location = Coordinates.create(args.location);
        this.created = isValidDate(new Date(args.created)) ? new Date(args.created) : new Date();
        this.wasCollected = typeof args.wasCollected === "boolean" ? args.wasCollected : false;
        this.createdBy = typeof args.createdBy === "object" ? args.createdBy : null;
        this.collectedBy = typeof args.collectedBy === "object" ? args.collectedBy : null;
    }

    static create(args = {}, id) {
        const _args = { ...args };
        if (id) {
            _args.id = id;
        }
        return deconstruct(new TrashDrop(_args));
    }
}

module.exports = TrashDrop;