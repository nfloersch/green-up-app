const deconstruct = require("./libs/deconstruct");

class Address {

    constructor(args) {
        this.address = (args || {}).address || "";
        this.address2 = (args || {}).address2 || "";
        this.city = (args || {}).city || "";
        this.state = (args || {}).state || "";
        this.zip = (args || {}).zip || "";
        this.notes = (args || {}).notes || "";
    }

    static create(args = {}) {
        return deconstruct(new Address(args));
    }
}

module.exports = Address;