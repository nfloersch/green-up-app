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
        return JSON.parse(JSON.stringify(new Address(args)));
    }

    static toString(address: Address): string {
        const a = typeof address !== "object" ? {} : address;
        const street = (add => {
            switch (true) {
                case Boolean(add.street && add.street2):
                    return `${ (add.street || "").trim() } / ${ (add.street2 || "").trim() } `;
                case add.street2 && !add.street:
                    return `${ (add.street2 || "").trim() } `;
                case add.street && !add.street2:
                    return `${ (add.street || "").trim() } `;
                default:
                    return "";
            }
        })(a);
        return (`${ street }${ a.city || "" } ${ a.state || "" } ${ a.zip || "" }`).trim();

    }
}