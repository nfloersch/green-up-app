// @flow
import Coordinates from "./coordinates";
import { isValidDate } from "../libs/validators";

export default class TrashDrop {
    id: ?string;
    bagCount: ?number;
    status: ?string;
    active: ?boolean;
    tags: ?Array<string>;
    teamId: ?string;
    location: ?CoordinatesType;
    created: ?Date;
    wasCollected: ?boolean;
    createdBy: ?Object;
    collectedBy: ?Object;

    constructor(args: Object) {
        this.id = typeof args.id === "string" ? args.id : null;
        this.bagCount = typeof args.bagCount === "number" ? args.bagCount : null;
        this.tags = Array.isArray(args.tags) ? args.tags.filter((tag: mixed): boolean => typeof tag === "string") : [];
        this.teamId = typeof args.teamId === "string" ? args.teamId : null;
        this.status = typeof args.status === "string" ? args.status : null;
        this.active = typeof args.active === "boolean" ? args.active : true;
        this.location = Coordinates.create(args.location);
        this.created = isValidDate(new Date(args.created)) ? new Date(args.created) : new Date();
        this.wasCollected = typeof args.wasCollected === "boolean" ? args.wasCollected : false;
        this.createdBy = typeof args.createdBy === "object" ? args.createdBy : null;
        this.collectedBy = typeof args.collectedBy === "object" ? args.collectedBy : null;
    }

    static create(args: ?Object = {}, id?: string): TrashDrop {
        const _args = { ...args };
        if (Boolean(id)) {
            _args.id = id;
        }
        return new TrashDrop(_args);
    }
}