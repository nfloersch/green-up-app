// @flow
import Coordinates from "./coordinates";
import { isValidDate } from "../libs/validators";

export default class Celebration {
    name: ?string;
    description: ?string;
    status: ?string;
    active: ?boolean;
    address: ?string;
    coordinates: ?CoordinatesType;
    created: ?Date;
    start: ?Date;
    end: ?Date;
    image: ?string;


    constructor(args: Object = {}) {
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

    static create(args: Object = {}): Celebration {
        return new Celebration(args);
    }
}