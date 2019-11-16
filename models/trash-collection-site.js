// @flow
import { isValidDate } from "../libs/validators";
import Coordinates from "./coordinates";
import Address from "./address";

export class TrashCollectionSite {
    active: boolean;
    address: ?Address;
    coordinates: ?Coordinates;
    end: ?Date;
    name: ?string;
    notes: ?string;
    start: ?Date;
    townId: ?string;
    created: ?string;
    updated: ?string;

    constructor(args: ?Object) {
        this.active = (args || {}).active === false ? false : true;
        this.address = Address.create((args || {}).address);
        this.coordinates = Coordinates.create((args || {}).coordinates);
        this.end = isValidDate((args || {}).end) ? (args || {}).end : null;
        this.name = (args || {}).name || "";
        this.notes = (args || {}).notes || "";
        this.start = isValidDate((args || {}).start) ? (args || {}).start : null;
        this.townId = typeof args || {}.townId === "string" ? (args || {}).townId : null;
        this.created = (args || {}).created || null;
        this.updated = (args || {}).updated || null;

    }

    static create(args: Object = {}, id?: string): TrashCollectionSite {
        const _args = { ...args };
        if (Boolean(id)) {
            _args.id = id;
        }
        return new TrashCollectionSite(_args);
    }
}