// @flow

export default class Address {
    street: ?string;
    street2: ?string;
    city: ?string;
    state: ?string;
    zip: ?string;
    notes: ?string;

    constructor(args: ?Object) {
        this.city = (args || {}).city || "";
        this.notes = (args || {}).notes || "";
        this.state = (args || {}).state || "";
        this.street = (args || {}).street || "";
        this.street2 = (args || {}).street2 || "";
        this.zip = (args || {}).zip || "";
    }

    static create(args: Object = {}): Address {
        return new Address(args);
    }
}