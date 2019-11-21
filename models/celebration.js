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
    id: ?string;
    image: ?string;


    constructor(args: Object = {}) {
        this.active = typeof args.active === "boolean" ? args.active : true;
        this.address = typeof args.address === "string" ? args.address : null;
        this.coordinates = Coordinates.create(args.coordinates);
        this.created = isValidDate(new Date(args.created)) ? new Date(args.created) : null;
        this.description = typeof args.description === "string" ? args.description : null;
        this.id = typeof args.id === "string" ? args.id : null;
        this.end = isValidDate(new Date(args.created)) ? new Date(args.created) : null;
        this.image = typeof args.image === "string" ? args.image : null;
        this.name = typeof args.name === "string" ? args.name : null;
        this.start = isValidDate(new Date(args.created)) ? new Date(args.created) : null;
        this.status = typeof args.status === "string" ? args.status : null;
    }

    static create(args = {}, id) {
        const _args = { ...(args || {}) };
        if (id) {
            _args.id = id;
        }
        return new Celebration(_args);
    }
}