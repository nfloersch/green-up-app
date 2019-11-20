const deconstruct = require("./libs/deconstruct");

class Coordinates {

    constructor(args) {
        this.latitude = typeof (args || {}).latitude === "number" ? (args || {}).latitude : null;
        this.longitude = typeof (args || {}).longitude === "number" ? (args || {}).longitude : null;
    }

    static create(args = {}) {
        return deconstruct(new Coordinates(_args));
    }
}


module.exports = Coordinates;