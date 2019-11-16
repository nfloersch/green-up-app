// @flow

export default class Address {
    address: ?string;
    address2: ?string;
    city: ?string;
    state: ?string;
    zip: ?string;
    notes: ?string;

    constructor(args: ?Object) {
        this.address = (args || {}).address || "";
        this.address2 = (args || {}).address2 || "";
        this.city = (args || {}).city || "";
        this.state = (args || {}).state || "";
        this.zip = (args || {}).zip || "";
        this.notes = (args || {}).notes || "";
    }

    static create(args: Object = {}, id?: string): Address {
        const _args = { ...args };
        if (Boolean(id)) {
            _args.id = id;
        }
        return new Address(_args);
    }
}