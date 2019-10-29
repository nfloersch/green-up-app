class Coordinates {
    latitude;
    longitude;
    id;

    constructor(args) {
        this.id = (args || {}).id || null;
        this.latitude = typeof (args || {}).latitude === "number" ? (args || {}).latitude : null;
        this.longitude = typeof (args || {}).longitude === "number" ? (args || {}).longitude : null;
    }

    static create(args = {}, id): CoordinatesType {
        const _args = { ...args };
        if (Boolean(id)) {
            _args.id = id;
        }
        return new Coordinates(_args);
    }
}


module.exports = Coordinates;