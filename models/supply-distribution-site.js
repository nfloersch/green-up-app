// @flow
import { isValidDate } from "../libs/validators";
import Coordinates from "./coordinates";
import Address from "./address";

export default class SupplyDistributionSite {
    active: boolean;
    address: ?Address;
    coordinates: ?Coordinates;
    created: ?string;
    end: ?Date;
    id: ?string;
    name: ?string;
    notes: ?string;
    start: ?Date;
    townId: ?string;
    updated: ?string;

    constructor(args: ?Object) {
        this.active = (args || {}).active !== false;
        this.address = Address.create((args || {}).address);
        this.coordinates = Coordinates.create((args || {}).coordinates);
        this.created = (args || {}).created || null;
        this.end = isValidDate((args || {}).end) ? (args || {}).end : null;
        this.id = typeof args.id === "string" ? args.id : null;
        this.name = (args || {}).name || "";
        this.notes = (args || {}).notes || "";
        this.start = isValidDate((args || {}).start) ? (args || {}).start : null;
        this.townId = typeof args || {}.townId === "string" ? (args || {}).townId : null;
        this.updated = (args || {}).updated || null;
    }

    static create(args: Object = {}, id?: string): SupplyDistributionSite {
        const _args = { ...args };
        if (Boolean(id)) {
            _args.id = id;
        }
        return new SupplyDistributionSite(_args);
    }
}