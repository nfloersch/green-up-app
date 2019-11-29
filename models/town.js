// @flow
import { isValidDate } from "../libs/validators";
import Coordinates from "./coordinates";

export class TownLocation {
    address: ?string;
    name: ?string;
    notes: ?string;
    coordinates: ?CoordinatesType;

    constructor(args: ?Object) {
        this.address = (args || {}).address || "";
        this.name = (args || {}).name || "";
        this.notes = (args || {}).notes || "";
        this.coordinates = Coordinates.create((args || {}).coordinates);
    }

    static create(args: Object = {}, id?: string): TownLocation {
        const _args = { ...args };
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
    dropOffInstructions: ?string;
    pickupInstructions: ?string;
    roadsideDropOffAllowed: ?boolean;
    created: ?Date;
    updated: ?Date;

    constructor(args: Object = {}) {
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
        this.roadsideDropOffAllowed = typeof args.roadsideDropOffAllowed === "boolean" ? args.roadsideDropOffAllowed : false;
        this.created = isValidDate(new Date(args.created))
            ? new Date(args.created)
            : new Date();
        this.updated = isValidDate(new Date(args.updated))
            ? new Date(args.updated)
            : new Date();
    }

    static create(args: ?Object = {}, id?: string): Town {
        const _args = { ...args };
        if (Boolean(id)) {
            _args.id = id;
        }
        return new Town(_args);
    }
}
