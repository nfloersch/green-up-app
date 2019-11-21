const deconstruct = require("./libs/deconstruct");

class Address {

    constructor(args) {
        this.city = (args || {}).city || "";
        this.notes = (args || {}).notes || "";
        this.state = (args || {}).state || "";
        this.street = (args || {}).street || "";
        this.street2 = (args || {}).street2 || "";
        this.zip = (args || {}).zip || "";
    }

    static create(args = {}) {
        return deconstruct(new Address(args));
    }
}

module.exports = Address;