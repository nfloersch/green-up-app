const deconstruct = require("./libs/deconstruct");

class Coordinates {

    constructor(args) {
        this.latitude = isNaN(parseFloat(args.latitude)) ? null : parseFloat(args.latitude);
        this.longitude = isNaN(parseFloat(args.longitude)) ? null : parseFloat(args.longitude);
    }

    static create(args = {}) {
        return deconstruct(new Coordinates(args));
    }
}


module.exports = Coordinates;